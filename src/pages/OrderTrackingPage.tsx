import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { OrderTimeline } from '../components/checkout/OrderTimeline';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import type { Order } from '../api/types';
import { Ban, AlertTriangle, CalendarDays, MapPin, Package, IndianRupee, Lock } from 'lucide-react';

/** Format ISO date string → "Sep 19, 2026" */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

const META_LABEL: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.07em',
  opacity: 0.5,
  marginBottom: '0.25rem',
  textTransform: 'uppercase' as const,
};

const META_VALUE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.95rem',
};

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, cancelOrder, showToast } = useApp();
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // Security guard: redirect unauthenticated users away immediately
  useEffect(() => {
    if (!authLoading && !user && !profile) {
      navigate('/account');
    }
  }, [user, profile, authLoading, navigate]);

  useEffect(() => {
    if (!id) return;
    const found = orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
    if (found) {
      setOrder(found);
    } else {
      api.getOrderById(id).then(setOrder).catch(() => {});
    }
  }, [id, orders]);

  const handleCancel = async () => {
    if (!user && !profile) {
      showToast('Authentication required to cancel this order.');
      navigate('/account');
      return;
    }
    if (!order) return;
    setCancelling(true);
    await cancelOrder(order.id);
    setCancelling(false);
    setConfirmCancelOpen(false);

    setOrder((prev) =>
      prev
        ? {
            ...prev,
            status: 'Cancelled',
            timeline: [
              ...prev.timeline,
              {
                label: 'Order Cancelled',
                completed: true,
                timestamp:
                  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) +
                  ', ' +
                  new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
              },
            ],
          }
        : null
    );
  };

  if (!authLoading && !user && !profile) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream-card)',
              color: 'var(--color-deep-cherry)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid var(--color-cocoa-light)',
            }}
          >
            <Lock size={28} />
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Authentication Required</h2>
          <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
            Please sign in to view and manage order tracking.
          </p>
          <Link to="/account">
            <Button variant="primary" size="lg">
              GO TO SIGN IN
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCancellable = order && order.status !== 'Cancelled' && order.status !== 'Delivered';
  const totalQty = order?.items.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <SectionHeading title={`Order ${id || ''}`} align="left" eyebrow="DELIVERY TIMELINE" />

        {order ? (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-cocoa-light)',
            }}
          >
            {/* ── Status + Delivery row ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span
                  className={order.status === 'Cancelled' ? 'badge badge-blush' : 'badge badge-cherry'}
                  style={{
                    backgroundColor: order.status === 'Cancelled' ? '#FDE8E8' : undefined,
                    color: order.status === 'Cancelled' ? '#9B1C1C' : undefined,
                  }}
                >
                  {order.status}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>
                  {order.status === 'Cancelled' ? 'Order Cancelled' : 'Estimated Delivery'}
                </h3>
                <p
                  style={{
                    fontWeight: 700,
                    color: order.status === 'Cancelled' ? '#9B1C1C' : 'var(--color-deep-cherry)',
                    fontSize: '1.1rem',
                  }}
                >
                  {order.status === 'Cancelled' ? '—' : order.delivery_estimate}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Deliver To</div>
                <div style={{ fontWeight: 600 }}>{order.address.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  {order.address.city}, {order.address.pincode}
                </div>
              </div>
            </div>

            {/* ── Order meta grid ── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.25rem',
                backgroundColor: 'var(--color-warm-cream)',
                border: '1px solid var(--color-cocoa-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.75rem',
              }}
            >
              <div>
                <div style={META_LABEL}>
                  <CalendarDays size={11} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                  Order Date
                </div>
                <div style={META_VALUE}>{formatDate(order.created_at)}</div>
              </div>

              <div>
                <div style={META_LABEL}>
                  <Package size={11} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                  Qty
                </div>
                <div style={META_VALUE}>{totalQty} {totalQty === 1 ? 'item' : 'items'}</div>
              </div>

              <div>
                <div style={META_LABEL}>
                  <IndianRupee size={11} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                  Order Total
                </div>
                <div style={{ ...META_VALUE, color: 'var(--color-deep-cherry)' }}>
                  {order.currency}{order.total}
                </div>
              </div>

              <div>
                <div style={META_LABEL}>
                  <MapPin size={11} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                  Order ID
                </div>
                <div style={{ ...META_VALUE, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {order.id}
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', marginBottom: '1.75rem' }} />

            {/* ── Items in this order ── */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', opacity: 0.55, marginBottom: '0.75rem' }}>
                ITEMS IN THIS ORDER
              </div>
              {order.items.map((item, idx) => (
                <Link
                  key={idx}
                  to="/shop"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--color-warm-cream)',
                      border: '1px solid var(--color-cocoa-light)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      transition: 'border-color 0.18s, box-shadow 0.18s',
                      marginBottom: idx < order.items.length - 1 ? '0.5rem' : 0,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-deep-cherry)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(139,0,38,0.08)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-cocoa-light)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1px solid var(--color-cocoa-light)',
                        backgroundColor: 'var(--color-warm-cream)',
                      }}
                    >
                      <img
                        src={
                          item.image ||
                          (item.variant_id?.startsWith('refill')
                            ? '/images/refill-cartridge.png'
                            : item.variant_id === '20ml'
                            ? '/images/20ml-without-packaging.png'
                            : '/images/10ml-without-packaging.png')
                        }
                        alt={item.product_name || 'NIX Product'}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                        {item.product_name || (item.variant_id?.startsWith('refill') ? 'NIX Replacement Cartridge' : 'NIX Period Rescue Stick')}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.65 }}>
                        {item.variant_name ? `${item.variant_name} · ` : ''}Qty: {item.quantity} &nbsp;·&nbsp; {order.currency}{item.price ?? (order.total && item.quantity ? Math.round(order.total / item.quantity) : 79)} each
                      </div>
                    </div>

                    {/* Arrow */}
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--color-deep-cherry)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        flexShrink: 0,
                      }}
                    >
                      VIEW PRODUCT <span style={{ fontSize: '1rem' }}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Delivery address ── */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                border: '1px solid var(--color-cocoa-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.35rem', opacity: 0.55, fontSize: '0.75rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                Delivery Address
              </div>
              <div style={{ fontWeight: 600 }}>{order.address.name}</div>
              <div style={{ opacity: 0.8, lineHeight: 1.6 }}>
                {order.address.address}<br />
                {order.address.city}, {order.address.state} — {order.address.pincode}<br />
                📞 {order.address.phone} &nbsp;·&nbsp; ✉ {order.address.email}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', marginBottom: '1.75rem' }} />

            <OrderTimeline timeline={order.timeline} />

            {/* ── Cancel action ── */}
            {isCancellable && (
              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--color-cocoa-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Need to cancel this order?</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>You can cancel before your NIX Rescue Stick ships.</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setConfirmCancelOpen(true)}>
                  <Ban size={15} style={{ marginRight: '0.35rem' }} /> CANCEL ORDER
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading order status...</p>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <Link to="/account">
            <Button variant="text">← Back to My Account</Button>
          </Link>
        </div>
      </div>

      {/* ── Cancel confirmation modal ── */}
      <Modal isOpen={confirmCancelOpen} onClose={() => setConfirmCancelOpen(false)}>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FDF2F2',
              color: '#9B1C1C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              border: '1px solid #F8B4B4',
            }}
          >
            <AlertTriangle size={28} />
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Cancel Order?</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', opacity: 0.6, marginBottom: '1.25rem' }}>
            #{order?.id}
          </div>

          {/* Order summary inside modal */}
          {order && (
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                border: '1px solid var(--color-cocoa-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-warm-cream)',
                  }}
                >
                  <img
                    src={
                      order.items[0]?.variant_id === '20ml'
                        ? '/images/20ml-without-packaging.png'
                        : '/images/10ml-without-packaging.png'
                    }
                    alt="NIX Rescue Stick"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>NIX Period Rescue Stick</div>
                  <div style={{ opacity: 0.65, fontSize: '0.8rem' }}>
                    Qty: {totalQty} &nbsp;·&nbsp; {order.currency}{order.total}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', opacity: 0.75 }}>
                <div>
                  <span style={{ fontWeight: 600 }}>Placed on: </span>
                  {formatDate(order.created_at)}
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Deliver to: </span>
                  {order.address.city}
                </div>
              </div>
            </div>
          )}

          <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            This action cannot be undone. Any rewards points earned will be reversed.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Button variant="secondary" size="md" onClick={() => setConfirmCancelOpen(false)}>
              KEEP ORDER
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCancel}
              disabled={cancelling}
              style={{ backgroundColor: '#9B1C1C', borderColor: '#9B1C1C' }}
            >
              {cancelling ? 'CANCELLING...' : 'YES, CANCEL'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

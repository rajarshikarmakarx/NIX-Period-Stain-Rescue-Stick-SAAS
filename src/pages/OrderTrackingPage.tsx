import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderTimeline } from '../components/checkout/OrderTimeline';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { api } from '../api/client';
import type { Order } from '../api/types';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useApp();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    const found = orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
    if (found) {
      setOrder(found);
    } else {
      api.getOrderById(id).then(setOrder).catch(() => {});
    }
  }, [id, orders]);

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <SectionHeading title={`Tracking Order ${id || ''}`} align="left" eyebrow="DELIVERY TIMELINE" />

        {order ? (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-cocoa-light)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-cherry">{order.status}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Estimated Delivery</h3>
                <p style={{ fontWeight: 700, color: 'var(--color-deep-cherry)', fontSize: '1.1rem' }}>
                  {order.delivery_estimate}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Deliver To</div>
                <div style={{ fontWeight: 600 }}>{order.address.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{order.address.city}, {order.address.pincode}</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', marginBottom: '2rem' }} />

            <OrderTimeline timeline={order.timeline} />
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
    </div>
  );
};

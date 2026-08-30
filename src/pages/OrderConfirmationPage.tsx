import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div style={{ padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--color-cocoa-light)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-deep-cherry)',
              color: 'var(--color-warm-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <span className="eyebrow">ORDER CONFIRMED</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>You're all set.</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '2rem' }}>
            Your NIX Stick order has been placed. We’re preparing your package for fast delivery.
          </p>

          {order && (
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'left',
                border: '1px solid var(--color-cocoa-light)',
                marginBottom: '2rem',
                fontSize: '0.95rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ opacity: 0.7 }}>Order ID</span>
                <span style={{ fontWeight: 700, color: 'var(--color-deep-cherry)' }}>{order.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ opacity: 0.7 }}>Total Paid</span>
                <span style={{ fontWeight: 600 }}>{order.currency}{order.total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.7 }}>Estimated Delivery</span>
                <span style={{ fontWeight: 600 }}>{order.delivery_estimate}</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {order && (
              <Link to={`/account/orders/${order.id}`}>
                <Button variant="primary" size="md">
                  <Package size={18} /> TRACK ORDER
                </Button>
              </Link>
            )}
            <Link to="/account">
              <Button variant="secondary" size="md">
                GO TO MY NIX ACCOUNT <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

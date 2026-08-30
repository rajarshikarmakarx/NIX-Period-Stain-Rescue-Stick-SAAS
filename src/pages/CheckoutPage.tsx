import React from 'react';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { SectionHeading } from '../components/common/SectionHeading';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, product } = useApp();

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Checkout Progress Bar */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--color-deep-cherry)' }}>1. Information</span>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ opacity: 0.4 }}>2. Delivery</span>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ opacity: 0.4 }}>3. Confirmation</span>
        </div>

        <SectionHeading title="Demo Checkout" align="left" subtitle="Fast, simulated order submission for presentation." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Form */}
          <div>
            <CheckoutForm />
          </div>

          {/* Mini Summary */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-cocoa-light)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Your Items ({cart.length})</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map((item) => (
                <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span>{product.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>{product.currency}{item.quantity * product.price}</span>
                </div>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', marginBottom: '1rem' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
              <span>Total</span>
              <span>{product.currency}{cartSubtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, product } = useApp();
  const shippingFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 49;
  const grandTotal = cartSubtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: 'var(--color-deep-cherry)',
            }}
          >
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Your bag is empty</h2>
          <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
            Add a NIX Period Stain Rescue Stick or Refill Cartridge to your bag before checking out.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              EXPLORE SHOP <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Checkout Progress Bar */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--color-deep-cherry)' }}>1. Information & Delivery</span>
          <span style={{ opacity: 0.4 }}>→</span>
          <span style={{ opacity: 0.4 }}>2. Confirmation</span>
        </div>

        <SectionHeading title="Order Checkout" align="left" subtitle="Fast, authenticated order submission & live tracking." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
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
              {cart.map((item) => {
                const itemPrice = item.price ?? product.price ?? 79;
                const itemImage =
                  item.image ||
                  (item.variant_id === 'refill-3pk'
                    ? '/images/roller-head-3.png'
                    : item.variant_id === 'refill-2pk'
                    ? '/images/roller-head-2.png'
                    : item.variant_id?.startsWith('refill')
                    ? '/images/roller-head-1.png'
                    : item.variant_id === '20ml'
                    ? '/images/20ml-without-packaging.png'
                    : '/images/10ml-without-packaging.png');
                const itemName = item.product_name || (item.variant_id?.startsWith('refill') ? 'NIX Replacement Cartridge' : product.name);

                return (
                  <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--color-cocoa-light)' }}>
                        <img
                          src={itemImage}
                          alt={itemName}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'var(--color-warm-cream)' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{itemName}</div>
                        {item.variant_name && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-deep-cherry)', fontWeight: 600 }}>
                            {item.variant_name} × {item.quantity}
                          </div>
                        )}
                        {!item.variant_name && (
                          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Qty: {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                    <span style={{ fontWeight: 600 }}>{product.currency}{item.quantity * itemPrice}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>{product.currency}{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-deep-cherry)' }}>FREE</strong> : `${product.currency}${shippingFee}`}</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', marginBottom: '1rem' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
              <span>Total</span>
              <span>{product.currency}{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

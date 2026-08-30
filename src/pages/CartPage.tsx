import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
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
          <h2 style={{ marginBottom: '0.75rem' }}>Your bag is empty.</h2>
          <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
            Keep a NIX close for the moments you don't plan for.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              SHOP NIX STICK <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <SectionHeading title="Your Bag" align="left" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Cart Items List */}
          <div>
            {cart.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}

            <div style={{ marginTop: '2rem' }}>
              <Link to="/shop">
                <Button variant="text">← Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              border: '1px solid var(--color-cocoa-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>{product.currency}{cartSubtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-deep-cherry)' }}>FREE</strong> : `${product.currency}${shippingFee}`}</span>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Estimated Total</span>
                <span style={{ color: 'var(--color-deep-cherry)' }}>{product.currency}{grandTotal}</span>
              </div>
            </div>

            <Link to="/checkout" style={{ display: 'block', width: '100%' }}>
              <Button variant="primary" size="lg" fullWidth>
                PROCEED TO CHECKOUT →
              </Button>
            </Link>

            <p style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center', marginTop: '1rem' }}>
              Taxes calculated during checkout. Simulated demo payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

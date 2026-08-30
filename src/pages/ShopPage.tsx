import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductGallery } from '../components/product/ProductGallery';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { AddToCartButton } from '../components/product/AddToCartButton';
import { Accordion } from '../components/common/Accordion';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { product, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(quantity);
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Main Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '4rem',
            alignItems: 'flex-start',
            marginBottom: '5rem',
          }}
        >
          {/* Left Column — Image Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column — Product Purchase Info */}
          <div>
            <span className="eyebrow">PORTABLE STAIN CARE</span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{product.name}</h1>

            <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '1.5rem' }}>
              {product.short_description}
            </p>

            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-deep-cherry)', marginBottom: '2rem' }}>
              {product.currency}{product.price} <span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.7 }}>/ 15g stick</span>
            </div>

            {/* Quantity & CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                  Quantity
                </label>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <AddToCartButton quantity={quantity} />
                <Button variant="secondary" size="lg" onClick={handleBuyNow}>
                  BUY NOW
                </Button>
              </div>
            </div>

            {/* Value Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-cocoa-light)',
                fontSize: '0.85rem',
                marginBottom: '2.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={18} color="var(--color-deep-cherry)" />
                <span>Free shipping &gt; ₹499</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={18} color="var(--color-deep-cherry)" />
                <span>7-Day Easy Returns</span>
              </div>
            </div>

            {/* Product Accordion */}
            <Accordion items={product.details} />
          </div>
        </div>

        {/* --------------------------------------------------------------------
            PRODUCT BUNDLES (§16)
            -------------------------------------------------------------------- */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-cocoa-light)', paddingTop: '4rem' }}>
          <SectionHeading
            eyebrow="BUNDLE & SAVE"
            title="Choose your backup pack."
            subtitle="Keep one in your everyday bag, desk drawer, or hostel locker."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {product.bundles.map((bundle) => (
              <div
                key={bundle.id}
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: bundle.available ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {!bundle.available && (
                    <span className="badge badge-blush" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                      COMING SOON
                    </span>
                  )}
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{bundle.name}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1.5rem' }}>{bundle.description}</p>
                </div>

                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-deep-cherry)', marginBottom: '1rem' }}>
                    {bundle.price ? `${product.currency}${bundle.price}` : 'TBA'}
                  </div>
                  {bundle.available ? (
                    <Button variant="primary" size="md" fullWidth onClick={() => addToCart(1)}>
                      SELECT BUNDLE
                    </Button>
                  ) : (
                    <Button variant="secondary" size="md" fullWidth disabled style={{ opacity: 0.6 }}>
                      NOT YET AVAILABLE
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

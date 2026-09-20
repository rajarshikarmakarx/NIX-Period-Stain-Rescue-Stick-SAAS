import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductGallery } from '../components/product/ProductGallery';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { AddToCartButton } from '../components/product/AddToCartButton';
import { Accordion } from '../components/common/Accordion';
import { Button } from '../components/common/Button';
import { FrequentlyBoughtTogether } from '../components/product/FrequentlyBoughtTogether';
import { WhatsInsideSection } from '../components/product/WhatsInsideSection';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, RotateCcw, Check, Sparkles, ChevronRight } from 'lucide-react';
import type { ProductVariant } from '../api/types';

export const StickProductPage: React.FC = () => {
  const { product, addToCart } = useApp();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.[0] || {
      id: '10ml',
      name: '10ml (5 uses)',
      size: '10ml',
      uses: '5 uses',
      price: 79,
      original_price: 99,
      in_stock: true,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant((prev) => product.variants.find((v) => v.id === prev.id) || product.variants[0]);
    }
  }, [product.variants]);

  const handleBuyNow = () => {
    addToCart(quantity, selectedVariant);
    navigate('/checkout');
  };

  const variants = product.variants && product.variants.length > 0 ? product.variants : [
    { id: '10ml', name: '10ml (5 uses)', size: '10ml', uses: '5 uses', price: 79, original_price: 99, in_stock: true },
    { id: '20ml', name: '20ml (10 uses)', size: '20ml', uses: '10 uses', price: 129, original_price: 159, in_stock: true },
  ];

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 5rem 0', width: '100%', overflowX: 'hidden' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            marginBottom: '2rem',
            opacity: 0.8,
          }}
        >
          <Link to="/" style={{ color: 'var(--color-soft-cocoa)', textDecoration: 'none' }}>
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'var(--color-soft-cocoa)', textDecoration: 'none' }}>
            Shop
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-deep-cherry)', fontWeight: 600 }}>
            NIX Period Stain Rescue Stick
          </span>
        </nav>

        {/* Main Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'flex-start',
            marginBottom: '3rem',
          }}
        >
          {/* Left Column — Gallery */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <ProductGallery
              images={product.images}
              productName={product.name}
              selectedVariantId={selectedVariant.id}
              onSelectVariant={(variantId) => {
                const found = variants.find((v) => v.id === variantId);
                if (found) setSelectedVariant(found);
              }}
            />
          </div>

          {/* Right Column — Product Purchase Info */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <span className="eyebrow">PORTABLE STAIN CARE</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              {product.name}
            </h1>

            <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '1.25rem' }}>
              {product.short_description}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-deep-cherry)' }}>
                {product.currency}{selectedVariant.price}
              </span>
              {selectedVariant.original_price && (
                <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', opacity: 0.5 }}>
                  {product.currency}{selectedVariant.original_price}
                </span>
              )}
              <span style={{ fontSize: '0.95rem', fontWeight: 500, opacity: 0.8 }}>
                / {selectedVariant.size} ({selectedVariant.uses})
              </span>
            </div>

            {/* Variant Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase', opacity: 0.75 }}>
                Choose Size &amp; Uses
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem' }}>
                {variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const isBestValue = v.id === '20ml';
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: isSelected ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                        backgroundColor: isSelected ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 14px rgba(123, 38, 56, 0.12)' : 'none',
                      }}
                    >
                      {isBestValue && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '12px',
                            backgroundColor: 'var(--color-deep-cherry)',
                            color: 'var(--color-warm-cream)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-pill)',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Best Value
                        </span>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: isSelected ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)' }}>
                          {v.size}
                        </span>
                        {isSelected && <Check size={16} color="var(--color-deep-cherry)" strokeWidth={3} />}
                      </div>
                      <div style={{ fontSize: '0.82rem', opacity: 0.75, marginBottom: '0.5rem' }}>
                        {v.uses}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-deep-cherry)' }}>
                        {product.currency}{v.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', opacity: 0.75 }}>
                  Quantity
                </label>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <AddToCartButton quantity={quantity} variant={selectedVariant} />
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
            FREQUENTLY BOUGHT TOGETHER SECTION
            -------------------------------------------------------------------- */}
        <FrequentlyBoughtTogether
          currentProductType="stick"
          stickVariant={selectedVariant}
          onSelectStickVariant={setSelectedVariant}
        />

        {/* --------------------------------------------------------------------
            WHAT'S INSIDE SECTION
            -------------------------------------------------------------------- */}
        <WhatsInsideSection style={{ margin: '4rem 0' }} />
      </div>
    </div>
  );
};

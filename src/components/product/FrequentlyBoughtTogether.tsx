import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ShoppingBag, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { refillVariants, type RefillOption } from '../../data/product';
import type { ProductVariant } from '../../api/types';

interface FrequentlyBoughtTogetherProps {
  currentProductType: 'stick' | 'refill';
  stickVariant?: ProductVariant;
  refillOption?: RefillOption;
  onSelectStickVariant?: (variant: ProductVariant) => void;
  onSelectRefillOption?: (refill: RefillOption) => void;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  currentProductType,
  stickVariant,
  refillOption,
}) => {
  const { product, addToCart, showToast } = useApp();

  const [includeStick, setIncludeStick] = useState(true);
  const [includeRefill, setIncludeRefill] = useState(true);

  // Selected sub-items
  const currentStick = stickVariant || product.variants?.[1] || product.variants?.[0] || {
    id: '20ml',
    name: '20ml (10 uses)',
    size: '20ml',
    uses: '10 uses',
    price: 129,
    original_price: 159,
    in_stock: true,
  };

  const currentRefill = refillOption || refillVariants[2] || refillVariants[0]; // 3-pack or 1st

  const stickPrice = currentStick.price ?? 129;
  const refillPrice = currentRefill.price ?? 20;

  const totalPrice =
    (includeStick ? stickPrice : 0) + (includeRefill ? refillPrice : 0);

  const totalOriginalPrice =
    (includeStick ? (currentStick.original_price ?? stickPrice + 30) : 0) +
    (includeRefill ? (currentRefill.original_price ?? refillPrice + 10) : 0);

  const totalSavings = totalOriginalPrice > totalPrice ? totalOriginalPrice - totalPrice : 0;

  const handleAddBundleToBag = () => {
    if (!includeStick && !includeRefill) {
      showToast('Please select at least one item.');
      return;
    }

    if (includeStick) {
      addToCart(1, currentStick);
    }
    if (includeRefill) {
      addToCart(1, currentRefill);
    }

    showToast('Bundle added to your bag!');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream-card)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.75rem, 4vw, 2.75rem)',
        border: '1px solid var(--color-cocoa-light)',
        boxShadow: 'var(--shadow-subtle)',
        marginTop: '3.5rem',
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <span
          className="eyebrow"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}
        >
          <RefreshCw size={13} color="var(--color-deep-cherry)" /> FREQUENTLY BOUGHT TOGETHER
        </span>
        <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', margin: 0 }}>
          Complete Zero-Contamination Care Bundle
        </h3>
        <p style={{ fontSize: '0.92rem', opacity: 0.85, marginTop: '0.35rem' }}>
          Pair your portable NIX Rescue Stick with fresh snap-on roller heads for hygienic stain care on the go.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(1.25rem, 3vw, 2rem)',
          alignItems: 'center',
        }}
      >
        {/* Items Pairing Visual Grid */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            flex: '1 1 auto',
          }}
        >
          {/* Item 1 — NIX Stick */}
          <div
            style={{
              flex: '1 1 200px',
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              border: includeStick ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
              opacity: includeStick ? 1 : 0.6,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={includeStick}
                onChange={(e) => setIncludeStick(e.target.checked)}
                style={{
                  accentColor: 'var(--color-deep-cherry)',
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-cream-card)',
                    border: '1px solid var(--color-cocoa-light)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={currentStick.id === '20ml' ? '/images/20ml-with-packaging.png' : '/images/10ml-with-packaging.png'}
                    alt="NIX Stick"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    NIX Rescue Stick
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.75, color: 'var(--color-deep-cherry)', fontWeight: 600 }}>
                    {currentStick.size} ({currentStick.uses})
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-deep-cherry)', marginTop: '2px' }}>
                    ₹{stickPrice}
                  </div>
                </div>
              </div>
            </label>
            {currentProductType !== 'stick' && (
              <Link
                to="/shop/stick"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-deep-cherry)',
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                View stick details <ArrowRight size={12} />
              </Link>
            )}
          </div>

          {/* Plus Divider */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cocoa-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-soft-cocoa)',
              flexShrink: 0,
              margin: '0 auto',
            }}
          >
            <Plus size={16} />
          </div>

          {/* Item 2 — NIX Roller-Ball Refill Cartridge */}
          <div
            style={{
              flex: '1 1 200px',
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              border: includeRefill ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
              opacity: includeRefill ? 1 : 0.6,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={includeRefill}
                onChange={(e) => setIncludeRefill(e.target.checked)}
                style={{
                  accentColor: 'var(--color-deep-cherry)',
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-cream-card)',
                    border: '1px solid var(--color-cocoa-light)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/images/refill-cartridge.png"
                    alt="NIX Refill Cartridge"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    Replaceable Roller Heads
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.75, color: 'var(--color-deep-cherry)', fontWeight: 600 }}>
                    {currentRefill.count}-Pack ({currentRefill.count * 5} uses)
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-deep-cherry)', marginTop: '2px' }}>
                    ₹{refillPrice}
                  </div>
                </div>
              </div>
            </label>
            {currentProductType !== 'refill' && (
              <Link
                to="/shop/refill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-deep-cherry)',
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                View refill details <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </div>

        {/* Total & Add Bundle CTA Box */}
        <div
          style={{
            backgroundColor: 'var(--color-warm-cream)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--color-cocoa-light)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Bundle Price ({[includeStick, includeRefill].filter(Boolean).length} items)
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-deep-cherry)' }}>
                ₹{totalPrice}
              </span>
              {totalSavings > 0 && (
                <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', opacity: 0.5 }}>
                  ₹{totalOriginalPrice}
                </span>
              )}
              {totalSavings > 0 && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-deep-cherry)',
                    backgroundColor: 'var(--color-blush-soft)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-pill)',
                  }}
                >
                  Save ₹{totalSavings}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            disabled={!includeStick && !includeRefill}
            onClick={handleAddBundleToBag}
          >
            <ShoppingBag size={18} />
            <span>
              {includeStick && includeRefill
                ? 'ADD BOTH TO BAG'
                : 'ADD SELECTED TO BAG'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

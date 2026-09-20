import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ProductImage } from '../components/product/ProductImage';
import { useApp } from '../context/AppContext';
import { refillVariants, type RefillOption } from '../data/product';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Sparkles,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Package,
} from 'lucide-react';
import type { ProductVariant } from '../api/types';

export const ShopPage: React.FC = () => {
  const { product, addToCart } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Stick card preview state
  const [activeStickVariant, setActiveStickVariant] = useState<string>('10ml');
  // Refill card preview state
  const [activeRefillPack, setActiveRefillPack] = useState<string>('refill-2pk');

  const stick10ml = product.variants?.find((v) => v.id === '10ml') || {
    id: '10ml',
    name: '10ml (5 uses)',
    size: '10ml',
    uses: '5 uses',
    price: 79,
    original_price: 99,
    in_stock: true,
  };
  const stick20ml = product.variants?.find((v) => v.id === '20ml') || {
    id: '20ml',
    name: '20ml (10 uses)',
    size: '20ml',
    uses: '10 uses',
    price: 129,
    original_price: 159,
    in_stock: true,
  };

  const selectedStick = activeStickVariant === '20ml' ? stick20ml : stick10ml;
  const selectedRefill = refillVariants.find((r) => r.id === activeRefillPack) || refillVariants[1];

  return (
    <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem) 0 5rem 0', width: '100%', overflowX: 'hidden' }}>
      <div className="container">
        {/* Catalog Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
            PORTABLE PERIOD STAIN CARE
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '1rem' }}>
            The NIX Care Collection
          </h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.88, lineHeight: 1.6 }}>
            Designed for life outside the laundry room. Instant pre-treatment sticks and hygienic replaceable roller heads.
          </p>
        </div>

        {/* --------------------------------------------------------------------
            TWO SLEEK PRODUCT CARDS (Side-by-Side Grid)
            -------------------------------------------------------------------- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'stretch',
            marginBottom: '4.5rem',
          }}
        >
          {/* ═════════ CARD 1: NIX PERIOD STAIN RESCUE STICK ═════════ */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-cocoa-light)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              {/* Product Visual Container */}
              <Link
                to="/shop/stick"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem 1rem',
                  border: '1px solid var(--color-cocoa-light)',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--color-deep-cherry)',
                    color: 'var(--color-warm-cream)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-pill)',
                    zIndex: 2,
                  }}
                >
                  Core Essential
                </span>

                <ProductImage
                  src={
                    activeStickVariant === '20ml'
                      ? '/images/20ml-with-packaging.png'
                      : '/images/10ml-with-packaging.png'
                  }
                  alt="NIX Period Stain Rescue Stick"
                  aspectRatio="4 / 3"
                  objectFit="contain"
                  priority={true}
                  style={{ maxHeight: '260px', margin: '0 auto' }}
                />
              </Link>

              {/* Title & Description */}
              <Link to="/shop/stick" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)', marginBottom: '0.5rem' }}>
                  NIX Period Stain Rescue Stick
                </h2>
              </Link>
              <p style={{ fontSize: '0.92rem', opacity: 0.85, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                A compact stain-treatment stick made to live in your everyday bag. Treat the spot now, wash normally when home.
              </p>

              {/* Quick Size Switcher Pills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.75, marginBottom: '0.5rem' }}>
                  Select Size
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveStickVariant('10ml')}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: activeStickVariant === '10ml' ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                      backgroundColor: activeStickVariant === '10ml' ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: activeStickVariant === '10ml' ? 'var(--color-deep-cherry)' : 'inherit' }}>
                      10ml Pocket
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-deep-cherry)', marginTop: '2px' }}>
                      ₹79 <span style={{ fontSize: '0.72rem', opacity: 0.6, fontWeight: 400, textDecoration: 'line-through' }}>₹99</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStickVariant('20ml')}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: activeStickVariant === '20ml' ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                      backgroundColor: activeStickVariant === '20ml' ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '-7px',
                        right: '6px',
                        backgroundColor: 'var(--color-deep-cherry)',
                        color: 'var(--color-warm-cream)',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-pill)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Best Value
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: activeStickVariant === '20ml' ? 'var(--color-deep-cherry)' : 'inherit' }}>
                      20ml Care
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-deep-cherry)', marginTop: '2px' }}>
                      ₹129 <span style={{ fontSize: '0.72rem', opacity: 0.6, fontWeight: 400, textDecoration: 'line-through' }}>₹159</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Feature Highlights */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.9 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} color="var(--color-deep-cherry)" /> Pre-treatment formula for fresh period stains
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} color="var(--color-deep-cherry)" /> Includes official custom packaging box
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <Link to="/shop/stick" style={{ flex: 1, textDecoration: 'none' }}>
                <Button variant="secondary" size="md" fullWidth>
                  VIEW PRODUCT →
                </Button>
              </Link>
              <Button
                variant="primary"
                size="md"
                style={{ flex: 1 }}
                onClick={() => addToCart(1, selectedStick)}
              >
                <ShoppingBag size={16} /> ADD TO BAG
              </Button>
            </div>
          </div>

          {/* ═════════ CARD 2: NIX REPLACEABLE ROLL-ON SYSTEM ═════════ */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-cocoa-light)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              {/* Product Visual Container */}
              <Link
                to="/shop/refill"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem 1rem',
                  border: '1px solid var(--color-cocoa-light)',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--color-dusty-blush)',
                    color: 'var(--color-soft-cocoa)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-pill)',
                    zIndex: 2,
                  }}
                >
                  Hygienic System
                </span>

                <ProductImage
                  src={selectedRefill.image || (selectedRefill.count === 3 ? '/images/roller-head-3.png' : selectedRefill.count === 2 ? '/images/roller-head-2.png' : '/images/roller-head-1.png')}
                  alt={`NIX Replaceable Roller-Ball Cartridges (${selectedRefill.name})`}
                  aspectRatio="4 / 3"
                  objectFit="contain"
                  priority={true}
                  style={{ maxHeight: '260px', margin: '0 auto' }}
                />
              </Link>

              {/* Title & Description */}
              <Link to="/shop/refill" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)', marginBottom: '0.5rem' }}>
                  NIX Replaceable Roll-On Heads
                </h2>
              </Link>
              <p style={{ fontSize: '0.92rem', opacity: 0.85, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                The roller-ball touches stained fabric directly. After ~5 uses, snap on a fresh replacement head to prevent cross-contamination.
              </p>

              {/* Quick Pack Switcher Pills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.75, marginBottom: '0.5rem' }}>
                  Select Pack
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  {refillVariants.map((r) => {
                    const isSelected = activeRefillPack === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setActiveRefillPack(r.id)}
                        style={{
                          padding: '0.55rem 0.35rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                          backgroundColor: isSelected ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isSelected ? 'var(--color-deep-cherry)' : 'inherit' }}>
                          {r.count}-Pack
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-deep-cherry)', marginTop: '2px' }}>
                          ₹{r.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feature Highlights */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.9 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} color="var(--color-deep-cherry)" /> Universal snap-on fit for 10ml &amp; 20ml sticks
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Check size={15} color="var(--color-deep-cherry)" /> Zero fabric bacterial transfer between outfits
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <Link to="/shop/refill" style={{ flex: 1, textDecoration: 'none' }}>
                <Button variant="secondary" size="md" fullWidth>
                  VIEW PRODUCT →
                </Button>
              </Link>
              <Button
                variant="primary"
                size="md"
                style={{ flex: 1 }}
                onClick={() => addToCart(1, selectedRefill)}
              >
                <ShoppingBag size={16} /> ADD TO BAG
              </Button>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------
            EMERGENCY KIT TEASER
            -------------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '1px solid var(--color-cocoa-light)',
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="eyebrow">FUTURE ECOSYSTEM</span>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', marginBottom: '0.75rem' }}>
              The NIX Emergency Kit
            </h3>
            <p style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '1.5rem' }}>
              A complete on-the-go kit featuring NIX sticks, biodegradable disposal pouches, and intimate cleansing wipes.
            </p>
            <Link to="/emergency-kit">
              <Button variant="secondary" size="md">
                EXPLORE EMERGENCY KIT <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <ProductImage
              src="/images/emergency_kit.png"
              alt="NIX Emergency Kit"
              aspectRatio="4 / 3"
              objectFit="contain"
              style={{ maxHeight: '200px', margin: '0 auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

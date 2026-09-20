import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductImage } from '../components/product/ProductImage';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { Accordion } from '../components/common/Accordion';
import { Button } from '../components/common/Button';
import { FrequentlyBoughtTogether } from '../components/product/FrequentlyBoughtTogether';
import { useApp } from '../context/AppContext';
import { refillVariants, type RefillOption } from '../data/product';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  RefreshCw,
  ShoppingBag,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const RefillProductPage: React.FC = () => {
  const { addToCart } = useApp();
  const [selectedRefill, setSelectedRefill] = useState<RefillOption>(
    refillVariants[1] || refillVariants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyNow = () => {
    addToCart(quantity, selectedRefill);
    navigate('/checkout');
  };

  const refillDetails = [
    {
      title: 'Why replace the roller-ball head?',
      content:
        'The roller-ball is the only component that touches stained garments directly. Rather than applying a used applicator back onto fresh clothing over months, replacing the head after ~5 emergency uses guarantees 100% sterile pre-treatment without bacterial cross-contamination.',
    },
    {
      title: 'Which NIX sticks are compatible?',
      content:
        'All NIX replacement cartridges feature universal snap-lock engineering, making them fully compatible with both the 10ml Pocket Stick and the 20ml Standard Care Stick.',
    },
    {
      title: 'How do I swap the cartridge?',
      content:
        '1. Firmly grasp the existing roller-ball housing and pull upward until it clicks off.\n2. Align the new cartridge with the stick neck.\n3. Press down until you hear a secure snap. Your NIX stick is instantly refreshed!',
    },
    {
      title: 'Shelf life & packaging',
      content:
        'Each cartridge is individually sealed in an airtight foil barrier to protect the active formulation and keep the stainless-steel roller ball pristine until opened.',
    },
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
            NIX Replaceable Roll-On System
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
          {/* Left Column — Visual Showcase */}
          <div style={{ minWidth: 0, width: '100%', textAlign: 'center' }}>
            <ProductImage
              src={selectedRefill.image || (selectedRefill.count === 3 ? '/images/roller-head-3.png' : selectedRefill.count === 2 ? '/images/roller-head-2.png' : '/images/roller-head-1.png')}
              alt={selectedRefill.name}
              label={`Snap-On Roller-Ball Replacement Head (${selectedRefill.count}-Pack)`}
              badge={selectedRefill.badge || `${selectedRefill.count * 5} Emergency Uses`}
              aspectRatio="1 / 1"
              objectFit="contain"
              priority={true}
              style={{ maxHeight: '440px', margin: '0 auto' }}
            />

            {/* Quick pack thumbnail preview buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '1.25rem',
              }}
            >
              {refillVariants.map((r) => {
                const isSelected = selectedRefill.id === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRefill(r)}
                    style={{
                      width: '64px',
                      height: '64px',
                      padding: '4px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                      backgroundColor: isSelected ? 'var(--color-blush-soft)' : 'var(--color-cream-card)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    title={r.name}
                  >
                    <img
                      src={r.image || (r.count === 3 ? '/images/roller-head-3.png' : r.count === 2 ? '/images/roller-head-2.png' : '/images/roller-head-1.png')}
                      alt={r.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        backgroundColor: isSelected ? 'var(--color-deep-cherry)' : 'rgba(0,0,0,0.55)',
                        color: '#fff',
                        padding: '0 4px',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      {r.count}pk
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-blush-soft)',
                color: 'var(--color-deep-cherry)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginTop: '1.25rem',
              }}
            >
              <RefreshCw size={14} /> Zero Cross-Contamination System
            </div>
          </div>

          {/* Right Column — Product Purchase Info */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <span className="eyebrow">HYGIENIC CARE &amp; ZERO CONTAMINATION</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              NIX Replaceable Roll-On System
            </h1>

            <p style={{ fontSize: '1.05rem', opacity: 0.88, marginBottom: '1.25rem', lineHeight: 1.6 }}>
              The roller-ball applicator is the only part that comes into direct contact with stained fabric. After ~5 emergency uses, snap on a fresh replacement cartridge head (from ₹10) rather than repeatedly putting a used applicator back against fresh garments.
            </p>

            {/* Price display */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-deep-cherry)' }}>
                ₹{selectedRefill.price}
              </span>
              <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', opacity: 0.5 }}>
                ₹{selectedRefill.original_price}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-deep-cherry)',
                  backgroundColor: 'var(--color-blush-soft)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                {selectedRefill.discount}
              </span>
              <span style={{ fontSize: '0.9rem', opacity: 0.75, marginLeft: 'auto' }}>
                {selectedRefill.per_unit}
              </span>
            </div>

            {/* Pack Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase', opacity: 0.75 }}>
                Select Cartridge Pack
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {refillVariants.map((r) => {
                  const isSelected = selectedRefill.id === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRefill(r)}
                      style={{
                        padding: '0.85rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                        backgroundColor: isSelected ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {r.badge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-9px',
                            right: '8px',
                            backgroundColor: 'var(--color-deep-cherry)',
                            color: 'var(--color-warm-cream)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-pill)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {r.badge}
                        </span>
                      )}
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)', marginBottom: '0.2rem' }}>
                        {r.count}-Pack
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.75, marginBottom: '0.4rem' }}>
                        {r.count * 5} uses
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-deep-cherry)' }}>
                        ₹{r.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="var(--color-deep-cherry)" />
                <span>Universally fits both 10ml &amp; 20ml NIX Sticks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="var(--color-deep-cherry)" />
                <span>Smooth medical-grade stainless steel roller-ball flow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="var(--color-deep-cherry)" />
                <span>Prevents fabric bacterial cross-contamination</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', opacity: 0.75 }}>
                  Quantity
                </label>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addToCart(quantity, selectedRefill)}
                >
                  <ShoppingBag size={18} />
                  <span>ADD REFILL TO BAG</span>
                </Button>
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
            <Accordion items={refillDetails} />
          </div>
        </div>

        {/* --------------------------------------------------------------------
            FREQUENTLY BOUGHT TOGETHER SECTION
            -------------------------------------------------------------------- */}
        <FrequentlyBoughtTogether
          currentProductType="refill"
          refillOption={selectedRefill}
          onSelectRefillOption={setSelectedRefill}
        />
      </div>
    </div>
  );
};

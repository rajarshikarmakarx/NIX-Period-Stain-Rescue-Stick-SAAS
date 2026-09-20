import React, { useState } from 'react';
import { Leaf, ShieldCheck, Feather, Droplet, Sparkles, Heart, CheckCircle2, XCircle, Info } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

interface IngredientItem {
  id: string;
  name: string;
  source: string;
  purpose: string;
  gentleDetail: string;
  icon: React.ElementType;
}

const ingredientsList: IngredientItem[] = [
  {
    id: 'enzymes',
    name: 'Targeted Bio-Protease Complex',
    source: 'Natural Fermentation',
    purpose: 'Breaks down blood proteins',
    gentleDetail: 'Protease specifically targets and dissolves hemoglobin protein structures at room temperature without weakening delicate fabric weaves.',
    icon: Sparkles,
  },
  {
    id: 'surfactants',
    name: 'Coconut-Derived Glucosides',
    source: 'Sustainable Coconut Palm',
    purpose: 'Lifts stain residues from fibers',
    gentleDetail: 'Ultra-gentle plant surfactants release trapped organic pigment from fibers without stripping fabric dye or leaving oily rings.',
    icon: Leaf,
  },
  {
    id: 'phguard',
    name: 'pH-Neutral Fabric Care Buffer',
    source: 'Mineral Salt Extract',
    purpose: 'Maintains skin-neutral pH balance',
    gentleDetail: 'Keeps the formula at a skin-safe pH (5.5–6.0), ensuring zero skin irritation when handling underwear, activewear, and intimate linens.',
    icon: ShieldCheck,
  },
  {
    id: 'base',
    name: 'Plant Candelilla Wax Matrix',
    source: 'Wild Candelilla Shrub',
    purpose: 'Solid non-spill stick structure',
    gentleDetail: 'Natural vegetable wax creates a smooth solid stick format that glides effortlessly over dry or damp fabric without liquid leaks.',
    icon: Feather,
  },
];

export const WhatsInsideSection: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const [activeIngredient, setActiveIngredient] = useState<string>('enzymes');

  const selected = ingredientsList.find((i) => i.id === activeIngredient) || ingredientsList[0];

  return (
    <section
      className="whats-inside-section"
      style={{
        backgroundColor: 'var(--color-warm-cream)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(2rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2rem)',
        border: '1px solid var(--color-cocoa-light)',
        boxShadow: 'var(--shadow-subtle)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        <SectionHeading
          eyebrow="CLEAN & CONSCIOUS FORMULATION"
          title="What's inside"
          subtitle="Formulated to be gentle where it matters."
        />

        {/* Top Feature Badges Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { icon: ShieldCheck, label: 'Hypoallergenic & Dermatologist Safe' },
            { icon: Leaf, label: 'Plant-Based Bio-Enzymes' },
            { icon: Feather, label: 'Safe for Undies & Delicates' },
            { icon: Heart, label: 'Zero Harsh Bleach or Chlorine' },
          ].map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <span
                key={idx}
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  color: 'var(--color-deep-cherry)',
                  border: '1px solid var(--color-cocoa-light)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textAlign: 'center',
                }}
              >
                <Icon size={15} style={{ flexShrink: 0 }} /> {badge.label}
              </span>
            );
          })}
        </div>

        {/* Main 2-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}
        >
          {/* Left Column — Interactive Ingredient Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--color-soft-cocoa)' }}>
              Core Active Ingredients
            </h3>
            {ingredientsList.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === activeIngredient;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIngredient(item.id)}
                  style={{
                    textAlign: 'left',
                    backgroundColor: isSelected ? 'var(--color-cream-card)' : 'var(--color-cream-light)',
                    border: isSelected ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.15rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isSelected ? 'var(--color-deep-cherry)' : 'var(--color-blush-soft)',
                      color: isSelected ? 'var(--color-warm-cream)' : 'var(--color-deep-cherry)',
                      padding: '0.65rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-soft-cocoa)', wordBreak: 'break-word' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.75, marginTop: '0.1rem' }}>
                      Source: {item.source} &bull; {item.purpose}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column — Spotlight Details Card */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.25rem, 3vw, 2.25rem)',
              border: '2px solid var(--color-deep-cherry)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              boxSizing: 'border-box',
              minWidth: 0,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge-cherry">INGREDIENT FOCUS</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Derived from {selected.source}</span>
              </div>

              <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', marginBottom: '0.75rem', color: 'var(--color-deep-cherry)' }}>
                {selected.name}
              </h3>

              <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '1.5rem' }}>
                {selected.gentleDetail}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.15rem',
                  border: '1px solid var(--color-cocoa-light)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <Info size={18} color="var(--color-deep-cherry)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Why Gentle Matters:</strong> Intimate garments stay close to your skin all day. NIX leaves no toxic chemical residue, keeping both your skin and clothing safe.
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.75rem',
                paddingTop: '1.15rem',
                borderTop: '1px solid var(--color-cocoa-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-deep-cherry)',
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} /> 100% Biodegradable & Water-Soluble Pre-Wash Formula
            </div>
          </div>
        </div>

        {/* Bottom Comparison Grid: What We Use vs What We NEVER Use */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1rem, 3vw, 2.5rem)',
            border: '1px solid var(--color-cocoa-light)',
            boxSizing: 'border-box',
          }}
        >
          <h4 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', textAlign: 'center' }}>
            Formulation Standards Comparison
          </h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* Always Included */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid rgba(46, 125, 50, 0.3)',
              }}
            >
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2e7d32', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={18} color="#2e7d32" /> ALWAYS IN NIX
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Targeted Bio-Protease Enzymes</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Coconut-based Glucoside Surfactants</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Hypoallergenic Fragrance-Free Core</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Skin-Neutral pH 5.5 Buffers</li>
              </ul>
            </div>

            {/* Never Included */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid rgba(168, 58, 75, 0.3)',
              }}
            >
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-cherry-red)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <XCircle size={18} color="var(--color-cherry-red)" /> NEVER IN NIX
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>❌ 0% Chlorine or Optical Bleach</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>❌ 0% Artificial Dyes or Fragrance</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>❌ 0% Harsh Parabens or Phthalates</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>❌ 0% Corrosive Solvents or Ammonia</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsInsideSection;

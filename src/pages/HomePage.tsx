import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  Check,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductImage } from '../components/product/ProductImage';
import { WhatsInsideSection } from '../components/product/WhatsInsideSection';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { product, addToCart } = useApp();
  const [heroVariant, setHeroVariant] = useState<'10ml' | '20ml'>('10ml');

  const heroImageSrc =
    heroVariant === '10ml'
      ? '/images/10ml-with-packaging.png'
      : '/images/20ml-with-packaging.png';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        paddingBottom: '5rem',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* --------------------------------------------------------------------
          SECTION 1 — HERO (§10)
          -------------------------------------------------------------------- */}
      <section style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Hero Copy */}
            <div>
              <span className="eyebrow">NIX & CO. / PERIOD STAIN RESCUE</span>
              <h1 style={{ marginBottom: '1.25rem' }}>
                For the stain you{' '}
                <span style={{ color: 'var(--color-deep-cherry)', fontStyle: 'italic' }}>
                  didn't plan for.
                </span>
              </h1>
              <p
                style={{
                  fontSize: '1.15rem',
                  opacity: 0.9,
                  marginBottom: '2rem',
                  maxWidth: '520px',
                }}
              >
                Period stains don't wait until you're home. NIX is a portable pre-treatment stick
                designed for fresh menstrual stains — so you can deal with the moment, and keep moving.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    SHOP NIX — from {product.currency}{product.price} <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="secondary" size="lg">
                    HOW IT WORKS
                  </Button>
                </Link>
              </div>

              {/* Trust Micro Badges */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginTop: '2.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  opacity: 0.85,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="var(--color-deep-cherry)" /> Pre-treatment formula
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Zap size={16} color="var(--color-deep-cherry)" /> 10ml (₹79) &amp; 20ml (₹129) sticks
                </span>
              </div>
            </div>

            {/* Right Hero Product Image — Interactive 10ml/20ml switcher, hidden on mobile above Section 2 */}
            <div
              className="hero-image-desktop-only"
              style={{
                minWidth: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ProductImage
                src={heroImageSrc}
                alt={`NIX Period Stain Rescue Stick (${heroVariant})`}
                badge={heroVariant === '10ml' ? '10ml • ₹79' : '20ml • ₹129'}
                aspectRatio="3 / 4"
                objectFit="contain"
                priority={true}
                style={{ maxHeight: '460px', margin: '0 auto', width: '100%' }}
              />

              {/* 10ml & 20ml Image Changer Buttons */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-cream-card)',
                  border: '1px solid var(--color-cocoa-light)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px',
                  marginTop: '1.25rem',
                  gap: '4px',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setHeroVariant('10ml')}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    backgroundColor: heroVariant === '10ml' ? 'var(--color-deep-cherry)' : 'transparent',
                    color: heroVariant === '10ml' ? 'var(--color-warm-cream)' : 'var(--color-soft-cocoa)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  10ml (₹79)
                </button>
                <button
                  type="button"
                  onClick={() => setHeroVariant('20ml')}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    backgroundColor: heroVariant === '20ml' ? 'var(--color-deep-cherry)' : 'transparent',
                    color: heroVariant === '20ml' ? 'var(--color-warm-cream)' : 'var(--color-soft-cocoa)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  20ml (₹129)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 2 — THE PROBLEM (§10 S2)
          -------------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-cream-card)',
          padding: 'clamp(3rem, 5vw, 4.5rem) 0',
          borderTop: '1px solid var(--color-cocoa-light)',
          borderBottom: '1px solid var(--color-cocoa-light)',
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="REAL-LIFE MOMENTS"
            title="It always happens at the worst time."
            subtitle="You shouldn't need a laundry room to handle the moment."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                title: 'At College',
                text: 'You notice it halfway through a 2-hour lecture, miles from your hostel or home.',
              },
              {
                title: 'At Work',
                text: 'Before a big client presentation when changing outfits simply isn’t an option.',
              },
              {
                title: 'On the Commute',
                text: 'Packed metro or bus ride with nowhere to stop and treat the spot.',
              },
              {
                title: 'While Travelling',
                text: 'Long train rides, flights, or road trips without full laundry access.',
              },
              {
                title: 'At the Gym',
                text: 'Workout tights and activewear in public before heading to work.',
              },
            ].map((scenario, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  border: '1px solid var(--color-cocoa-light)',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-deep-cherry)',
                    marginBottom: '0.5rem',
                  }}
                >
                  SCENARIO 0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{scenario.title}</h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.85 }}>{scenario.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 3 — MEET NIX (§11 - Deep Cherry Contrast Section)
          -------------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-deep-cherry)',
          color: 'var(--color-warm-cream)',
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          borderRadius: 'var(--radius-xl)',
          margin: '0 clamp(0.5rem, 2vw, 1.5rem)',
          boxSizing: 'border-box',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-dusty-blush)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                THE SOLUTION
              </span>
              <h2 style={{ color: 'var(--color-warm-cream)', marginBottom: '1.25rem' }}>
                Meet NIX.
              </h2>
              <p
                style={{
                  color: 'var(--color-warm-cream)',
                  opacity: 0.9,
                  fontSize: '1.1rem',
                  marginBottom: '1.75rem',
                }}
              >
                A compact stain-treatment stick made to live in your everyday bag. Keep it with you.
                Treat the stain. Deal with it later.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                  gap: '0.85rem',
                  marginBottom: '2rem',
                }}
              >
                {[
                  'Discreet Carry',
                  'Fresh Stain Pre-Treatment',
                  'Non-Spill Solid Stick',
                  'Safe Pre-Wash Care',
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      color="var(--color-dusty-blush)"
                      style={{ flexShrink: 0 }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link to="/shop">
                <Button
                  style={{
                    backgroundColor: 'var(--color-warm-cream)',
                    color: 'var(--color-deep-cherry)',
                  }}
                  size="lg"
                >
                  EXPLORE NIX STICK →
                </Button>
              </Link>
            </div>

            <div>
              <ProductImage
                src="/images/10ml-with-packaging.png"
                alt="Meet NIX - Handbag Ready Stick with Packaging"
                label="Pocket & Handbag Companion (10ml & 20ml)"
                badge="Discreet & Portable"
                aspectRatio="3 / 4"
                objectFit="contain"
                style={{ maxHeight: '440px', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 3.5 — CYCLE PREDICTOR BANNER
          -------------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-cream-card)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 0',
          borderTop: '1px solid var(--color-cocoa-light)',
          borderBottom: '1px solid var(--color-cocoa-light)',
        }}
      >
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)',
              border: '2px solid var(--color-deep-cherry)',
              boxShadow: 'var(--shadow-card)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 2.5rem)',
              alignItems: 'center',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <div>
              <span
                className="eyebrow"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}
              >
                <Calendar size={14} color="var(--color-deep-cherry)" /> NEW FEATURE &bull; NIX CYCLE
                INTELLIGENCE
              </span>
              <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                Know your peak stain risk days in advance.
              </h2>
              <p style={{ fontSize: '1.05rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                Use our built-in Cycle & Stain Preparedness Predictor to calculate your upcoming flow
                phases, set period reminders, and make sure your NIX Rescue Stick is packed before
                emergency strikes.
              </p>
              <Link to="/cycle-predictor">
                <Button variant="primary" size="md">
                  TRY CYCLE PREDICTOR <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                border: '1px solid var(--color-cocoa-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxSizing: 'border-box',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    backgroundColor: 'var(--color-deep-cherry)',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Dynamic Interactive Calendar
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Color-coded period & ovulation predictions
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    backgroundColor: 'var(--color-blush-soft)',
                    color: 'var(--color-deep-cherry)',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Smart Stain Risk Index</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Phase-by-phase clothing care advisories
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    backgroundColor: 'var(--color-warm-cream)',
                    border: '1px solid var(--color-cocoa-light)',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} color="var(--color-deep-cherry)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Incident & Flow Logging
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Track moments NIX saved your favorite outfits
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 3.8 — TWO SIZE VARIANTS SHOWCASE (10ml vs 20ml)
          -------------------------------------------------------------------- */}
      <section>
        <div className="container">
          <SectionHeading
            eyebrow="CHOOSE YOUR FORMAT"
            title="Two sizes. One stain-free peace of mind."
            subtitle="Pick the pocket starter stick or our best-value everyday care stick."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2rem',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {/* 10ml Card */}
            <div
              style={{
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-cocoa-light)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-subtle)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <ProductImage
                  src="/images/10ml-with-packaging.png"
                  alt="NIX 10ml Starter Stick"
                  aspectRatio="4 / 3"
                  objectFit="contain"
                  badge="10ml • Pocket Starter"
                  label="10ml (5 Emergency Uses)"
                />
              </div>

              <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.4rem' }}>10ml Pocket Stick</h3>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--color-deep-cherry)',
                      }}
                    >
                      ₹79
                    </span>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        textDecoration: 'line-through',
                        opacity: 0.5,
                        marginLeft: '0.4rem',
                      }}
                    >
                      ₹99
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', opacity: 0.85, marginBottom: '1rem' }}>
                  Ultra-compact and lightweight. Built to slip discreetly into small clutches, jeans
                  pockets, or college pencil pouches.
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    padding: 0,
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> 5 full stain pre-treatments
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> Zero-spill solid formulation
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> Official retail packaging box
                  </li>
                </ul>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => addToCart(1, '10ml')}
              >
                ADD 10ML TO BAG — ₹79
              </Button>
            </div>

            {/* 20ml Card (Best Value) */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--color-deep-cherry)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  backgroundColor: 'var(--color-deep-cherry)',
                  color: 'var(--color-warm-cream)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: '0 2px 8px rgba(123, 38, 56, 0.25)',
                  zIndex: 3,
                }}
              >
                Most Popular • Best Value
              </div>

              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <ProductImage
                  src="/images/20ml-with-packaging.png"
                  alt="NIX 20ml Value Stick"
                  aspectRatio="4 / 3"
                  objectFit="contain"
                  badge="20ml • Standard Care"
                  label="20ml (10 Full Uses) — 2X Capacity"
                />
              </div>

              <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.4rem' }}>20ml Standard Stick</h3>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--color-deep-cherry)',
                      }}
                    >
                      ₹129
                    </span>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        textDecoration: 'line-through',
                        opacity: 0.5,
                        marginLeft: '0.4rem',
                      }}
                    >
                      ₹159
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', opacity: 0.85, marginBottom: '1rem' }}>
                  Double the capacity for regular peace of mind. Keep one permanently in your work
                  tote or backpack for everyday readiness.
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    padding: 0,
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> 10 full stain pre-treatments (2x uses)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> Best cost per use (₹12.9 / use)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="var(--color-deep-cherry)" /> Official retail packaging box
                  </li>
                </ul>
              </div>

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => addToCart(1, '20ml')}
              >
                ADD 20ML TO BAG — ₹129
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 4 — HOW IT WORKS PREVIEW (§12)
          -------------------------------------------------------------------- */}
      <section>
        <div className="container">
          <SectionHeading
            eyebrow="SIMPLE 4-STEP CARE"
            title="Treat it now. Wash it later."
            subtitle="No sink drama. No frantic rubbing with harsh soap."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { step: '01', title: 'Blot', text: 'Gently blot excess moisture with tissue paper.' },
              { step: '02', title: 'Apply', text: 'Apply NIX directly onto the fresh stain area.' },
              { step: '03', title: 'Work It In', text: 'Gently work the pre-treatment into the fabric fibers.' },
              { step: '04', title: 'Wash Later', text: 'Wash garment normally when you get home.' },
            ].map((st, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  border: '1px solid var(--color-cocoa-light)',
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '2.5rem',
                    color: 'var(--color-deep-cherry)',
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {st.step}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{st.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{st.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/how-it-works">
              <Button variant="secondary" size="md">
                SEE DETAILED INSTRUCTIONS →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 4.5 — WHAT'S INSIDE: FORMULATED TO BE GENTLE WHERE IT MATTERS
          -------------------------------------------------------------------- */}
      <div className="container">
        <WhatsInsideSection />
      </div>

      {/* --------------------------------------------------------------------
          SECTION 5 — WHY A STICK? (§13)
          -------------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-cream-card)',
          padding: 'clamp(3rem, 5vw, 4.5rem) 0',
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="THE FORMAT MATTERS"
            title="Why carry a bulky bottle when you can carry NIX?"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {/* Conventional */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '1px solid var(--color-cocoa-light)',
                opacity: 0.8,
                boxSizing: 'border-box',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  marginBottom: '1.25rem',
                  color: 'var(--color-cocoa-muted)',
                }}
              >
                Conventional Stain Removers
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontSize: '0.95rem',
                }}
              >
                <li style={{ display: 'flex', gap: '0.5rem' }}>❌ Designed for home / laundry room</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>❌ Bulky liquid bottles that leak in bags</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>❌ Awkward to carry discreetly</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>❌ Requires immediate rinsing</li>
              </ul>
            </div>

            {/* NIX */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '2px solid var(--color-deep-cherry)',
                boxShadow: 'var(--shadow-card)',
                boxSizing: 'border-box',
              }}
            >
              <div className="badge badge-cherry" style={{ marginBottom: '1rem' }}>
                DESIGNED FOR ON-THE-GO
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>NIX Rescue Stick</h3>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  fontSize: '0.95rem',
                }}
              >
                <li style={{ display: 'flex', gap: '0.5rem' }}>✓ Compact & portable solid stick format</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✓ Fits in any pocket, handbag, or pouch</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✓ 100% spill-proof solid formulation</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✓ Pre-treat in seconds; wash when convenient</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 6 — SOCIAL PROOF / BELIEVABILITY (§14)
          -------------------------------------------------------------------- */}
      <section>
        <div className="container">
          <SectionHeading
            eyebrow="MADE FOR REAL-LIFE EMERGENCIES"
            title="What people wish they had sooner."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                quote:
                  '“I wish I had this during my college hostel days. Period stains in public used to ruin my whole afternoon.”',
                author: 'Ananya S., Delhi University',
              },
              {
                quote:
                  '“Keeping the 20ml stick in my office tote bag gives me instant peace of mind. It takes zero space.”',
                author: 'Pooja M., Product Designer',
              },
              {
                quote:
                  '“The pre-treatment format makes so much sense because you don’t need to do a frantic wash immediately.”',
                author: 'Tanvi K., Bangalore',
              },
            ].map((review, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  border: '1px solid var(--color-cocoa-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                }}
              >
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    marginBottom: '1.25rem',
                    opacity: 0.9,
                  }}
                >
                  {review.quote}
                </p>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-deep-cherry)',
                  }}
                >
                  — {review.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

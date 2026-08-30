import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, HeartHandshake, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductImage } from '../components/product/ProductImage';
import { AddToCartButton } from '../components/product/AddToCartButton';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { product } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '5rem' }}>
      {/* --------------------------------------------------------------------
          SECTION 1 — HERO (§10)
          -------------------------------------------------------------------- */}
      <section style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left Hero Copy */}
            <div>
              <span className="eyebrow">NIX & CO. / PERIOD STAIN RESCUE</span>
              <h1 style={{ marginBottom: '1.25rem' }}>
                For the stain you <span style={{ color: 'var(--color-deep-cherry)', fontStyle: 'italic' }}>didn't plan for.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '520px' }}>
                Period stains don't wait until you're home. NIX is a portable pre-treatment stick designed for fresh menstrual stains — so you can deal with the moment, and keep moving.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    SHOP NIX — {product.currency}{product.price} <ArrowRight size={18} />
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
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} color="var(--color-deep-cherry)" /> Pre-treatment formula
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Zap size={16} color="var(--color-deep-cherry)" /> Portable stick format
                </span>
              </div>
            </div>

            {/* Right Hero Product Image */}
            <div>
              <ProductImage alt="NIX Rescue Stick Hero" label="Portable 15g Pre-Treatment Stick" aspectRatio="1 / 1" />
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
          padding: '4.5rem 0',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { title: 'At College', text: 'You notice it halfway through a 2-hour lecture, miles from your hostel or home.' },
              { title: 'At Work', text: 'Before a big client presentation when changing outfits simply isn’t an option.' },
              { title: 'On the Commute', text: 'Packed metro or bus ride with nowhere to stop and treat the spot.' },
              { title: 'While Travelling', text: 'Long train rides, flights, or road trips without full laundry access.' },
              { title: 'At the Gym', text: 'Workout tights and activewear in public before heading to work.' },
            ].map((scenario, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  border: '1px solid var(--color-cocoa-light)',
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
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{scenario.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{scenario.text}</p>
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
          padding: '5rem 0',
          borderRadius: 'var(--radius-xl)',
          margin: '0 1.5rem',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3.5rem',
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
              <h2 style={{ color: 'var(--color-warm-cream)', marginBottom: '1.25rem' }}>Meet NIX.</h2>
              <p style={{ color: 'var(--color-warm-cream)', opacity: 0.9, fontSize: '1.1rem', marginBottom: '1.75rem' }}>
                A compact stain-treatment stick made to live in your everyday bag. Keep it with you. Treat the stain. Deal with it later.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  'Discreet Carry',
                  'Fresh Stain Pre-Treatment',
                  'Non-Spill Solid Stick',
                  'Safe Pre-Wash Care',
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} color="var(--color-dusty-blush)" />
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
              <ProductImage alt="Meet NIX" label="Discreet & Portable Design" />
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
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
                  padding: '2rem',
                  border: '1px solid var(--color-cocoa-light)',
                  position: 'relative',
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
          SECTION 5 — WHY A STICK? (§13)
          -------------------------------------------------------------------- */}
      <section style={{ backgroundColor: 'var(--color-cream-card)', padding: '4.5rem 0' }}>
        <div className="container">
          <SectionHeading
            eyebrow="THE FORMAT MATTERS"
            title="Why carry a bulky bottle when you can carry NIX?"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {/* Conventional */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--color-cocoa-light)',
                opacity: 0.8,
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-cocoa-muted)' }}>
                Conventional Stain Removers
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem' }}>
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
                padding: '2rem',
                border: '2px solid var(--color-deep-cherry)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="badge badge-cherry" style={{ marginBottom: '1rem' }}>
                DESIGNED FOR ON-THE-GO
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>NIX Rescue Stick</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                quote: '“I wish I had this during my college hostel days. Period stains in public used to ruin my whole afternoon.”',
                author: 'Placeholder Community Feedback',
              },
              {
                quote: '“Keeping one in my office tote bag gives me instant peace of mind. It takes zero space.”',
                author: 'Placeholder Early Tester',
              },
              {
                quote: '“The pre-treatment format makes so much sense because you don’t need to do a full wash immediately.”',
                author: 'Placeholder Lifestyle Review',
              },
            ].map((review, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  border: '1px solid var(--color-cocoa-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', opacity: 0.9 }}>
                  {review.quote}
                </p>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-deep-cherry)' }}>
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

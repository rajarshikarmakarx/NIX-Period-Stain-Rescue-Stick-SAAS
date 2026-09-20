import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ProductImage } from '../components/product/ProductImage';
import { RefreshCw, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <SectionHeading
          eyebrow="APPLICATION GUIDE"
          title="Designed for the moment before you get home."
          subtitle="Simple pre-treatment steps to prevent period stains from setting in fabric."
        />

        {/* 4-Step Detailed Editorial Breakdown with Real Product Photos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '4rem 0' }}>
          {[
            {
              step: '01',
              title: 'Blot Excess Moisture',
              desc: 'As soon as you notice a fresh stain, use a clean tissue or paper towel to gently blot any excess fluid. Do not rub vigorously across the fabric.',
              tip: 'Pro Tip: Always blot from the outer edge inward to prevent spreading.',
              imageSrc: '/images/10ml-without-packaging.png',
              imageLabel: 'NIX 10ml Pocket Stick • Handbag-Ready',
              badge: 'Step 01 • Blot',
            },
            {
              step: '02',
              title: 'Apply NIX Pre-Treatment Stick',
              desc: 'Uncap your NIX Stick (10ml or 20ml) and swipe the formulation generously over the affected stain area. Cover the entire spot thoroughly.',
              tip: 'Works on cotton, denim, canvas, activewear, and common fabric blends.',
              imageSrc: '/images/20ml-without-packaging.png',
              imageLabel: 'NIX 20ml Stick • Generous Targeted Coverage',
              badge: 'Step 02 • Apply',
            },
            {
              step: '03',
              title: 'Gently Work It Into Fibers',
              desc: 'Use the smooth stick tip or your clean fingertips to massage the pre-treatment into the fabric fibers for 10–15 seconds.',
              tip: 'The active bio-protease formulation breaks down heme proteins before they bond to fabric.',
              imageSrc: '/images/10ml-with-packaging.png',
              imageLabel: '10ml Pocket Stick with Packaging Box',
              badge: 'Step 03 • Work In',
            },
            {
              step: '04',
              title: 'Wash Normally When Home',
              desc: 'Pop the treated garment into your regular wash cycle when you get back home. NIX keeps the stain pre-treated so it washes out easily.',
              tip: 'Cold or warm water wash recommended for best results.',
              imageSrc: '/images/20ml-with-packaging.png',
              imageLabel: '20ml Standard Stick with Packaging Box',
              badge: 'Step 04 • Home Wash',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 3rem)',
                alignItems: 'center',
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(1.25rem, 3vw, 2.5rem)',
                border: '1px solid var(--color-cocoa-light)',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '3rem',
                    color: 'var(--color-deep-cherry)',
                    fontWeight: 700,
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  STEP {item.step}
                </span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ fontSize: '1.05rem', opacity: 0.9, marginBottom: '1.25rem' }}>
                  {item.desc}
                </p>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-deep-cherry)',
                    backgroundColor: 'var(--color-blush-soft)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    display: 'inline-block',
                  }}
                >
                  {item.tip}
                </div>
              </div>

              <div>
                <ProductImage
                  src={item.imageSrc}
                  alt={`Step ${item.step} — ${item.title}`}
                  label={item.imageLabel}
                  badge={item.badge}
                  aspectRatio="4 / 3"
                  objectFit="contain"
                  style={{ maxHeight: '360px', margin: '0 auto' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* --------------------------------------------------------------------
            HYGIENE & ZERO CROSS-CONTAMINATION PROTOCOL
            -------------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            border: '2px solid var(--color-deep-cherry)',
            margin: '4rem 0',
            boxShadow: 'var(--shadow-card)',
          }}
        >
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
                className="eyebrow"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <RefreshCw size={14} color="var(--color-deep-cherry)" /> HYGIENIC ROLL-ON DESIGN
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
                Why Replaceable Roller Heads Matter
              </h2>
              <p style={{ fontSize: '1.05rem', opacity: 0.9, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                The roller-ball is the only part that comes into direct contact with stained fabric. After ~5 emergency uses, snap on a fresh replacement cartridge head (priced from ₹10) rather than repeatedly putting a used applicator back against fresh garments.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--color-deep-cherry)', color: 'var(--color-warm-cream)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, marginTop: '2px' }}>✓</div>
                  <div style={{ fontSize: '0.95rem' }}><strong>Zero Cross-Contamination:</strong> Keeps the formulation inside pristine and prevents residue buildup.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--color-deep-cherry)', color: 'var(--color-warm-cream)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, marginTop: '2px' }}>✓</div>
                  <div style={{ fontSize: '0.95rem' }}><strong>Ultra-Affordable Packs:</strong> ₹10 for 1-pack, ₹15 for 2-pack, and ₹20 for 3-pack.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--color-deep-cherry)', color: 'var(--color-warm-cream)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, marginTop: '2px' }}>✓</div>
                  <div style={{ fontSize: '0.95rem' }}><strong>Universal Snap-On:</strong> Fits seamlessly on both 10ml and 20ml stick bodies.</div>
                </div>
              </div>
              <Link to="/shop/refill">
                <Button variant="primary" size="md">
                  EXPLORE REFILL HEADS →
                </Button>
              </Link>
            </div>

            <div>
              <ProductImage
                src="/images/refill-cartridge.png"
                alt="NIX Replaceable Roller-Ball Head Cartridge"
                label="Snap-On Replaceable Roller Head"
                badge="Hygienic Care System"
                aspectRatio="1 / 1"
                objectFit="contain"
                style={{ maxHeight: '320px', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-deep-cherry)',
            color: 'var(--color-warm-cream)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'var(--color-warm-cream)', marginBottom: '1rem' }}>
            Ready to keep a NIX in your bag?
          </h2>
          <p
            style={{
              color: 'var(--color-warm-cream)',
              opacity: 0.9,
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
            }}
          >
            Never get caught unprepared again. Available in 10ml (₹79) and 20ml (₹129).
          </p>
          <Link to="/shop">
            <Button
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-deep-cherry)',
              }}
              size="lg"
            >
              GET YOUR NIX STICK NOW →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

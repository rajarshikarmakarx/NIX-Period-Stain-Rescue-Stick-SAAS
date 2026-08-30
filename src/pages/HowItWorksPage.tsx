import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ProductImage } from '../components/product/ProductImage';

export const HowItWorksPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <SectionHeading
          eyebrow="APPLICATION GUIDE"
          title="Designed for the moment before you get home."
          subtitle="Simple pre-treatment steps to prevent period stains from setting in fabric."
        />

        {/* 4-Step Detailed Editorial Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '4rem 0' }}>
          {[
            {
              step: '01',
              title: 'Blot Excess Moisture',
              desc: 'As soon as you notice a fresh stain, use a clean tissue or paper towel to gently blot any excess fluid. Do not rub vigorously across the fabric.',
              tip: 'Pro Tip: Always blot from the outer edge inward to prevent spreading.',
            },
            {
              step: '02',
              title: 'Apply NIX Pre-Treatment Stick',
              desc: 'Uncap your NIX Stick and swipe the formulation generously over the affected stain area. Cover the entire spot thoroughly.',
              tip: 'Works on cotton, denim, canvas, and common fabric blends.',
            },
            {
              step: '03',
              title: 'Gently Work It Into Fibers',
              desc: 'Use the smooth stick tip or your fingers to massage the pre-treatment into the fabric fibers for 10–15 seconds.',
              tip: 'The active pre-treatment breaks down heme proteins before they bond to fabric.',
            },
            {
              step: '04',
              title: 'Wash Normally When Home',
              desc: 'Pop the treated garment into your regular wash cycle when you get back home. NIX keeps the stain pre-treated so it washes out easily.',
              tip: 'Cold or warm water wash recommended for best results.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid var(--color-cocoa-light)',
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
                <p style={{ fontSize: '1.05rem', opacity: 0.9, marginBottom: '1.25rem' }}>{item.desc}</p>
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
                <ProductImage alt={`Step ${item.step}`} label={`Visual Guide — Step ${item.step}`} />
              </div>
            </div>
          ))}
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
          <p style={{ color: 'var(--color-warm-cream)', opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Never get caught unprepared again. Small enough to carry anywhere.
          </p>
          <Link to="/shop">
            <Button style={{ backgroundColor: 'var(--color-warm-cream)', color: 'var(--color-deep-cherry)' }} size="lg">
              GET YOUR NIX STICK NOW →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

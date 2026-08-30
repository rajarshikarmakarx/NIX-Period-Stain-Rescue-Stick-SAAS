import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductImage } from '../components/product/ProductImage';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <SectionHeading
          eyebrow="THE NIX STORY"
          title="Designed for life outside the laundry room."
        />

        {/* Editorial Story Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-cocoa-light)' }}>
            <span className="eyebrow">THE INSIGHT</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Periods don't happen on a schedule. Neither do stains.</h3>
            <p>
              Most stain-removal products on the market are designed for home use — bulky liquid bottles, laundry room sprays, or harsh bleaches. But when an unexpected period stain happens at college, in the office, or during travel, you can’t carry a laundry room in your tote bag.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-cocoa-light)' }}>
            <span className="eyebrow">THE OPPORTUNITY</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Made for the moment it happens.</h3>
            <p>
              NIX was born from a simple idea: create a pre-treatment stain stick so compact and discreet that it lives naturally in your everyday bag right next to your lip balm or keys. Treat the stain in 10 seconds, and wash your clothes normally whenever you get home.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-deep-cherry)', color: 'var(--color-warm-cream)', padding: '3rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-warm-cream)', fontSize: '2rem', marginBottom: '1rem' }}>
              “Small enough to carry. Smart enough to matter.”
            </h2>
            <p style={{ color: 'var(--color-warm-cream)', opacity: 0.9, marginBottom: '2rem', maxWidth: '550px', margin: '0 auto 2rem auto' }}>
              NIX starts with one small stick. Our long-term vision is a complete ecosystem of discreet, portable period emergency products.
            </p>
            <Link to="/shop">
              <Button style={{ backgroundColor: 'var(--color-warm-cream)', color: 'var(--color-deep-cherry)' }} size="lg">
                SHOP THE NIX STICK →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

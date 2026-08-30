import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { WaitlistForm } from '../components/content/WaitlistForm';
import { ProductImage } from '../components/product/ProductImage';
import { Sparkles, Shield, Heart, Package } from 'lucide-react';

export const EmergencyKitPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Header Hero */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <span className="badge badge-blush" style={{ marginBottom: '1rem' }}>
            FUTURE PRODUCT REVEAL
          </span>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The NIX Emergency Kit.</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Because sometimes one stain stick isn't enough. We're building the ultimate portable period emergency ecosystem.
          </p>
        </div>

        {/* Product Teaser Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          <div>
            <ProductImage alt="NIX Emergency Kit Teaser" label="Emergency Kit Conceptual Prototype" />
          </div>

          <div>
            <span className="eyebrow">WHAT'S INSIDE THE KIT</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Complete emergency care on-the-go.</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                { title: 'NIX Stain Rescue Stick', desc: '15g pre-treatment stick for immediate stain care.' },
                { title: 'Biodegradable Disposal Bags', desc: 'Discreet, opaque disposal pouches for emergencies.' },
                { title: 'Intimate Care Cleansing Wipes', desc: 'Gentle, pH-balanced individually wrapped wipes.' },
                { title: 'Emergency Backup Essentials', desc: 'Emergency period pads + compact carry pouch.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-deep-cherry)',
                      color: 'var(--color-warm-cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Waitlist Box */}
            <div
              style={{
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                border: '1px solid var(--color-cocoa-light)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Be the first to get the Kit.</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.25rem' }}>
                Join 1,200+ people on the early-access waitlist and get 20% off at launch.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

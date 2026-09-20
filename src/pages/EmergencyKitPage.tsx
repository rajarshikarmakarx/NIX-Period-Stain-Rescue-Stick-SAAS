import React, { useState } from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { WaitlistForm } from '../components/content/WaitlistForm';
import { ProductImage } from '../components/product/ProductImage';
import { Sparkles, Shield, Heart, Package, Check } from 'lucide-react';

export const EmergencyKitPage: React.FC = () => {
  const [selectedKitImage, setSelectedKitImage] = useState<number>(0);

  const kitImages = [
    {
      src: '/images/20ml-with-packaging.png',
      label: '20ml Value Stick with Packaging Box',
      badge: 'Core Hero Essential',
    },
    {
      src: '/images/10ml-without-packaging.png',
      label: '10ml Pocket Companion Stick',
      badge: 'Discreet Carry',
    },
    {
      src: '/images/20ml-without-packaging.png',
      label: '20ml Pre-Treatment Formulation Stick',
      badge: 'High Capacity',
    },
    {
      src: '/images/10ml-with-packaging.png',
      label: '10ml Starter Stick in Custom Retail Box',
      badge: 'Starter Pack',
    },
  ];

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
            Because sometimes one stain stick isn't enough. We're building the ultimate portable
            period emergency ecosystem.
          </p>
        </div>

        {/* Product Teaser Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <div style={{ minWidth: 0, width: '100%' }}>
            <ProductImage
              src={kitImages[selectedKitImage].src}
              alt="NIX Emergency Kit Visual Showcase"
              label={kitImages[selectedKitImage].label}
              badge={kitImages[selectedKitImage].badge}
              aspectRatio="3 / 4"
              objectFit="contain"
              style={{ maxHeight: '460px', margin: '0 auto' }}
            />

            {/* Thumbnail selector */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              {kitImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedKitImage(idx)}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    border:
                      selectedKitImage === idx
                        ? '2px solid var(--color-deep-cherry)'
                        : '1px solid var(--color-cocoa-light)',
                    padding: '2px',
                    backgroundColor: 'var(--color-cream-card)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    aspectRatio: '1 / 1',
                    opacity: selectedKitImage === idx ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div style={{ minWidth: 0, width: '100%' }}>
            <span className="eyebrow">WHAT'S INSIDE THE KIT</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', marginBottom: '1.5rem' }}>
              Complete emergency care on-the-go.
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              {[
                {
                  title: 'NIX Stain Rescue Sticks (10ml & 20ml)',
                  desc: 'Pocket & standard pre-treatment sticks for immediate spot rescue.',
                },
                {
                  title: 'Biodegradable Disposal Pouches',
                  desc: 'Discreet, opaque sealed disposal bags for emergencies.',
                },
                {
                  title: 'Intimate Care Cleansing Wipes',
                  desc: 'Gentle, pH-balanced individually wrapped wipes.',
                },
                {
                  title: 'Emergency Backup Essentials',
                  desc: 'Organic cotton emergency pads in a compact water-resistant pouch.',
                },
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Be the first to get the Kit.
              </h3>
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

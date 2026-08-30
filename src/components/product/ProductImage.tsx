import React from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  label?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  style,
  aspectRatio = '1 / 1',
  label,
}) => {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio,
        backgroundColor: 'var(--color-cream-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-cocoa-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-subtle)',
        ...style,
      }}
    >
      {/* Editorial aesthetic product graphic / SVG render when image is placeholder */}
      <div
        style={{
          width: '70%',
          height: '75%',
          background: 'linear-gradient(145deg, #7B2638 0%, #A83A4B 100%)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 1rem',
          color: 'var(--color-warm-cream)',
          boxShadow: '0 12px 24px rgba(123, 38, 56, 0.25)',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em' }}>NIX & CO.</div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>
            NIX
          </div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', marginTop: '0.2rem', opacity: 0.9 }}>
            PRE-TREATMENT
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'var(--color-dusty-blush)',
            borderRadius: '2px',
          }}
        />
      </div>

      {label && (
        <span
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(248, 240, 227, 0.9)',
            color: 'var(--color-soft-cocoa)',
            fontSize: '0.75rem',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

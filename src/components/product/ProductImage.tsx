import React, { useState } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  aspectRatio?: string;
  label?: string;
  badge?: string;
  objectFit?: 'cover' | 'contain';
  showZoomOnHover?: boolean;
  onClick?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  style,
  imgStyle,
  aspectRatio = '3 / 4',
  label,
  badge,
  objectFit = 'contain',
  showZoomOnHover = true,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default to primary product image if src not provided
  const imageSource = src || '/images/10ml-with-packaging.jpg';

  return (
    <div
      className={`product-image-container ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        cursor: onClick ? 'pointer' : 'default',
        boxSizing: 'border-box',
        padding: '0.75rem',
        ...style,
      }}
    >
      {!imageError ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Skeleton / Ambient backdrop during load */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--color-cream-card)',
              opacity: isLoaded ? 0 : 1,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />
          <img
            src={imageSource}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: '100%',
              objectFit,
              objectPosition: 'center',
              display: 'block',
              transition: showZoomOnHover
                ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease'
                : 'none',
              transform: isHovered && showZoomOnHover ? 'scale(1.03)' : 'scale(1)',
              opacity: isLoaded ? 1 : 0,
              ...imgStyle,
            }}
          />
        </div>
      ) : (
        /* Aesthetic Fallback Graphic if Image Fails */
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
      )}

      {/* Floating Category/Status Badge */}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            backgroundColor: 'var(--color-deep-cherry)',
            color: 'var(--color-warm-cream)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 2px 8px rgba(123, 38, 56, 0.3)',
            zIndex: 2,
          }}
        >
          {badge}
        </span>
      )}

      {/* Floating Descriptive Label */}
      {label && (
        <span
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            left: '0.85rem',
            right: '0.85rem',
            backgroundColor: 'rgba(253, 246, 237, 0.92)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            color: 'var(--color-soft-cocoa)',
            fontSize: '0.78rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            border: '1px solid rgba(224, 214, 203, 0.8)',
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(44, 24, 16, 0.06)',
            zIndex: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

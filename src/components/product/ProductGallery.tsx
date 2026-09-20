import React, { useState, useEffect } from 'react';
import { ProductImage } from './ProductImage';
import { Sparkles, Package, Eye, ZoomIn } from 'lucide-react';

interface GalleryItem {
  src: string;
  label: string;
  shortLabel: string;
  variantId: '10ml' | '20ml';
  type: 'packaging' | 'stick';
  badge: string;
}

interface ProductGalleryProps {
  images?: string[];
  productName: string;
  selectedVariantId?: string;
  onSelectVariant?: (variantId: string) => void;
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/images/10ml-with-packaging.png',
    label: '10ml Pocket Stick • Official Box Packaging',
    shortLabel: '10ml Box',
    variantId: '10ml',
    type: 'packaging',
    badge: '10ml • Boxed',
  },
  {
    src: '/images/10ml-without-packaging.png',
    label: '10ml Pocket Stick • Handbag-Ready Stick',
    shortLabel: '10ml Stick',
    variantId: '10ml',
    type: 'stick',
    badge: '10ml • Stick',
  },
  {
    src: '/images/20ml-with-packaging.png',
    label: '20ml Value Stick • Official Box Packaging',
    shortLabel: '20ml Box',
    variantId: '20ml',
    type: 'packaging',
    badge: '20ml • Boxed',
  },
  {
    src: '/images/20ml-without-packaging.png',
    label: '20ml Value Stick • Generous 10 Uses Care Stick',
    shortLabel: '20ml Stick',
    variantId: '20ml',
    type: 'stick',
    badge: '20ml • Best Value',
  },
];

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productName,
  selectedVariantId,
  onSelectVariant,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterType, setFilterType] = useState<'all' | '10ml' | '20ml' | 'packaging' | 'stick'>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync selected index when user changes variant outside gallery
  useEffect(() => {
    if (selectedVariantId) {
      const matchIdx = galleryItems.findIndex((item) => item.variantId === selectedVariantId);
      if (matchIdx !== -1 && galleryItems[selectedIndex].variantId !== selectedVariantId) {
        setSelectedIndex(matchIdx);
      }
    }
  }, [selectedVariantId]);

  const currentItem = galleryItems[selectedIndex] || galleryItems[0];

  const filteredItems = galleryItems.filter((item) => {
    if (filterType === '10ml') return item.variantId === '10ml';
    if (filterType === '20ml') return item.variantId === '20ml';
    if (filterType === 'packaging') return item.type === 'packaging';
    if (filterType === 'stick') return item.type === 'stick';
    return true;
  });

  const handleSelectThumbnail = (index: number) => {
    setSelectedIndex(index);
    const item = galleryItems[index];
    if (item && onSelectVariant && selectedVariantId !== item.variantId) {
      onSelectVariant(item.variantId);
    }
  };

  const handleTogglePackaging = () => {
    const targetType = currentItem.type === 'packaging' ? 'stick' : 'packaging';
    const matchIdx = galleryItems.findIndex(
      (item) => item.variantId === currentItem.variantId && item.type === targetType
    );
    if (matchIdx !== -1) {
      setSelectedIndex(matchIdx);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Quick Visual Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          fontSize: '0.8rem',
        }}
      >
        {[
          { id: 'all', label: 'All Photos (4)' },
          { id: '10ml', label: '10ml Pocket' },
          { id: '20ml', label: '20ml Best Value' },
          { id: 'packaging', label: 'With Box' },
          { id: 'stick', label: 'Stick Only' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              border:
                filterType === tab.id
                  ? '1px solid var(--color-deep-cherry)'
                  : '1px solid var(--color-cocoa-light)',
              backgroundColor:
                filterType === tab.id ? 'var(--color-deep-cherry)' : 'var(--color-cream-card)',
              color: filterType === tab.id ? 'var(--color-warm-cream)' : 'var(--color-soft-cocoa)',
              fontWeight: filterType === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.75rem',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main High-Res Display */}
      <div style={{ position: 'relative' }}>
        <ProductImage
          src={currentItem.src}
          alt={`${productName} — ${currentItem.label}`}
          label={currentItem.label}
          badge={currentItem.badge}
          aspectRatio="3 / 4"
          objectFit="contain"
          priority={true}
          style={{
            maxHeight: '480px',
            cursor: 'zoom-in',
          }}
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Floating Quick Action Overlay Buttons */}
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 3,
          }}
        >
          {/* Flip Stick / Box Packaging */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePackaging();
            }}
            title="Toggle between Stick and Packaging Box"
            style={{
              backgroundColor: 'rgba(253, 246, 237, 0.9)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--color-deep-cherry)',
              border: '1px solid var(--color-cocoa-light)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <Package size={13} />
            {currentItem.type === 'packaging' ? 'View Stick' : 'View Box'}
          </button>

          {/* Zoom Lightbox Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            title="Expand Photo"
            style={{
              backgroundColor: 'rgba(253, 246, 237, 0.9)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--color-soft-cocoa)',
              border: '1px solid var(--color-cocoa-light)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <ZoomIn size={15} />
          </button>
        </div>
      </div>

      {/* Thumbnails Gallery */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.65rem',
        }}
      >
        {galleryItems.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          const isDimmed = filterType !== 'all' && !filteredItems.some((fi) => fi.src === item.src);

          return (
            <button
              key={idx}
              onClick={() => handleSelectThumbnail(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                border: isSelected
                  ? '2px solid var(--color-deep-cherry)'
                  : '1px solid var(--color-cocoa-light)',
                backgroundColor: 'var(--color-cream-card)',
                overflow: 'hidden',
                padding: '0.25rem',
                cursor: 'pointer',
                opacity: isDimmed ? 0.35 : isSelected ? 1 : 0.75,
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(123, 38, 56, 0.15)' : 'none',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={item.src}
                  alt={item.shortLabel}
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
                  marginTop: '0.25rem',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {item.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Lightbox / Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 15, 10, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              padding: '1rem',
            }}
          >
            <img
              src={currentItem.src}
              alt={currentItem.label}
              style={{
                maxHeight: '70vh',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: 'var(--radius-lg)',
              }}
            />
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-deep-cherry)', fontSize: '1rem' }}>
                  {currentItem.label}
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  NIX Period Stain Rescue Stick Prototype
                </div>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                style={{
                  backgroundColor: 'var(--color-deep-cherry)',
                  color: 'var(--color-warm-cream)',
                  border: 'none',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

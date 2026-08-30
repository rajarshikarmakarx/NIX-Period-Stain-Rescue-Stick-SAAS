import React, { useState } from 'react';
import { ProductImage } from './ProductImage';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const labels = [
    'NIX Rescue Stick Hero',
    'Cap Close-up',
    'Product In-Hand',
    'Everyday Bag Carry',
    'Unboxing Packaging',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Main Large Display */}
      <ProductImage alt={`${productName} view ${selectedIndex + 1}`} label={labels[selectedIndex]} />

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {labels.map((lbl, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-md)',
              border: selectedIndex === idx ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
              overflow: 'hidden',
              flexShrink: 0,
              padding: 0,
              cursor: 'pointer',
              opacity: selectedIndex === idx ? 1 : 0.6,
              transition: 'all 0.2s ease',
            }}
          >
            <ProductImage alt={lbl} aspectRatio="1 / 1" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

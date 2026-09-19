import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Check } from 'lucide-react';

export const ProductCard: React.FC = () => {
  const { product, addToCart } = useApp();
  const [selectedVariantId, setSelectedVariantId] = useState<string>('10ml');
  const [viewPackaging, setViewPackaging] = useState<boolean>(false);

  const selectedVariant =
    product.variants?.find((v) => v.id === selectedVariantId) ||
    product.variants?.[0] || {
      id: '10ml',
      name: '10ml (5 uses)',
      price: 79,
      original_price: 99,
    };

  const imageSrc =
    selectedVariantId === '20ml'
      ? viewPackaging
        ? '/images/20ml-with-packaging.jpg'
        : '/images/20ml-without-packaging.jpg'
      : viewPackaging
      ? '/images/10ml-with-packaging.jpg'
      : '/images/10ml-without-packaging.jpg';

  const badgeText = selectedVariantId === '20ml' ? '20ml • Best Value' : '10ml • Starter';

  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1px solid var(--color-cocoa-light)',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        <ProductImage
          src={imageSrc}
          alt={`${product.name} - ${selectedVariant.name}`}
          badge={badgeText}
          aspectRatio="4 / 3"
          objectFit="contain"
        />

        {/* Packaging / Stick Toggle Badge */}
        <button
          onClick={() => setViewPackaging(!viewPackaging)}
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            backgroundColor: 'rgba(253, 246, 237, 0.9)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            color: 'var(--color-deep-cherry)',
            fontSize: '0.72rem',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-cocoa-light)',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          {viewPackaging ? 'Show Stick' : 'Show Box'}
        </button>
      </div>

      <div>
        <span className="eyebrow">PRE-TREATMENT CARE</span>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>{product.name}</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>
          {product.short_description}
        </p>

        {/* Variant selector pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {product.variants?.map((v) => {
            const isSelected = v.id === selectedVariantId;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.5rem 0.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected
                    ? '2px solid var(--color-deep-cherry)'
                    : '1px solid var(--color-cocoa-light)',
                  backgroundColor: isSelected ? 'var(--color-blush-soft)' : 'var(--color-warm-cream)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-deep-cherry)' }}>
                  {v.name}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {product.currency}
                  {v.price}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
            {product.currency}
            {selectedVariant.price}
          </span>
          {selectedVariant.original_price && (
            <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', opacity: 0.6 }}>
              {product.currency}
              {selectedVariant.original_price}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() =>
            addToCart(
              1,
              selectedVariant.id,
              selectedVariant.name,
              selectedVariant.price
            )
          }
        >
          ADD TO BAG
        </Button>
        <Link to="/shop" style={{ width: '100%' }}>
          <Button variant="secondary" size="md" fullWidth>
            VIEW DETAILS
          </Button>
        </Link>
      </div>
    </div>
  );
};

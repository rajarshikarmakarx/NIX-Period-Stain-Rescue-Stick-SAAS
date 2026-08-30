import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const ProductCard: React.FC = () => {
  const { product, addToCart } = useApp();

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
      <ProductImage alt={product.name} />

      <div>
        <span className="eyebrow">PRE-TREATMENT CARE</span>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>{product.name}</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>{product.short_description}</p>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
          {product.currency}{product.price}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <Button variant="primary" size="md" fullWidth onClick={() => addToCart(1)}>
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

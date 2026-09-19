import React from 'react';
import { Trash2 } from 'lucide-react';
import { ProductImage } from '../product/ProductImage';
import { QuantitySelector } from '../product/QuantitySelector';
import { useApp } from '../../context/AppContext';
import type { CartItem as CartItemType } from '../../api/types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, updateQuantity, removeFromCart } = useApp();
  const itemPrice = item.price ?? product.price ?? 79;
  const lineTotal = item.quantity * itemPrice;

  const imageSrc =
    item.variant_id === '20ml'
      ? '/images/20ml-without-packaging.jpg'
      : '/images/10ml-without-packaging.jpg';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: '1.25rem',
        alignItems: 'center',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--color-cocoa-light)',
      }}
    >
      <ProductImage
        src={imageSrc}
        alt={item.variant_name ? `${product.name} (${item.variant_name})` : product.name}
        aspectRatio="1 / 1"
        style={{ borderRadius: 'var(--radius-md)', padding: '4px' }}
        showZoomOnHover={false}
      />

      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-soft-cocoa)', marginBottom: '0.2rem' }}>
          {product.name}
        </h4>
        {item.variant_name && (
          <div style={{ marginBottom: '0.35rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: 'var(--color-blush-soft)',
                color: 'var(--color-deep-cherry)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {item.variant_name}
            </span>
          </div>
        )}
        <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>
          {product.currency}{itemPrice} each
        </p>

        <QuantitySelector
          quantity={item.quantity}
          onChange={(newQty) => updateQuantity(item.product_id, newQty)}
        />
      </div>

      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
          {product.currency}{lineTotal}
        </span>
        <button
          onClick={() => removeFromCart(item.product_id)}
          style={{
            color: 'var(--color-cocoa-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          title="Remove from bag"
        >
          <Trash2 size={15} /> Remove
        </button>
      </div>
    </div>
  );
};

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
  const lineTotal = item.quantity * product.price;

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
      <ProductImage alt={product.name} aspectRatio="1 / 1" style={{ borderRadius: 'var(--radius-md)' }} />

      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-soft-cocoa)', marginBottom: '0.2rem' }}>
          {product.name}
        </h4>
        <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>
          {product.currency}{product.price} each
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
          }}
          title="Remove from bag"
        >
          <Trash2 size={15} /> Remove
        </button>
      </div>
    </div>
  );
};

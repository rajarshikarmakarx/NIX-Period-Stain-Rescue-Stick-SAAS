import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
}) => {
  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--color-cocoa-light)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-warm-cream)',
        padding: '0.25rem',
      }}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: quantity <= min ? 'var(--color-cocoa-light)' : 'var(--color-soft-cocoa)',
          cursor: quantity <= min ? 'not-allowed' : 'pointer',
        }}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span
        style={{
          width: '40px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'var(--color-soft-cocoa)',
        }}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: quantity >= max ? 'var(--color-cocoa-light)' : 'var(--color-soft-cocoa)',
          cursor: quantity >= max ? 'not-allowed' : 'pointer',
        }}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

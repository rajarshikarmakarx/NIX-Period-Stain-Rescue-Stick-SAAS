import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import type { ProductVariant } from '../../api/types';

interface AddToCartButtonProps {
  quantity?: number;
  variant?: ProductVariant;
  fullWidth?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ quantity = 1, variant, fullWidth = false }) => {
  const { addToCart } = useApp();

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth={fullWidth}
      onClick={() => addToCart(quantity, variant)}
    >
      <ShoppingBag size={20} />
      <span>ADD TO BAG</span>
    </Button>
  );
};

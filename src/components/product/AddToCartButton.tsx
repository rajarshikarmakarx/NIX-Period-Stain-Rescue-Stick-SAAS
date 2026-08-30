import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

interface AddToCartButtonProps {
  quantity?: number;
  fullWidth?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ quantity = 1, fullWidth = false }) => {
  const { addToCart } = useApp();

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth={fullWidth}
      onClick={() => addToCart(quantity)}
    >
      <ShoppingBag size={20} />
      <span>ADD TO BAG</span>
    </Button>
  );
};

import type { Product } from '../api/types';

/**
 * Centralized product configuration data structure (PRD §30).
 * Serves as fallback and local single source of truth.
 */
export const defaultProductData: Product = {
  id: 'nix-rescue-stick-01',
  name: 'NIX Period Stain Rescue Stick',
  short_description: 'Portable pre-treatment care for fresh menstrual stains.',
  long_description:
    'A compact stain-treatment stick made to live in your everyday bag. NIX is designed for the moment a stain happens — not for the laundry room.',
  price: 349,
  currency: '₹',
  images: [
    '/images/product-hero.png',
    '/images/product-closeup.png',
    '/images/product-in-hand.png',
    '/images/product-in-bag.png',
    '/images/product-packaging.png',
  ],
  features: [
    'Portable & discreet',
    'Fits in any handbag or pocket',
    'Pre-treatment format',
    'Targeted at fresh menstrual stains',
    'Treat now, wash when home',
  ],
  details: [
    {
      title: 'What is NIX?',
      content:
        'NIX is a portable pre-treatment stick designed specifically for fresh menstrual stains. Small enough to keep in your everyday bag.',
    },
    {
      title: 'How does it work?',
      content:
        'Blot excess moisture, apply NIX directly to the stain, gently work it into the fabric, and wash normally when you get home.',
    },
    {
      title: 'When should I use it?',
      content:
        'Use NIX as soon as you notice a fresh period stain while outside the home. Pre-treating immediately prevents stains from setting.',
    },
    {
      title: 'How do I carry it?',
      content:
        'NIX is designed to fit seamlessly inside a college bag, handbag, gym pouch, or travel pocket. Keep it close like your favourite lip balm.',
    },
    {
      title: 'Product details',
      content: 'Compact pre-treatment stick format. Net wt. 15g.',
    },
    {
      title: 'Shipping & returns',
      content: 'Free standard shipping across India on orders over ₹499. Easy 7-day return policy.',
    },
  ],
  bundles: [
    {
      id: 'single',
      name: 'Single Stick',
      description: '1 NIX Rescue Stick',
      price: 349,
      available: true,
    },
    {
      id: 'duo',
      name: 'Duo Pack',
      description: '2 NIX Sticks (Bag + Desk)',
      price: null,
      available: false,
    },
    {
      id: 'campus-pack',
      name: 'Campus Pack',
      description: '3 Sticks for group backup',
      price: null,
      available: false,
    },
    {
      id: 'refill',
      name: 'Monthly Subscription',
      description: 'Auto-replenishment option',
      price: null,
      available: false,
    },
  ],
};

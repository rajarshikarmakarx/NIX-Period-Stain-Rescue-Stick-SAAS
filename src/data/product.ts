import type { Product, ProductVariant } from '../api/types';

export interface RefillOption {
  id: string;
  name: string;
  count: number;
  price: number;
  original_price: number;
  discount: string;
  per_unit: string;
  description: string;
  badge?: string;
}

export const refillVariants: RefillOption[] = [
  {
    id: 'refill-1pk',
    name: 'Single Replacement Head (1-Pack)',
    count: 1,
    price: 10,
    original_price: 15,
    discount: 'Save ₹5',
    per_unit: '₹10 / unit',
    description: '1x Replaceable Roller-Ball Cartridge (5 fresh emergency uses)',
  },
  {
    id: 'refill-2pk',
    name: 'Care Duo Pack (2-Pack)',
    count: 2,
    price: 15,
    original_price: 20,
    discount: 'Save 25%',
    per_unit: '₹7.50 / unit',
    description: '2x Replaceable Roller-Ball Cartridges (10 fresh emergency uses)',
    badge: 'Most Popular',
  },
  {
    id: 'refill-3pk',
    name: 'Triple Value Pack (3-Pack)',
    count: 3,
    price: 20,
    original_price: 30,
    discount: 'Save 33%',
    per_unit: '₹6.67 / unit',
    description: '3x Replaceable Roller-Ball Cartridges (15 fresh emergency uses)',
    badge: 'Best Value',
  },
];

export const defaultVariants: ProductVariant[] = [
  {
    id: '10ml',
    name: '10ml (5 uses)',
    size: '10ml',
    uses: '5 uses',
    price: 79,
    original_price: 99,
    in_stock: true,
    image: '/images/10ml-without-packaging.png',
    packaging_image: '/images/10ml-with-packaging.png',
  },
  {
    id: '20ml',
    name: '20ml (10 uses)',
    size: '20ml',
    uses: '10 uses',
    price: 129,
    original_price: 159,
    in_stock: true,
    image: '/images/20ml-without-packaging.png',
    packaging_image: '/images/20ml-with-packaging.png',
  },
];

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
  price: 79,
  currency: '₹',
  variants: defaultVariants,
  images: [
    '/images/10ml-with-packaging.png',
    '/images/10ml-without-packaging.png',
    '/images/20ml-with-packaging.png',
    '/images/20ml-without-packaging.png',
    '/images/refill-cartridge.png',
  ],
  features: [
    'Portable & discreet',
    'Fits in any handbag or pocket',
    'Pre-treatment format',
    'Targeted at fresh menstrual stains',
    'Treat now, wash when home',
    'Replaceable Roll-On Cartridges for zero cross-contamination',
    'Available in 10ml (5 uses) & 20ml (10 uses)',
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
        'Blot excess moisture, apply NIX directly to the stain with the smooth roller-ball, gently work it into the fabric, and wash normally when you get home.',
    },
    {
      title: 'Hygienic Replaceable Roll-On System',
      content:
        'The roller-ball is the only part that touches stained fabric. After ~5 uses, snap on a fresh replacement cartridge (priced from ₹10) rather than repeatedly putting a used applicator back against fresh garments.',
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
      title: 'Product details & sizes',
      content: 'Compact pre-treatment stick format. Available in 10ml (5 uses) for ₹79 and 20ml (10 uses) for ₹129. Replacement roll-on cartridges from ₹10.',
    },
    {
      title: 'Shipping & returns',
      content: 'Free standard shipping across India on orders over ₹499. Easy 7-day return policy.',
    },
  ],
  bundles: [
    {
      id: 'single-10ml',
      name: 'Starter Pocket Stick (10ml)',
      description: '1x 10ml NIX Stick (5 emergency uses)',
      price: 79,
      available: true,
    },
    {
      id: 'single-20ml',
      name: 'Standard Care Stick (20ml)',
      description: '1x 20ml NIX Stick (10 emergency uses)',
      price: 129,
      available: true,
    },
    {
      id: 'duo',
      name: 'Duo Pack (2x 20ml)',
      description: '2 NIX 20ml Sticks (Bag + Desk)',
      price: 229,
      available: true,
    },
    {
      id: 'refill-3pk-bundle',
      name: 'Replaceable Roll-On Triple Pack (3x Refills)',
      description: '3x Snap-On Roller Heads for zero cross-contamination',
      price: 20,
      available: true,
    },
    {
      id: 'campus-pack',
      name: 'Campus Pack (3x 20ml)',
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

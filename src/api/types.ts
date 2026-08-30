export interface ProductDetail {
  title: string;
  content: string;
}

export interface BundleOption {
  id: string;
  name: string;
  description: string;
  price?: number | null;
  available: bool;
}

export interface Product {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  currency: string;
  images: string[];
  features: string[];
  details: ProductDetail[];
  bundles: BundleOption[];
}

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface AddressInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderCreate {
  items: CartItem[];
  address: AddressInfo;
}

export interface OrderTimelineStep {
  label: string;
  completed: boolean;
  timestamp?: string | null;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: AddressInfo;
  total: number;
  currency: string;
  status: string;
  delivery_estimate: string;
  timeline: OrderTimelineStep[];
  created_at: string;
}

export interface RewardHistoryEntry {
  action: string;
  points: number;
  timestamp: string;
}

export interface RewardsAccount {
  points: number;
  tier: string;
  history: RewardHistoryEntry[];
  referral_code: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  already_registered?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  read_time: string;
  featured?: boolean;
}

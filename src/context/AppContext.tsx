import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Order, RewardsAccount, AddressInfo, Product, ProductVariant } from '../api/types';
import { api } from '../api/client';
import { defaultProductData, refillVariants, type RefillOption } from '../data/product';
import { trackEvent } from '../hooks/useAnalytics';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

interface ToastState {
  message: string;
  visible: boolean;
}

interface AppContextType {
  product: Product;
  refillOptions: RefillOption[];
  cart: CartItem[];
  addToCart: (quantity?: number, variant?: ProductVariant | RefillOption | string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartCount: number;
  cartSubtotal: number;
  orders: Order[];
  rewards: RewardsAccount;
  addOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => Promise<boolean>;
  redeemReward: (rewardId: string) => Promise<{ success: boolean; message: string }>;
  waitlistEmail: string | null;
  submitWaitlist: (email: string) => Promise<{ success: boolean; message: string; already_registered?: boolean }>;
  resetDemoState: () => Promise<void>;
  toast: ToastState;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [product, setProduct] = useState<Product>(defaultProductData);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nix_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nix_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [rewards, setRewards] = useState<RewardsAccount>(() => {
    const saved = localStorage.getItem('nix_rewards');
    return saved
      ? JSON.parse(saved)
      : {
          points: 120,
          tier: 'Member',
          history: [
            { action: 'Welcome Bonus', points: 50, timestamp: 'Aug 1, 2026' },
            { action: 'Profile Completed', points: 25, timestamp: 'Aug 5, 2026' },
            { action: 'Read NIX Note', points: 45, timestamp: 'Aug 15, 2026' },
          ],
          referral_code: 'NIX-CARE4U',
        };
  });
  const [waitlistEmail, setWaitlistEmail] = useState<string | null>(() => {
    return localStorage.getItem('nix_waitlist_email');
  });

  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('nix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nix_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nix_rewards', JSON.stringify(rewards));
  }, [rewards]);

  // Sync orders with Supabase database whenever user auth changes
  useEffect(() => {
    if (!user && !profile) return;

    const syncUserOrders = async () => {
      try {
        const filters: string[] = [];
        if (user?.id) filters.push(`user_id.eq.${user.id}`);
        if (user?.email) filters.push(`user_email.eq.${user.email}`);
        if (profile?.email && profile.email !== user?.email) {
          filters.push(`user_email.eq.${profile.email}`);
        }

        if (filters.length === 0) return;

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .or(filters.join(','))
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setOrders((prev) => {
            const map = new Map<string, Order>();
            data.forEach((ord: any) => map.set(ord.id.toUpperCase(), ord as Order));
            prev.forEach((ord) => {
              if (!map.has(ord.id.toUpperCase())) {
                map.set(ord.id.toUpperCase(), ord);
              }
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            localStorage.setItem('nix_orders', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (err) {
        console.warn('Could not sync orders from Supabase:', err);
      }
    };

    syncUserOrders();
  }, [user, profile]);

  // Fetch product & rewards from backend if online
  useEffect(() => {
    api
      .getProduct()
      .then(setProduct)
      .catch(() => {});

    api
      .getRewards()
      .then((data) => {
        setRewards(data);
      })
      .catch(() => {});
  }, []);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const addToCart = (quantity = 1, variant?: ProductVariant | RefillOption | string) => {
    let cartItemId: string;
    let variantId: string;
    let variantName: string;
    let itemPrice: number;
    let productName: string;
    let itemImage: string;

    // Check if variant is a RefillOption or string starting with 'refill'
    const isRefill =
      (typeof variant === 'object' && variant !== null && ('count' in variant || variant.id.startsWith('refill'))) ||
      (typeof variant === 'string' && (variant.startsWith('refill') || refillVariants.some((r) => r.id === variant)));

    if (isRefill) {
      let refill: RefillOption | undefined;
      if (typeof variant === 'object' && variant !== null) {
        refill = variant as RefillOption;
      } else if (typeof variant === 'string') {
        refill = refillVariants.find((r) => r.id === variant) || refillVariants[0];
      } else {
        refill = refillVariants[0];
      }

      cartItemId = refill.id;
      variantId = refill.id;
      variantName = refill.name;
      itemPrice = refill.price;
      productName = 'NIX Replaceable Roller-Ball Cartridge';
      itemImage = refill.image || (refill.count === 3 ? '/images/roller-head-3.png' : refill.count === 2 ? '/images/roller-head-2.png' : '/images/roller-head-1.png');
    } else {
      // Resolve standard stick variant
      let selectedVariant: ProductVariant | undefined;
      if (typeof variant === 'object' && variant !== null) {
        selectedVariant = variant as ProductVariant;
      } else if (typeof variant === 'string') {
        selectedVariant = product.variants?.find((v) => v.id === variant);
      } else {
        selectedVariant = product.variants?.[0];
      }

      variantId = selectedVariant?.id || '10ml';
      variantName = selectedVariant?.name || '10ml (5 uses)';
      itemPrice = selectedVariant?.price ?? product.price ?? 79;
      productName = product.name;
      cartItemId = `${product.id}-${variantId}`;
      itemImage = selectedVariant?.image || selectedVariant?.packaging_image || '/images/10ml-without-packaging.png';
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product_id === cartItemId || (item.variant_id === variantId)
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: itemPrice,
                variant_name: variantName,
                product_name: productName,
                image: itemImage,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: cartItemId,
          product_name: productName,
          variant_id: variantId,
          variant_name: variantName,
          price: itemPrice,
          quantity,
          image: itemImage,
        },
      ];
    });

    showToast(`${variantName} added to your bag.`);
    trackEvent('add_to_cart', { quantity, product_id: cartItemId, variant: variantName, price: itemPrice });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
    trackEvent('remove_from_cart', { product_id: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) => prev.map((item) => (item.product_id === productId ? { ...item, quantity } : item)));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.quantity * (item.price ?? product.price), 0);

  const addOrder = async (order: Order) => {
    const enrichedOrder: Order = {
      ...order,
      user_id: user?.id || order.user_id,
      user_email: user?.email || profile?.email || order.address?.email || order.user_email,
    };

    setOrders((prev) => {
      const updated = [enrichedOrder, ...prev.filter((o) => o.id.toUpperCase() !== enrichedOrder.id.toUpperCase())];
      localStorage.setItem('nix_orders', JSON.stringify(updated));
      return updated;
    });

    // Persist to Supabase orders table
    try {
      await supabase.from('orders').upsert({
        id: enrichedOrder.id,
        user_id: enrichedOrder.user_id || null,
        user_email: enrichedOrder.user_email || null,
        items: enrichedOrder.items,
        address: enrichedOrder.address,
        total: enrichedOrder.total,
        currency: enrichedOrder.currency,
        status: enrichedOrder.status,
        delivery_estimate: enrichedOrder.delivery_estimate,
        timeline: enrichedOrder.timeline,
        created_at: enrichedOrder.created_at,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Could not persist order to Supabase:', err);
    }

    // Award 100 reward points
    setRewards((prev) => ({
      ...prev,
      points: prev.points + 100,
      history: [
        {
          action: `Purchased Order #${order.id}`,
          points: 100,
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        },
        ...prev.history,
      ],
    }));
    clearCart();
    trackEvent('purchase', { order_id: order.id, total: order.total });
  };

  const cancelOrder = async (orderId: string): Promise<boolean> => {
    const timestampStr =
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) +
      ', ' +
      new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    try {
      await api.cancelOrder(orderId);
    } catch {}

    // Update cancellation in Supabase
    try {
      const { data: existing } = await supabase
        .from('orders')
        .select('timeline')
        .ilike('id', orderId)
        .maybeSingle();

      const updatedTimeline = existing?.timeline
        ? [...existing.timeline, { label: 'Order Cancelled', completed: true, timestamp: timestampStr }]
        : undefined;

      await supabase
        .from('orders')
        .update({
          status: 'Cancelled',
          ...(updatedTimeline ? { timeline: updatedTimeline } : {}),
          updated_at: new Date().toISOString(),
        })
        .ilike('id', orderId);
    } catch (err) {
      console.warn('Could not update order cancellation in Supabase:', err);
    }

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id.toUpperCase() === orderId.toUpperCase()) {
          return {
            ...ord,
            status: 'Cancelled',
            timeline: [
              ...ord.timeline,
              { label: 'Order Cancelled', completed: true, timestamp: timestampStr },
            ],
          };
        }
        return ord;
      })
    );

    showToast(`Order #${orderId} has been cancelled.`);
    trackEvent('cancel_order', { order_id: orderId });
    return true;
  };

  const redeemReward = async (rewardId: string): Promise<{ success: boolean; message: string }> => {
    const pointCosts: Record<string, { points: number; label: string; defaultMsg: string }> = {
      'discount-250': { points: 250, label: 'Redeemed ₹50 Discount', defaultMsg: '₹50 Discount Code: NIX50OFF applied!' },
      'free-nix-500': { points: 500, label: 'Redeemed Free NIX Stick', defaultMsg: 'Free NIX Stick added to your account!' },
      'kit-benefit-750': { points: 750, label: 'Redeemed Emergency Kit VIP Pass', defaultMsg: 'VIP Early Access Pass claimed for Emergency Kit launch!' },
    };

    const target = pointCosts[rewardId] || { points: 250, label: 'Redeemed Reward', defaultMsg: 'Reward claimed!' };

    if (rewards.points < target.points) {
      const err = `Insufficient points! You need ${target.points} points.`;
      showToast(err);
      return { success: false, message: err };
    }

    let successMessage = target.defaultMsg;
    try {
      const res = await api.redeemReward(rewardId);
      if (res.message) successMessage = res.message;
    } catch {}

    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setRewards((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - target.points),
      history: [
        { action: target.label, points: -target.points, timestamp: now },
        ...prev.history,
      ],
    }));

    showToast(successMessage);
    trackEvent('redeem_reward', { reward_id: rewardId, points_spent: target.points });
    return { success: true, message: successMessage };
  };

  const submitWaitlist = async (email: string) => {
    try {
      const res = await api.joinWaitlist(email);
      localStorage.setItem('nix_waitlist_email', email);
      setWaitlistEmail(email);
      trackEvent('join_waitlist', { email });
      return res;
    } catch {
      localStorage.setItem('nix_waitlist_email', email);
      setWaitlistEmail(email);
      trackEvent('join_waitlist', { email });
      return {
        success: true,
        message: "You're on the list! We'll notify you when the Emergency Kit launches.",
      };
    }
  };

  const resetDemoState = async () => {
    try {
      await api.resetDemo();
    } catch {}
    localStorage.removeItem('nix_cart');
    localStorage.removeItem('nix_orders');
    localStorage.removeItem('nix_rewards');
    localStorage.removeItem('nix_waitlist_email');
    localStorage.removeItem('nix_demo_user_profile');
    setCart([]);
    setOrders([]);
    setRewards({
      points: 0,
      tier: 'Starter',
      history: [],
      referral_code: 'NIX-CARE4U',
    });
    setWaitlistEmail(null);
    showToast('Demo state successfully reset.');
  };

  return (
    <AppContext.Provider
      value={{
        product,
        refillOptions: refillVariants,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartCount,
        cartSubtotal,
        orders,
        rewards,
        addOrder,
        cancelOrder,
        redeemReward,
        waitlistEmail,
        submitWaitlist,
        resetDemoState,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

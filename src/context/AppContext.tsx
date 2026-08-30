import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Order, RewardsAccount, AddressInfo, Product } from '../api/types';
import { api } from '../api/client';
import { defaultProductData } from '../data/product';
import { trackEvent } from '../hooks/useAnalytics';

interface ToastState {
  message: string;
  visible: boolean;
}

interface AppContextType {
  product: Product;
  cart: CartItem[];
  addToCart: (quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartCount: number;
  cartSubtotal: number;
  orders: Order[];
  rewards: RewardsAccount;
  addOrder: (order: Order) => void;
  waitlistEmail: string | null;
  submitWaitlist: (email: string) => Promise<{ success: boolean; message: string; already_registered?: boolean }>;
  resetDemoState: () => Promise<void>;
  toast: ToastState;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product>(defaultProductData);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nix_cart');
    return saved ? JSON.parse(saved) : [{ product_id: 'nix-rescue-stick-01', quantity: 1 }];
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

  // Fetch product & rewards from backend if online
  useEffect(() => {
    api
      .getProduct()
      .then(setProduct)
      .catch(() => {
        // Fallback to local default data
      });

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

  const addToCart = (quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product_id: product.id, quantity }];
    });
    showToast('NIX added to your bag.');
    trackEvent('add_to_cart', { quantity, product_id: product.id });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
    trackEvent('remove_from_cart', { product_id: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((item) => (item.product_id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.quantity * product.price, 0);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
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

  const submitWaitlist = async (email: string) => {
    try {
      const res = await api.joinWaitlist(email);
      localStorage.setItem('nix_waitlist_email', email);
      setWaitlistEmail(email);
      trackEvent('join_waitlist', { email });
      return res;
    } catch {
      // Local fallback
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
    setCart([{ product_id: 'nix-rescue-stick-01', quantity: 1 }]);
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

import axios from 'axios';
import type { Product, Order, OrderCreate, RewardsAccount, WaitlistResponse, Article } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  getProduct: async (): Promise<Product> => {
    const res = await apiClient.get<Product>('/product');
    return res.data;
  },

  createOrder: async (data: OrderCreate): Promise<Order> => {
    const res = await apiClient.post<Order>('/orders', data);
    return res.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const res = await apiClient.get<Order[]>('/orders');
    return res.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const res = await apiClient.get<Order>(`/orders/${id}`);
    return res.data;
  },

  getRewards: async (): Promise<RewardsAccount> => {
    const res = await apiClient.get<RewardsAccount>('/rewards');
    return res.data;
  },

  redeemReward: async (rewardId: string) => {
    const res = await apiClient.post('/rewards/redeem', { reward_id: rewardId });
    return res.data;
  },

  joinWaitlist: async (email: string): Promise<WaitlistResponse> => {
    const res = await apiClient.post<WaitlistResponse>('/waitlist', { email });
    return res.data;
  },

  getNotes: async (): Promise<Article[]> => {
    const res = await apiClient.get<Article[]>('/notes');
    return res.data;
  },

  resetDemo: async () => {
    const res = await apiClient.post('/demo/reset');
    return res.data;
  },
};

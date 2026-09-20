import axios from 'axios';
import type { Product, Order, OrderCreate, RewardsAccount, WaitlistResponse, Article, DemoResetResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Product endpoints
  getProduct: async (): Promise<Product> => {
    const response = await apiClient.get<Product>('/product');
    return response.data;
  },

  // Orders endpoints
  createOrder: async (payload: OrderCreate): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', payload);
    return response.data;
  },
  getOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders');
    return response.data;
  },
  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },
  cancelOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/orders/${id}/cancel`);
    return response.data;
  },

  // Rewards endpoints
  getRewards: async (): Promise<RewardsAccount> => {
    const response = await apiClient.get<RewardsAccount>('/rewards');
    return response.data;
  },
  redeemReward: async (rewardId: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/rewards/redeem/${rewardId}`);
    return response.data;
  },

  // Waitlist endpoint
  joinWaitlist: async (email: string): Promise<WaitlistResponse> => {
    const response = await apiClient.post<WaitlistResponse>('/waitlist', { email });
    return response.data;
  },

  // Notes endpoints
  getNotes: async (): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>('/notes');
    return response.data;
  },

  // Demo reset endpoint
  resetDemo: async (): Promise<DemoResetResponse> => {
    const response = await apiClient.post<DemoResetResponse>('/demo/reset');
    return response.data;
  },
};

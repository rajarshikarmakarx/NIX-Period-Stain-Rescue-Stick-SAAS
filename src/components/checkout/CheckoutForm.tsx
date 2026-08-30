import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { api } from '../../api/client';
import type { AddressInfo } from '../../api/types';

export const CheckoutForm: React.FC = () => {
  const { cart, addOrder, product, showToast } = useApp();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<AddressInfo>({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Sunset Heights, North Campus',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110007',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);
    try {
      const order = await api.createOrder({ items: cart, address: form });
      addOrder(order);
      showToast('Demo order placed successfully!');
      navigate('/order-confirmation', { state: { order } });
    } catch {
      // Local fallback order creation
      const localOrder = {
        id: `NIX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        items: cart,
        address: form,
        total: cart.reduce((acc, item) => acc + item.quantity * product.price, 0),
        currency: product.currency,
        status: 'Confirmed',
        delivery_estimate: '3 Days',
        timeline: [
          { label: 'Order Confirmed', completed: true, timestamp: 'Just now' },
          { label: 'Packed & Prepared', completed: true, timestamp: 'In progress' },
          { label: 'Shipped', completed: false },
          { label: 'Out for Delivery', completed: false },
          { label: 'Delivered', completed: false },
        ],
        created_at: new Date().toISOString(),
      };
      addOrder(localOrder);
      showToast('Demo order placed successfully!');
      navigate('/order-confirmation', { state: { order: localOrder } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Delivery Address</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Street Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>PIN Code</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-blush-soft)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-blush-border)' }}>
        <div style={{ fontWeight: 600, color: 'var(--color-deep-cherry)', marginBottom: '0.25rem' }}>
          ⚡ Pitch Demo Mode Active
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
          Payment processing is simulated for this competition prototype. Clicking below will instantly record a demo order.
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
        {submitting ? 'PROCESSING DEMO ORDER...' : 'PLACE DEMO ORDER'}
      </Button>
    </form>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { AuthModal } from '../auth/AuthModal';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import type { AddressInfo } from '../../api/types';
import { UserCheck, Lock, AlertCircle } from 'lucide-react';

export const CheckoutForm: React.FC = () => {
  const { cart, addOrder, product, showToast } = useApp();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [form, setForm] = useState<AddressInfo>({
    name: profile?.full_name || '',
    email: profile?.email || user?.email || '',
    phone: profile?.phone_number || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (profile || user) {
      setForm((prev) => ({
        ...prev,
        name: profile?.full_name || prev.name,
        email: profile?.email || user?.email || prev.email,
        phone: profile?.phone_number || prev.phone,
      }));
    }
  }, [profile, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user && !profile) {
      showToast('Please log in to your NIX account before placing an order.');
      setAuthModalOpen(true);
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty.');
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      showToast('Please fill out all address and contact fields.');
      return;
    }

    setSubmitting(true);
    const user_id = user?.id || profile?.id;
    const user_email = profile?.email || user?.email || form.email;

    try {
      const order = await api.createOrder({ items: cart, address: form, user_id, user_email });
      addOrder(order);
      showToast('Order placed successfully!');
      navigate('/order-confirmation', { state: { order } });
    } catch {
      // Local fallback order creation tied directly to user account
      const localOrder = {
        id: `NIX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        user_id,
        user_email,
        items: cart,
        address: form,
        total: cart.reduce((acc, item) => acc + item.quantity * (item.price ?? product.price ?? 79), 0),
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
      showToast('Order placed successfully!');
      navigate('/order-confirmation', { state: { order: localOrder } });
    } finally {
      setSubmitting(false);
    }
  };

  const isUserAuthenticated = Boolean(user || profile);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Account status header */}
      {isUserAuthenticated ? (
        <div
          style={{
            backgroundColor: 'var(--color-blush-soft)',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-blush-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem' }}>
            <UserCheck size={18} color="var(--color-deep-cherry)" />
            <span>
              Signed in as <strong>{profile?.full_name || 'Customer'}</strong> ({profile?.email || user?.email})
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#FDF2F2',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #F8B4B4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#9B1C1C' }}>
            <AlertCircle size={18} />
            <span><strong>Sign in required:</strong> You must be logged into your NIX account to place an order.</span>
          </div>
          <Button type="button" variant="primary" size="sm" onClick={() => setAuthModalOpen(true)}>
            LOG IN
          </Button>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ananya Sharma"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
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
              placeholder="Flat, House no., Building, Apartment, Street"
              value={form.address}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>City</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. New Delhi"
                value={form.city}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>State</label>
              <input
                type="text"
                name="state"
                placeholder="e.g. Delhi"
                value={form.state}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>PIN Code</label>
              <input
                type="text"
                name="pincode"
                placeholder="110007"
                value={form.pincode}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', outline: 'none', backgroundColor: 'var(--color-warm-cream)' }}
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
          Payment processing is simulated for this competition prototype. Clicking below will instantly record a confirmed order to your verified account.
        </div>
      </div>

      {isUserAuthenticated ? (
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'PROCESSING ORDER...' : 'PLACE DEMO ORDER'}
        </Button>
      ) : (
        <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setAuthModalOpen(true)}>
          <Lock size={16} style={{ marginRight: '0.5rem' }} /> SIGN IN TO PLACE ORDER
        </Button>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </form>
  );
};

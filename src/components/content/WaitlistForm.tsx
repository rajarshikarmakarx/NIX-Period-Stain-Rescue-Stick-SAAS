import React, { useState } from 'react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';

export const WaitlistForm: React.FC = () => {
  const { waitlistEmail, submitWaitlist } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await submitWaitlist(email);
    setMessage(res.message);
    setLoading(false);
  };

  if (waitlistEmail || message) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-blush-soft)',
          border: '1px solid var(--color-blush-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'var(--color-deep-cherry)',
        }}
      >
        <CheckCircle size={28} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>You're on the list.</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            {message || `Registered with ${waitlistEmail}. We'll email you as soon as the Emergency Kit drops!`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '500px' }}>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          flex: 1,
          minWidth: '240px',
          padding: '0.85rem 1.2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-cocoa-light)',
          backgroundColor: 'var(--color-warm-cream)',
          color: 'var(--color-soft-cocoa)',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
      <Button type="submit" variant="primary" size="md" disabled={loading}>
        {loading ? 'JOINING...' : 'JOIN WAITLIST'}
      </Button>
    </form>
  );
};

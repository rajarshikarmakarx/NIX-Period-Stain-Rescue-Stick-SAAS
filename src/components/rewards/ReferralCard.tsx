import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackEvent } from '../../hooks/useAnalytics';

export const ReferralCard: React.FC = () => {
  const { rewards, showToast } = useApp();

  const handleCopy = () => {
    navigator.clipboard.writeText(rewards.referral_code);
    showToast(`Referral code ${rewards.referral_code} copied!`);
    trackEvent('referral_copy', { code: rewards.referral_code });
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        border: '1px solid var(--color-cocoa-light)',
      }}
    >
      <span className="eyebrow">SPREAD THE WORD</span>
      <h3 style={{ marginBottom: '0.5rem' }}>Your friend deserves a NIX too.</h3>
      <p style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '1.5rem' }}>
        Give friends ₹50 off their first NIX Stick. You’ll get 50 bonus reward points for every referral purchase.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-warm-cream)',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--color-deep-cherry)',
          marginBottom: '1rem',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em', color: 'var(--color-deep-cherry)' }}>
          {rewards.referral_code}
        </span>
        <button
          onClick={handleCopy}
          style={{
            backgroundColor: 'var(--color-deep-cherry)',
            color: 'var(--color-warm-cream)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            cursor: 'pointer',
          }}
        >
          <Copy size={14} /> Copy
        </button>
      </div>
    </div>
  );
};

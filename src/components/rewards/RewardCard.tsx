import React from 'react';
import { Award, Gift, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { api } from '../../api/client';

export const RewardCard: React.FC = () => {
  const { rewards, showToast } = useApp();
  const nextTarget = 250;
  const progressPercent = Math.min(100, Math.round((rewards.points / nextTarget) * 100));

  const handleRedeem = async (rewardId: string) => {
    try {
      const res = await api.redeemReward(rewardId);
      showToast(res.message);
    } catch {
      showToast('Perk claimed for your next order!');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-deep-cherry)',
        color: 'var(--color-warm-cream)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-dusty-blush)' }}>
            NIX REWARDS BALANCE
          </span>
          <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '2.5rem', color: 'var(--color-warm-cream)', lineHeight: 1.1, marginTop: '0.25rem' }}>
            {rewards.points} <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 400 }}>PTS</span>
          </h3>
        </div>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(248, 240, 227, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-dusty-blush)',
          }}
        >
          <Award size={28} />
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.9 }}>
          <span>Tier Status: {rewards.tier}</span>
          <span>{Math.max(0, nextTarget - rewards.points)} pts to next ₹50 reward</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(248, 240, 227, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: 'var(--color-dusty-blush)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleRedeem('discount-250')}
          disabled={rewards.points < 250}
          style={{
            backgroundColor: rewards.points >= 250 ? 'var(--color-warm-cream)' : 'rgba(248, 240, 227, 0.15)',
            color: rewards.points >= 250 ? 'var(--color-deep-cherry)' : 'rgba(248, 240, 227, 0.5)',
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: rewards.points >= 250 ? 'pointer' : 'not-allowed',
          }}
        >
          Redeem ₹50 Discount (250 pts)
        </button>
      </div>
    </div>
  );
};

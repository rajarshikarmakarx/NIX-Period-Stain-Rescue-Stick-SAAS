import React from 'react';
import { RewardCard } from '../components/rewards/RewardCard';
import { ReferralCard } from '../components/rewards/ReferralCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { useApp } from '../context/AppContext';
import { Award, ShoppingBag, UserPlus, BookOpen } from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { rewards } = useApp();

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <SectionHeading
          eyebrow="RETENTION & PERKS"
          title="Good things come back around."
          subtitle="Earn points for purchases, referring friends, and engaging with NIX."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <RewardCard />
          <ReferralCard />
        </div>

        {/* How to Earn Points Breakdown */}
        <div style={{ backgroundColor: 'var(--color-cream-card)', borderRadius: 'var(--radius-xl)', padding: '3rem', border: '1px solid var(--color-cocoa-light)', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>How to Earn Points</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: ShoppingBag, pts: '100 PTS', title: 'Every Purchase', desc: 'Earn points every time you buy or reorder a NIX Stick.' },
              { icon: UserPlus, pts: '50 PTS', title: 'Refer a Friend', desc: 'When your friend uses your referral code for their first stick.' },
              { icon: Award, pts: '25 PTS', title: 'Complete Profile', desc: 'Fill out your NIX account preference details.' },
              { icon: BookOpen, pts: '25 PTS', title: 'Read NIX Notes', desc: 'Learn period stain care tips on our editorial hub.' },
            ].map((earn, idx) => {
              const IconComp = earn.icon;
              return (
                <div key={idx} style={{ textAlign: 'center', backgroundColor: 'var(--color-warm-cream)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
                  <div style={{ color: 'var(--color-deep-cherry)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                    <IconComp size={28} />
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-deep-cherry)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {earn.pts}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.35rem' }}>{earn.title}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{earn.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity History */}
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Reward Activity History</h3>
          <div style={{ backgroundColor: 'var(--color-cream-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)', overflow: 'hidden' }}>
            {rewards.history.map((hist, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderBottom: idx === rewards.history.length - 1 ? 'none' : '1px solid var(--color-cocoa-light)',
                  fontSize: '0.95rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{hist.action}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{hist.timestamp}</div>
                </div>
                <div style={{ fontWeight: 700, color: hist.points > 0 ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)' }}>
                  {hist.points > 0 ? `+${hist.points}` : hist.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

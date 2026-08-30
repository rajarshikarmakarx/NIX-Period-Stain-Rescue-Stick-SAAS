import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Award, RotateCcw, Share2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { RewardCard } from '../components/rewards/RewardCard';
import { useApp } from '../context/AppContext';

export const AccountPage: React.FC = () => {
  const { orders, rewards, addToCart } = useApp();

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Header Greeting */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="eyebrow">MY NIX DASHBOARD</span>
          <h1 style={{ fontSize: '2.5rem' }}>Hey, Ananya.</h1>
          <p style={{ opacity: 0.85 }}>Welcome back to your period stain care portal.</p>
        </div>

        {/* 4 Overview Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
            <div style={{ color: 'var(--color-deep-cherry)', marginBottom: '0.5rem' }}><Package size={22} /></div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Total Orders</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{orders.length}</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
            <div style={{ color: 'var(--color-deep-cherry)', marginBottom: '0.5rem' }}><Award size={22} /></div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rewards Balance</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>{rewards.points} pts</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
            <div style={{ color: 'var(--color-deep-cherry)', marginBottom: '0.5rem' }}><RotateCcw size={22} /></div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Replenishment</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.3rem' }}>On Schedule</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-cocoa-light)' }}>
            <div style={{ color: 'var(--color-deep-cherry)', marginBottom: '0.5rem' }}><Share2 size={22} /></div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Referral Code</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-deep-cherry)', marginTop: '0.3rem' }}>
              {rewards.referral_code}
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------
            REPLENISHMENT SECTION (§23)
            -------------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--color-cocoa-light)',
            marginBottom: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <span className="eyebrow">REPLENISHMENT CARE</span>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Never get caught without a backup.</h2>
            <p style={{ opacity: 0.85, maxWidth: '500px' }}>
              Running low on your handbag NIX Stick? Reorder now or subscribe for automatic monthly delivery.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md" onClick={() => addToCart(1)}>
              REORDER NIX STICK NOW
            </Button>
            <span className="badge badge-blush" style={{ alignSelf: 'center' }}>
              AUTO-SUBSCRIPTION COMING SOON
            </span>
          </div>
        </div>

        {/* Orders History & Rewards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Past Orders */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Recent Orders</h3>

            {orders.length === 0 ? (
              <div style={{ backgroundColor: 'var(--color-cream-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <p style={{ opacity: 0.8, marginBottom: '1rem' }}>No orders placed yet.</p>
                <Link to="/shop">
                  <Button variant="primary" size="sm">Place Your First Order</Button>
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      backgroundColor: 'var(--color-cream-card)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      border: '1px solid var(--color-cocoa-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-deep-cherry)' }}>{ord.id}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                        {ord.items.length} item(s) • {ord.currency}{ord.total}
                      </div>
                    </div>
                    <Link to={`/account/orders/${ord.id}`}>
                      <Button variant="secondary" size="sm">Track</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rewards Widget */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Rewards Overview</h3>
            <RewardCard />
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <Link to="/rewards" style={{ color: 'var(--color-deep-cherry)', fontWeight: 600, fontSize: '0.9rem' }}>
                View Full Rewards Hub →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Award, RotateCcw, Share2, User, Edit2, CalendarDays } from 'lucide-react';

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return iso; }
}
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { RewardCard } from '../components/rewards/RewardCard';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const AccountPage: React.FC = () => {
  const { orders, rewards, addToCart, showToast } = useApp();
  const { profile, updateProfile, signOut } = useAuth();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone_number || '');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProfile(fullName, phone);
    setSaving(false);
    if (res.success) {
      setEditing(false);
      showToast('Profile updated successfully.');
    }
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Customer';

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Header Greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow">MY NIX DASHBOARD</span>
            <h1 style={{ fontSize: '2.5rem' }}>Hey, {firstName}.</h1>
            <p style={{ opacity: 0.85 }}>Welcome back to your period stain care portal.</p>
          </div>

          <Button variant="secondary" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        {/* User Profile Card (View / Edit Mode) */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--color-cocoa-light)',
            marginBottom: '3rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} color="var(--color-deep-cherry)" /> Customer Profile Information
            </h3>
            {!editing && (
              <button
                onClick={() => {
                  setFullName(profile?.full_name || '');
                  setPhone(profile?.phone_number || '');
                  setEditing(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--color-deep-cherry)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                <Edit2 size={15} /> Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-warm-cream)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-warm-cream)',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button type="submit" variant="primary" size="md" disabled={saving}>
                  {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </Button>
                <Button type="button" variant="secondary" size="md" onClick={() => setEditing(false)}>
                  CANCEL
                </Button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.2rem' }}>Full Name</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{profile?.full_name}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.2rem' }}>Email Address</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{profile?.email}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.2rem' }}>Phone Number</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{profile?.phone_number || 'Not added'}</div>
              </div>
            </div>
          )}
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
                {orders.map((ord) => {
                  const totalQty = ord.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <div
                      key={ord.id}
                      style={{
                        backgroundColor: 'var(--color-cream-card)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem',
                        border: '1px solid var(--color-cocoa-light)',
                      }}
                    >
                      {/* Top row: id + status + track button */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-deep-cherry)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                            {ord.id}
                          </span>
                          <span
                            className="badge"
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: ord.status === 'Cancelled' ? '#FDE8E8' : 'var(--color-blush-soft)',
                              color: ord.status === 'Cancelled' ? '#9B1C1C' : 'var(--color-deep-cherry)',
                              fontWeight: 700,
                            }}
                          >
                            {ord.status.toUpperCase()}
                          </span>
                        </div>
                        <Link to={`/account/orders/${ord.id}`}>
                          <Button variant="secondary" size="sm">
                            {ord.status === 'Cancelled' ? 'View Details' : 'Track'}
                          </Button>
                        </Link>
                      </div>

                      {/* Detail row: item thumbnail + meta */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: '1px solid var(--color-cocoa-light)',
                            backgroundColor: 'var(--color-warm-cream)',
                          }}
                        >
                          <img
                            src={
                              ord.items?.[0]?.variant_id === '20ml'
                                ? '/images/20ml-without-packaging.jpg'
                                : '/images/10ml-without-packaging.jpg'
                            }
                            alt="NIX Stick"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.15rem' }}>
                            NIX Period Rescue Stick {ord.items?.[0]?.variant_name ? `(${ord.items[0].variant_name})` : ''}
                          </div>
                          <div style={{ fontSize: '0.78rem', opacity: 0.65, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <span>Qty: {totalQty}</span>
                            <span>·</span>
                            <span style={{ color: 'var(--color-deep-cherry)', fontWeight: 600 }}>
                              {ord.currency}{ord.total}
                            </span>
                            <span>·</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                              <CalendarDays size={11} />
                              {fmtDate(ord.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

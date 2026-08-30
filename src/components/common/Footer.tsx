import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast("You're subscribed to NIX updates.");
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-soft-cocoa)',
        color: 'var(--color-warm-cream)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--color-warm-cream)',
                display: 'inline-block',
                marginBottom: '1rem',
              }}
            >
              NIX & CO.
            </Link>
            <p style={{ color: 'rgba(248, 240, 227, 0.75)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Portable care for unpredictable moments. Designed for life outside the laundry room.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--color-warm-cream)', opacity: 0.8 }} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" style={{ color: 'var(--color-warm-cream)', opacity: 0.8 }} aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', opacity: 0.9 }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/shop" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>Shop NIX</Link></li>
              <li><Link to="/how-it-works" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>How It Works</Link></li>
              <li><Link to="/rewards" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>NIX Rewards</Link></li>
              <li><Link to="/emergency-kit" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>Emergency Kit</Link></li>
              <li><Link to="/notes" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>NIX Notes</Link></li>
              <li><Link to="/about" style={{ color: 'rgba(248, 240, 227, 0.85)' }}>About Us</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', opacity: 0.9 }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.85 }}>
              <li>Contact & Support</li>
              <li>Shipping & Delivery</li>
              <li>Returns & Refunds</li>
              <li>Frequently Asked Questions</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', opacity: 0.9 }}>
              Get NIX Updates
            </h4>
            <p style={{ color: 'rgba(248, 240, 227, 0.75)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Be first to know about new products, emergency kits, and period care tips.
            </p>

            {subscribed ? (
              <p style={{ color: 'var(--color-dusty-blush)', fontWeight: 600, fontSize: '0.9rem' }}>
                ✓ You're on the NIX insider list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(248, 240, 227, 0.2)',
                    backgroundColor: 'rgba(248, 240, 227, 0.1)',
                    color: 'var(--color-warm-cream)',
                    fontSize: '0.9rem',
                    flex: 1,
                    outline: 'none',
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-cherry-red)',
                    color: 'var(--color-warm-cream)',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(248, 240, 227, 0.15)', marginBottom: '1.5rem' }} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(248, 240, 227, 0.6)',
          }}
        >
          <div>© {new Date().getFullYear()} NIX & CO. All rights reserved. Pitch prototype build.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <Heart size={14} fill="var(--color-cherry-red)" color="var(--color-cherry-red)" /> for everyday emergencies.
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, Award, Package, ChevronDown, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC = () => {
  const { totalCartCount, showToast } = useApp();
  const { profile, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
    showToast('Signed out of NIX & CO.');
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Account';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(248, 240, 227, 0.95)' : 'var(--color-warm-cream)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-cocoa-light)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        height: 'var(--header-height)',
        isolation: 'isolate',   /* new stacking context keeps drawer inside */
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'var(--color-deep-cherry)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          NIX <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>& CO.</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <Link
            to="/shop"
            style={{
              fontWeight: location.pathname === '/shop' ? 600 : 400,
              color: location.pathname === '/shop' ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
            }}
          >
            Shop
          </Link>
          <Link
            to="/how-it-works"
            style={{
              fontWeight: location.pathname === '/how-it-works' ? 600 : 400,
              color: location.pathname === '/how-it-works' ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
            }}
          >
            How It Works
          </Link>
          <Link
            to="/rewards"
            style={{
              fontWeight: location.pathname === '/rewards' ? 600 : 400,
              color: location.pathname === '/rewards' ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
            }}
          >
            Rewards
          </Link>
          <Link
            to="/cycle-predictor"
            style={{
              fontWeight: location.pathname === '/cycle-predictor' ? 600 : 400,
              color: location.pathname === '/cycle-predictor' ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Calendar size={15} color="var(--color-deep-cherry)" />
            Cycle Predictor
          </Link>
          <Link
            to="/about"
            style={{
              fontWeight: location.pathname === '/about' ? 600 : 400,
              color: location.pathname === '/about' ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
            }}
          >
            About
          </Link>
          <Link
            to="/emergency-kit"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-deep-cherry)',
              backgroundColor: 'var(--color-blush-soft)',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 600,
            }}
          >
            Emergency Kit
          </Link>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* User Account / Auth Dropdown */}
          <div style={{ position: 'relative' }}>
            {profile ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--color-soft-cocoa)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backgroundColor: 'var(--color-cream-card)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--color-cocoa-light)',
                  cursor: 'pointer',
                }}
              >
                <User size={18} color="var(--color-deep-cherry)" />
                <span className="desktop-nav">{firstName}</span>
                <ChevronDown size={14} />
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--color-deep-cherry)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backgroundColor: 'transparent',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--color-deep-cherry)',
                  cursor: 'pointer',
                }}
              >
                <User size={18} />
                <span>Sign In</span>
              </button>
            )}

            {/* User Dropdown Menu */}
            {userDropdownOpen && profile && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '200px',
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-cocoa-light)',
                  padding: '0.5rem 0',
                  zIndex: 1100,
                }}
              >
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-cocoa-light)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{profile.full_name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{profile.email}</div>
                  {profile.phone_number && (
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{profile.phone_number}</div>
                  )}
                </div>

                <Link
                  to="/account"
                  onClick={() => setUserDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-soft-cocoa)',
                  }}
                >
                  <Package size={16} /> My Account & Orders
                </Link>

                <Link
                  to="/rewards"
                  onClick={() => setUserDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-soft-cocoa)',
                  }}
                >
                  <Award size={16} /> NIX Rewards
                </Link>

                <Link
                  to="/cycle-predictor"
                  onClick={() => setUserDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-soft-cocoa)',
                  }}
                >
                  <Calendar size={16} /> Cycle Predictor
                </Link>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)', margin: '0.25rem 0' }} />

                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-cherry-red)',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>

          <Link
            to="/cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--color-deep-cherry)',
              color: 'var(--color-warm-cream)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            <ShoppingBag size={18} />
            <span>Bag</span>
            <span
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-deep-cherry)',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {totalCartCount}
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--color-soft-cocoa)' }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '100dvh',
            backgroundColor: 'var(--color-warm-cream)',
            zIndex: 999,
            padding: '2rem 1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderTop: '1px solid var(--color-cocoa-light)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          <Link to="/shop" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            Shop NIX
          </Link>
          <Link to="/how-it-works" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            How It Works
          </Link>
          <Link to="/rewards" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            Rewards & Referrals
          </Link>
          <Link to="/cycle-predictor" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-deep-cherry)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} /> Cycle Predictor
          </Link>
          <Link to="/emergency-kit" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-deep-cherry)' }}>
            Emergency Kit Waitlist
          </Link>
          <Link to="/notes" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            NIX Notes
          </Link>
          <Link to="/about" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            About NIX & CO.
          </Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-cocoa-light)' }} />
          {profile ? (
            <Link to="/account" style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} /> My Account ({profile.full_name})
            </Link>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-deep-cherry)',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
              }}
            >
              <User size={20} /> Sign In / Create Account
            </button>
          )}
        </div>
      )}

      {/* Responsive Style Overrides */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

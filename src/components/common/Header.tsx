import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { totalCartCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [location]);

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
          <Link
            to="/account"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-soft-cocoa)' }}
            title="My Account"
          >
            <User size={20} />
            <span style={{ fontSize: '0.9rem' }} className="desktop-nav">
              Account
            </span>
          </Link>

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

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--color-warm-cream)',
            zIndex: 999,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderTop: '1px solid var(--color-cocoa-light)',
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
          <Link to="/account" style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} /> My Account
          </Link>
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

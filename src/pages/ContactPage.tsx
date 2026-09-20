import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Send,
  HelpCircle,
  Truck,
  RotateCcw,
  FileText,
  ChevronDown,
  CheckCircle,
  Sparkles,
  Package,
  Instagram,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { trackEvent } from '../hooks/useAnalytics';

type TabKey = 'contact' | 'faq' | 'shipping' | 'returns' | 'privacy' | 'terms';

export const ContactPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useApp();

  const initialTab = (searchParams.get('tab') as TabKey) || 'contact';
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  // Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    category: 'Order & Delivery Tracking',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Accordion state for FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sync tab with URL search parameter if user navigates via footer links
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabKey;
    if (tabParam && ['contact', 'faq', 'shipping', 'returns', 'privacy', 'terms'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your message has been received. Our team will get back to you within 24 hours.');
      trackEvent('submit_contact_form', { category: form.category });
    }, 600);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      orderId: '',
      category: 'Order & Delivery Tracking',
      message: '',
    });
  };

  const faqs = [
    {
      q: 'How does NIX dissolve period stains without water?',
      a: 'NIX uses a concentrated bio-protease plant enzyme formula engineered specifically to target and break down hemoglobin and iron-protein structures in blood. When dabbed directly onto fabric, the enzymes dissolve the protein matrix before it can bond permanently with fabric fibers.',
    },
    {
      q: 'Is NIX safe for all fabrics and colors?',
      a: 'Yes! NIX is 100% bleach-free, chlorine-free, and color-safe. It is tested and proven safe on cotton, denim, linen, polyester, activewear blends, and standard everyday garments. For ultra-delicate materials like raw mulberry silk, we recommend a quick spot test on an inside seam first.',
    },
    {
      q: 'How many emergency uses do I get per stick?',
      a: 'The 10ml Pocket Stick provides ~5 full emergency stain treatments. The 20ml Standard Stick provides ~10 emergency stain treatments.',
    },
    {
      q: 'Why does NIX offer replaceable roll-on heads?',
      a: 'Because the roller-ball is the only part that comes into direct contact with soiled fabric, our patent-pending Snap-On cartridge system allows you to replace just the head after ~5 uses (from ₹10). This prevents bacteria and stale fluid buildup from ever contaminating your fresh clothing.',
    },
    {
      q: 'How long can treated clothes wait before being washed?',
      a: 'Once you pre-treat a stain with NIX, it remains active and stabilized for up to 72 hours. You can comfortably go about your day and toss the garment into your regular laundry cycle whenever you get home.',
    },
    {
      q: 'Can NIX treat old, dried, or set-in period stains?',
      a: 'While NIX is optimized for fresh and semi-fresh emergency stains, it also significantly softens dried stains. For dried stains, apply generously, let sit for 2–3 minutes, rub fabric gently, and then wash with cold water.',
    },
  ];

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <SectionHeading
          eyebrow="NIX CARE & HELP CENTER"
          title="We’re here for you, anytime."
          subtitle="Have a question about your order, fabric compatibility, or refill heads? Our care team is ready to assist."
        />

        {/* --------------------------------------------------------------------
            TOP DIRECT CONTACT CARDS (4 COLUMNS)
            -------------------------------------------------------------------- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {/* Email Support */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              border: '1px solid var(--color-cocoa-light)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blush-soft)',
                  color: 'var(--color-deep-cherry)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Mail size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email Support</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                Quick responses from our team within 24 hours.
              </p>
            </div>
            <a
              href="mailto:care@nixindia.co"
              style={{
                color: 'var(--color-deep-cherry)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              care@nixindia.co →
            </a>
          </div>

          {/* WhatsApp / Phone */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              border: '1px solid var(--color-cocoa-light)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blush-soft)',
                  color: 'var(--color-deep-cherry)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Phone size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Direct Helpline</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                Mon–Sat • 9:00 AM – 7:00 PM IST
              </p>
            </div>
            <a
              href="tel:+919876543210"
              style={{
                color: 'var(--color-deep-cherry)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              +91 98765 43210 →
            </a>
          </div>

          {/* Instagram DM */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              border: '1px solid var(--color-cocoa-light)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blush-soft)',
                  color: 'var(--color-deep-cherry)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Instagram size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Instagram DM</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                Drop us a message for quick tips and community chat.
              </p>
            </div>
            <a
              href="https://www.instagram.com/nixindia.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-deep-cherry)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              @nixindia.co →
            </a>
          </div>

          {/* Headquarters */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              border: '1px solid var(--color-cocoa-light)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blush-soft)',
                  color: 'var(--color-deep-cherry)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <MapPin size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>NixIndia</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                New Alipore, Kolkata - 700053
              </p>
            </div>
            <span style={{ color: 'var(--color-deep-cherry)', fontWeight: 700, fontSize: '0.85rem' }}>
              🇮🇳 Made with care in India
            </span>
          </div>
        </div>

        {/* --------------------------------------------------------------------
            TAB NAVIGATION BAR
            -------------------------------------------------------------------- */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--color-cocoa-light)',
            marginBottom: '2.5rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          {[
            { key: 'contact', label: 'Send a Message', icon: MessageCircle },
            { key: 'faq', label: 'FAQs', icon: HelpCircle },
            { key: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { key: 'returns', label: 'Returns & Guarantee', icon: RotateCcw },
            { key: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
            { key: 'terms', label: 'Terms of Service', icon: FileText },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key as TabKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive ? '2px solid var(--color-deep-cherry)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--color-blush-soft)' : 'transparent',
                  color: isActive ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComp size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* --------------------------------------------------------------------
            TAB 1: CONTACT FORM
            -------------------------------------------------------------------- */}
        {activeTab === 'contact' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'flex-start',
            }}
          >
            {/* Form Section */}
            <div
              style={{
                backgroundColor: 'var(--color-cream-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: '1px solid var(--color-cocoa-light)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Us a Note</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.75rem' }}>
                Fill in the details below and a NIX care specialist will reply promptly.
              </p>

              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem',
                    backgroundColor: 'var(--color-warm-cream)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-cocoa-light)',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-blush-soft)',
                      color: 'var(--color-deep-cherry)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem auto',
                    }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message Dispatched!</h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                    We’ve received your request for <strong>{form.category}</strong>. Expect a response in your inbox (<strong>{form.email}</strong>) shortly.
                  </p>
                  <Button variant="secondary" size="md" onClick={handleResetForm}>
                    SEND ANOTHER INQUIRY
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ananya Sharma"
                        required
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-cocoa-light)',
                          backgroundColor: 'var(--color-warm-cream)',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ananya@example.com"
                        required
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-cocoa-light)',
                          backgroundColor: 'var(--color-warm-cream)',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-cocoa-light)',
                          backgroundColor: 'var(--color-warm-cream)',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Order ID (If applicable)
                      </label>
                      <input
                        type="text"
                        name="orderId"
                        value={form.orderId}
                        onChange={handleChange}
                        placeholder="e.g. NIX-884201"
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-cocoa-light)',
                          backgroundColor: 'var(--color-warm-cream)',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Topic of Inquiry *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-cocoa-light)',
                        backgroundColor: 'var(--color-warm-cream)',
                        outline: 'none',
                        fontSize: '0.95rem',
                      }}
                    >
                      <option value="Order & Delivery Tracking">Order & Delivery Tracking 📦</option>
                      <option value="Product & Fabric Compatibility">Product & Fabric Compatibility 👗</option>
                      <option value="Replaceable Roll-On Heads & Refills">Replaceable Roll-On Heads & Refills 🔄</option>
                      <option value="Rewards & Referral Points">Rewards & Referral Points 🏆</option>
                      <option value="Emergency Kit Waitlist">Emergency Kit Waitlist 🌸</option>
                      <option value="Press, Partnerships & Distribution">Press, Partnerships & Distribution 🤝</option>
                      <option value="Other">Other Inquiry ✨</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-cocoa-light)',
                        backgroundColor: 'var(--color-warm-cream)',
                        outline: 'none',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
                    <Send size={18} /> {submitting ? 'SENDING MESSAGE...' : 'SUBMIT INQUIRY'}
                  </Button>
                </form>
              )}
            </div>

            {/* Quick Self-Service Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  backgroundColor: 'var(--color-deep-cherry)',
                  color: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                }}
              >
                <span className="eyebrow" style={{ color: 'var(--color-dusty-blush)' }}>
                  SELF-SERVICE PORTAL
                </span>
                <h3 style={{ color: 'var(--color-warm-cream)', fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                  Need instant order tracking?
                </h3>
                <p style={{ color: 'var(--color-dusty-blush)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  You can check live tracking timelines, download receipts, or cancel eligible orders directly from your account.
                </p>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      backgroundColor: 'var(--color-warm-cream)',
                      color: 'var(--color-deep-cherry)',
                      width: '100%',
                    }}
                  >
                    <Package size={16} /> GO TO MY ORDERS →
                  </Button>
                </Link>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-cream-card)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem',
                  border: '1px solid var(--color-cocoa-light)',
                }}
              >
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Emergency Care Guarantee</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="var(--color-deep-cherry)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span><strong>100% Discreet Shipping:</strong> Unmarked outer packaging with no mention of menstrual care.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="var(--color-deep-cherry)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span><strong>Fabric Safety Guarantee:</strong> 100% enzyme bio-protease with zero harsh bleaches or chlorine.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="var(--color-deep-cherry)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span><strong>Zero Cross-Contamination:</strong> Replaceable roller heads to keep fresh garments spotless.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 2: FAQS ACCORDION
            -------------------------------------------------------------------- */}
        {activeTab === 'faq' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Frequently Asked Questions</h3>
              <p style={{ opacity: 0.85 }}>Everything you need to know about NIX formula, application, and refills.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-cream-card)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-cocoa-light)',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.25rem 1.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: 'var(--color-soft-cocoa)',
                      }}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={20}
                        color="var(--color-deep-cherry)"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                          marginLeft: '1rem',
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 1.5rem 1.25rem 1.5rem',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          opacity: 0.9,
                          borderTop: '1px solid var(--color-cocoa-light)',
                          paddingTop: '1rem',
                        }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '3rem',
                padding: '2rem',
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-cocoa-light)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Still have a specific question?</h4>
              <p style={{ opacity: 0.85, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Our fabric formulation specialists are happy to advise on special garment care.
              </p>
              <Button variant="primary" size="md" onClick={() => handleTabChange('contact')}>
                ASK A SPECIALIST →
              </Button>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 3: SHIPPING & DELIVERY
            -------------------------------------------------------------------- */}
        {activeTab === 'shipping' && (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid var(--color-cocoa-light)',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Truck size={28} color="var(--color-deep-cherry)" />
              <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Shipping & Delivery Policy</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, fontSize: '0.98rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  1. Pan-India Delivery Timelines
                </h4>
                <p style={{ opacity: 0.9 }}>
                  We dispatch all orders within 24 hours of placement. Estimated transit times:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', opacity: 0.9 }}>
                  <li><strong>Delhi NCR & Major Metro Hubs:</strong> 1–2 business days.</li>
                  <li><strong>Tier 1 & Tier 2 Cities:</strong> 2–4 business days.</li>
                  <li><strong>Rest of India:</strong> 4–6 business days.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  2. Shipping Fees & Free Thresholds
                </h4>
                <p style={{ opacity: 0.9 }}>
                  We offer <strong>FREE Standard Shipping</strong> on all orders of ₹499 and above. For orders under ₹499, a flat shipping fee of <strong>₹49</strong> is applied at checkout.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  3. 100% Discreet Packaging Pledge
                </h4>
                <p style={{ opacity: 0.9 }}>
                  We respect your privacy. All NIX orders are delivered in plain, unbranded kraft cartons with zero reference to menstrual care or stain sticks on the outer shipping label.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  4. Live Tracking & SMS Alerts
                </h4>
                <p style={{ opacity: 0.9 }}>
                  Once your order is packed and dispatched, you will receive real-time tracking updates via SMS and email, with live step-by-step progress viewable on your account page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 4: RETURNS & GUARANTEE
            -------------------------------------------------------------------- */}
        {activeTab === 'returns' && (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid var(--color-cocoa-light)',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <RotateCcw size={28} color="var(--color-deep-cherry)" />
              <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Returns & Replacement Guarantee</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, fontSize: '0.98rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  30-Day Happiness Guarantee
                </h4>
                <p style={{ opacity: 0.9 }}>
                  We stand by the stain-dissolving performance of our bio-protease formulation. If NIX does not perform to your expectations or if you receive a damaged stick or roller head, we will gladly replace your item or issue a full refund within 30 days of purchase.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  Hygienic Care Standards
                </h4>
                <p style={{ opacity: 0.9 }}>
                  Due to the personal hygiene nature of roll-on applicators, opened or used sticks cannot be physically returned to our warehouse for resale. For approved quality claims, we issue instant replacements or store credit without requiring you to ship the used item back.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-cherry)', marginBottom: '0.4rem' }}>
                  How to Initiate a Claim
                </h4>
                <p style={{ opacity: 0.9 }}>
                  Simply send an email to <a href="mailto:care@nixindia.co" style={{ color: 'var(--color-deep-cherry)', fontWeight: 700 }}>care@nixindia.co</a> with your Order ID (e.g. <code>NIX-884201</code>) and a photo of the affected item. Our team processes replacement dispatches within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 5: PRIVACY POLICY
            -------------------------------------------------------------------- */}
        {activeTab === 'privacy' && (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid var(--color-cocoa-light)',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={28} color="var(--color-deep-cherry)" />
              <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Privacy & Data Protection Policy</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, fontSize: '0.95rem', opacity: 0.9 }}>
              <p>
                At NIX & CO., we take your personal and health privacy with utmost seriousness. This Privacy Policy details how we handle your data across our platforms.
              </p>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  1. Local-First Menstrual Cycle Data
                </h4>
                <p>
                  All period start dates, cycle logs, and stain incident logs entered into the <strong>NIX Cycle & Stain Predictor</strong> are stored strictly on your local device browser (LocalStorage). We do NOT sell, transmit, or monetize your menstrual health data to third-party ad networks.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  2. Order & Delivery Information
                </h4>
                <p>
                  When you place an order, we collect your name, shipping address, email, and phone number solely to fulfill delivery and send dispatch tracking alerts. Payment information is securely tokenized via PCI-DSS compliant gateways.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  3. Cookies & Session Security
                </h4>
                <p>
                  We use lightweight functional session cookies to remember your bag items and authentication state. You may clear your cookies or reset demo states at any time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------
            TAB 6: TERMS OF SERVICE
            -------------------------------------------------------------------- */}
        {activeTab === 'terms' && (
          <div
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid var(--color-cocoa-light)',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <FileText size={28} color="var(--color-deep-cherry)" />
              <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Terms of Service</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, fontSize: '0.95rem', opacity: 0.9 }}>
              <p>
                Welcome to NIX & CO. By accessing our website, purchasing our products, or using our digital tools, you agree to the following terms and conditions.
              </p>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  1. Product Usage & Guidelines
                </h4>
                <p>
                  NIX Period Stain Rescue Sticks and replaceable roller heads are external garment pre-treatment cosmetics. They are not intended for internal medical use or ingestion. Always cap the stick tightly after application.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  2. Rewards & Referral Program
                </h4>
                <p>
                  NIX Reward points are non-transferable and hold no direct cash value outside the NIX & CO. store catalog. Reward codes may be redeemed against orders or perk benefits as detailed in the Rewards Portal.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-deep-cherry)', marginBottom: '0.3rem' }}>
                  3. Intellectual Property
                </h4>
                <p>
                  All brand trademarks, packaging visuals, enzyme formulation trademarks, and user interface designs are the intellectual property of NIX & CO. Innovations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

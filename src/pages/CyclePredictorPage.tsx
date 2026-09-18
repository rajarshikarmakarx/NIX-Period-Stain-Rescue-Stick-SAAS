import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldAlert,
  Sparkles,
  Droplet,
  Plus,
  CheckCircle2,
  ShoppingBag,
  Share2,
  RefreshCw,
  Bell,
  Heart,
  Info,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Trash2,
  Download
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { trackEvent } from '../hooks/useAnalytics';

interface CycleLog {
  id: string;
  date: string;
  type: 'period_start' | 'stain_incident' | 'nix_used' | 'symptom';
  note: string;
  flow?: 'Light' | 'Medium' | 'Heavy';
}

export const CyclePredictorPage: React.FC = () => {
  const { addToCart, showToast } = useApp();

  // Inputs state
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    const saved = localStorage.getItem('nix_cycle_last_period');
    if (saved) return saved;
    // Default to 14 days ago
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split('T')[0];
  });

  const [cycleLength, setCycleLength] = useState<number>(() => {
    const saved = localStorage.getItem('nix_cycle_length');
    return saved ? parseInt(saved, 10) : 28;
  });

  const [periodLength, setPeriodLength] = useState<number>(() => {
    const saved = localStorage.getItem('nix_cycle_period_length');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [flowIntensity, setFlowIntensity] = useState<'Light' | 'Medium' | 'Heavy'>(() => {
    const saved = localStorage.getItem('nix_cycle_flow');
    return (saved as any) || 'Medium';
  });

  // Calendar View Month state
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  // Log Entries
  const [logs, setLogs] = useState<CycleLog[]>(() => {
    const saved = localStorage.getItem('nix_cycle_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
        type: 'period_start',
        note: 'Period started on schedule. Moderate flow.',
        flow: 'Medium'
      },
      {
        id: '2',
        date: new Date(Date.now() - 13 * 86400000).toISOString().split('T')[0],
        type: 'nix_used',
        note: 'Accidental stain on beige skirt at office. NIX Stick pre-treated in 30 seconds!',
        flow: 'Heavy'
      }
    ];
  });

  // New Log Form State
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLogType, setNewLogType] = useState<CycleLog['type']>('stain_incident');
  const [newLogDate, setNewLogDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newLogNote, setNewLogNote] = useState<string>('');
  const [newLogFlow, setNewLogFlow] = useState<'Light' | 'Medium' | 'Heavy'>('Medium');

  // Selected date state for day inspector
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nix_cycle_last_period', lastPeriodDate);
  }, [lastPeriodDate]);

  useEffect(() => {
    localStorage.setItem('nix_cycle_length', cycleLength.toString());
  }, [cycleLength]);

  useEffect(() => {
    localStorage.setItem('nix_cycle_period_length', periodLength.toString());
  }, [periodLength]);

  useEffect(() => {
    localStorage.setItem('nix_cycle_flow', flowIntensity);
  }, [flowIntensity]);

  useEffect(() => {
    localStorage.setItem('nix_cycle_logs', JSON.stringify(logs));
  }, [logs]);

  // Calculations
  const lastDateObj = new Date(lastPeriodDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate day difference from last period start
  const timeDiff = today.getTime() - lastDateObj.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // Current cycle day (1-indexed)
  const currentCycleDay = (daysDiff >= 0) ? ((daysDiff % cycleLength) + 1) : 1;

  // Next period date
  const cyclesPassed = Math.max(0, Math.floor(daysDiff / cycleLength));
  const nextPeriodObj = new Date(lastDateObj);
  nextPeriodObj.setDate(nextPeriodObj.getDate() + (cyclesPassed + (daysDiff >= 0 ? 1 : 0)) * cycleLength);
  
  const daysUntilNextPeriod = Math.ceil((nextPeriodObj.getTime() - today.getTime()) / (1000 * 3600 * 24));

  // Ovulation & Fertile Window
  const ovulationDayInCycle = Math.max(1, cycleLength - 14);
  const nextOvulationObj = new Date(lastDateObj);
  nextOvulationObj.setDate(nextOvulationObj.getDate() + (cyclesPassed * cycleLength) + (ovulationDayInCycle - 1));
  if (nextOvulationObj < today) {
    nextOvulationObj.setDate(nextOvulationObj.getDate() + cycleLength);
  }

  // Determine current phase
  let currentPhase: { name: string; desc: string; risk: 'High' | 'Medium' | 'Low'; color: string } = {
    name: 'Follicular Phase',
    desc: 'Low stain risk. Energy is building.',
    risk: 'Low',
    color: '#2e7d32'
  };

  if (currentCycleDay <= periodLength) {
    currentPhase = {
      name: 'Menstrual Phase',
      desc: 'Active period flow. High stain risk!',
      risk: 'High',
      color: 'var(--color-deep-cherry)'
    };
  } else if (currentCycleDay >= ovulationDayInCycle - 2 && currentCycleDay <= ovulationDayInCycle + 1) {
    currentPhase = {
      name: 'Ovulatory Phase',
      desc: 'Peak fertility window. Light mid-cycle spotting risk.',
      risk: 'Medium',
      color: '#9c27b0'
    };
  } else if (currentCycleDay > ovulationDayInCycle + 1) {
    if (daysUntilNextPeriod <= 3) {
      currentPhase = {
        name: 'Late Luteal (Pre-Period)',
        desc: 'Period starting soon! Keep NIX Stick packed in your bag.',
        risk: 'High',
        color: 'var(--color-cherry-red)'
      };
    } else {
      currentPhase = {
        name: 'Luteal Phase',
        desc: 'Progesterone rising. Pre-period prep phase.',
        risk: 'Low',
        color: '#e65100'
      };
    }
  }

  // Preset button click
  const applyPreset = (cLength: number, pLength: number) => {
    setCycleLength(cLength);
    setPeriodLength(pLength);
    showToast(`Cycle preset updated to ${cLength} days.`);
  };

  // Add Log Entry
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogDate) return;
    const newEntry: CycleLog = {
      id: Date.now().toString(),
      date: newLogDate,
      type: newLogType,
      note: newLogNote || (newLogType === 'nix_used' ? 'Used NIX Stick to treat a fresh stain.' : 'Logged cycle event.'),
      flow: newLogType === 'period_start' ? newLogFlow : undefined
    };

    if (newLogType === 'period_start') {
      setLastPeriodDate(newLogDate);
    }

    setLogs([newEntry, ...logs]);
    setShowLogModal(false);
    setNewLogNote('');
    showToast('Cycle log added successfully!');
    trackEvent('add_cycle_log', { type: newLogType });
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
    showToast('Log entry removed.');
  };

  // Calendar rendering helper
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to check what type a calendar date is
  const getDateClassification = (dateObj: Date) => {
    const timeVal = dateObj.getTime();
    const dateStr = dateObj.toISOString().split('T')[0];

    // Check if within any period window
    // Calculate relative day from lastPeriodDate
    const diffFromBase = Math.floor((timeVal - lastDateObj.getTime()) / (86400 * 1000));
    
    // Cyclic day offset
    let modDay = (diffFromBase % cycleLength);
    if (modDay < 0) modDay += cycleLength;
    const cycleDayForDate = modDay + 1;

    const isPeriodDay = cycleDayForDate <= periodLength;
    const isOvulation = cycleDayForDate === ovulationDayInCycle;
    const isFertile = cycleDayForDate >= (ovulationDayInCycle - 3) && cycleDayForDate <= (ovulationDayInCycle + 1);
    const isHighStainRisk = isPeriodDay || cycleDayForDate === cycleLength;
    const isToday = dateObj.toISOString().split('T')[0] === today.toISOString().split('T')[0];

    // Check if user logged an entry on this date
    const dayLogs = logs.filter(l => l.date === dateStr);

    return {
      cycleDay: cycleDayForDate,
      isPeriodDay,
      isOvulation,
      isFertile,
      isHighStainRisk,
      isToday,
      dayLogs
    };
  };

  // Export Calendar Reminders (.ics file)
  const handleExportCalendar = () => {
    const nextDateFormatted = nextPeriodObj.toISOString().replace(/-|:|\.\d+/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NIX and CO//Cycle Predictor//EN',
      'BEGIN:VEVENT',
      `SUMMARY:🌸 Predicted Period Start - Pack NIX Rescue Stick!`,
      `DESCRIPTION:Your next menstrual period is predicted to start today. Make sure your NIX Stain Rescue Stick is in your bag!`,
      `DTSTART:${nextDateFormatted.slice(0, 8)}T090000Z`,
      `DTEND:${nextDateFormatted.slice(0, 8)}T100000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `NIX_Cycle_Reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded NIX Period & Stain Reminder calendar file!');
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* --------------------------------------------------------------------
          HERO BANNER
          -------------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-cream-card)',
          padding: '3.5rem 0 2.5rem',
          borderBottom: '1px solid var(--color-cocoa-light)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={14} color="var(--color-deep-cherry)" /> NIX CYCLE & STAIN PREPAREDNESS INTELLIGENCE
            </span>
            <h1 style={{ marginBottom: '1rem' }}>
              Never get caught off guard by a <span style={{ color: 'var(--color-deep-cherry)', fontStyle: 'italic' }}>stain emergency.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1.5rem' }}>
              Track your menstrual phases, calculate your high stain risk days, and ensure your NIX Rescue Stick is always packed when you need it most.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="badge badge-blush" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldAlert size={14} /> 100% Private (Local Browser Data Only)
              </span>
              <span className="badge badge-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} /> Smart Stain Risk Index
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          MAIN CYCLE DASHBOARD (2 COLUMNS: CONFIG & CURRENT STATUS)
          -------------------------------------------------------------------- */}
      <section style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* COLUMN 1: CYCLE CONFIGURATION */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                border: '1px solid var(--color-cocoa-light)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <CalendarIcon size={22} color="var(--color-deep-cherry)" />
                <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Cycle Parameters</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Last Period Start Date */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      color: 'var(--color-soft-cocoa)',
                    }}
                  >
                    First Day of Last Period
                  </label>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-cream-card)',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Cycle Length Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Average Cycle Length</label>
                    <span style={{ fontWeight: 700, color: 'var(--color-deep-cherry)' }}>{cycleLength} Days</span>
                  </div>
                  <input
                    type="range"
                    min={21}
                    max={40}
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--color-deep-cherry)',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.7 }}>
                    <span>21 days</span>
                    <span>28 days (avg)</span>
                    <span>40 days</span>
                  </div>
                </div>

                {/* Period Length Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Period Duration</label>
                    <span style={{ fontWeight: 700, color: 'var(--color-deep-cherry)' }}>{periodLength} Days</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    value={periodLength}
                    onChange={(e) => setPeriodLength(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--color-deep-cherry)',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.7 }}>
                    <span>2 days</span>
                    <span>5 days (avg)</span>
                    <span>10 days</span>
                  </div>
                </div>

                {/* Flow Intensity Selection */}
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Typical Flow Intensity
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {(['Light', 'Medium', 'Heavy'] as const).map((flow) => (
                      <button
                        key={flow}
                        type="button"
                        onClick={() => setFlowIntensity(flow)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          border: flowIntensity === flow ? '2px solid var(--color-deep-cherry)' : '1px solid var(--color-cocoa-light)',
                          backgroundColor: flowIntensity === flow ? 'var(--color-blush-soft)' : 'var(--color-cream-card)',
                          color: flowIntensity === flow ? 'var(--color-deep-cherry)' : 'var(--color-soft-cocoa)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Droplet size={14} fill={flowIntensity === flow ? 'var(--color-deep-cherry)' : 'transparent'} />
                        {flow}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Presets */}
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.4rem' }}>
                    Quick Presets:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => applyPreset(28, 5)}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-cream-card)',
                        border: '1px solid var(--color-cocoa-light)',
                      }}
                    >
                      Regular (28 / 5d)
                    </button>
                    <button
                      onClick={() => applyPreset(24, 4)}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-cream-card)',
                        border: '1px solid var(--color-cocoa-light)',
                      }}
                    >
                      Short (24 / 4d)
                    </button>
                    <button
                      onClick={() => applyPreset(32, 6)}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-cream-card)',
                        border: '1px solid var(--color-cocoa-light)',
                      }}
                    >
                      Long (32 / 6d)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: REAL-TIME PREPAREDNESS HIGHLIGHT */}
            <div
              style={{
                backgroundColor: 'var(--color-deep-cherry)',
                color: 'var(--color-warm-cream)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-dusty-blush)',
                    }}
                  >
                    CURRENT CYCLE STATUS
                  </span>
                  <span
                    style={{
                      backgroundColor: currentPhase.color === 'var(--color-deep-cherry)' ? 'var(--color-cherry-red)' : 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    Day {currentCycleDay} of {cycleLength}
                  </span>
                </div>

                <h2 style={{ color: 'var(--color-warm-cream)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                  {currentPhase.name}
                </h2>
                <p style={{ color: 'var(--color-dusty-blush)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                  {currentPhase.desc}
                </p>

                {/* Key Predictions Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase' }}>Next Period Start</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      {nextPeriodObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-dusty-blush)', marginTop: '0.1rem' }}>
                      {daysUntilNextPeriod === 0 ? 'Starts Today!' : `in ${daysUntilNextPeriod} days`}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase' }}>Next Ovulation</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      {nextOvulationObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.1rem' }}>Est. fertile window</div>
                  </div>
                </div>

                {/* NIX Preparedness Alert Banner */}
                <div
                  style={{
                    backgroundColor: currentPhase.risk === 'High' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                    borderLeft: `4px solid ${currentPhase.risk === 'High' ? '#ff6b6b' : '#ffd166'}`,
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                    <ShieldAlert size={18} color={currentPhase.risk === 'High' ? '#ff6b6b' : '#ffd166'} />
                    Stain Risk Advisory: {currentPhase.risk.toUpperCase()}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-cream)', opacity: 0.9, marginTop: '0.3rem' }}>
                    {currentPhase.risk === 'High'
                      ? '⚠️ Peak leak window active! Ensure your NIX Stick is in your bag or purse today.'
                      : currentPhase.risk === 'Medium'
                      ? '💡 Mid-cycle spotting window. Carrying NIX provides peace of mind.'
                      : '✅ Low risk window. Great time to verify your NIX Stick cap is secured.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button
                  onClick={() => addToCart(1)}
                  style={{
                    backgroundColor: 'var(--color-warm-cream)',
                    color: 'var(--color-deep-cherry)',
                    flex: 1,
                  }}
                >
                  <ShoppingBag size={16} /> PACK NIX STICK (₹349)
                </Button>
                <button
                  onClick={handleExportCalendar}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-dusty-blush)',
                    color: 'var(--color-warm-cream)',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer',
                  }}
                  title="Export reminder to Google/iCal Calendar"
                >
                  <Download size={16} /> Remind Me
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------
              SECTION: DYNAMIC INTERACTIVE CALENDAR
              -------------------------------------------------------------------- */}
          <div
            className="calendar-card"
            style={{
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-cocoa-light)',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '4rem',
            }}
          >
            {/* Calendar Header — title row */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Cycle & Stain Calendar</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, margin: '0.25rem 0 0' }}>
                Color-coded predictions for {monthNames[month]} {year}
              </p>
            </div>

            {/* Calendar controls row — legend + month nav */}
            <div className="cal-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              {/* Legend */}
              <div className="cal-legend" style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-deep-cherry)', flexShrink: 0 }} />
                  Period
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#9c27b0', flexShrink: 0 }} />
                  Ovulation
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-blush-soft)', border: '1px solid var(--color-dusty-blush)', flexShrink: 0 }} />
                  Fertile
                </span>
              </div>

              {/* Prev / Today / Next */}
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
                  style={{ padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', backgroundColor: 'var(--color-warm-cream)', cursor: 'pointer' }}
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentMonthDate(new Date())}
                  style={{ padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', backgroundColor: 'var(--color-warm-cream)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
                  style={{ padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cocoa-light)', backgroundColor: 'var(--color-warm-cream)', cursor: 'pointer' }}
                  aria-label="Next Month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: 'var(--color-deep-cherry)',
                marginBottom: '0.5rem',
              }}
            >
              {/* Desktop: 3-letter abbrev. Mobile: 1-letter — swapped via CSS */}
              {[
                { short: 'S', long: 'Sun' },
                { short: 'M', long: 'Mon' },
                { short: 'T', long: 'Tue' },
                { short: 'W', long: 'Wed' },
                { short: 'T', long: 'Thu' },
                { short: 'F', long: 'Fri' },
                { short: 'S', long: 'Sat' },
              ].map((d, i) => (
                <div key={i} style={{ padding: '0.4rem 0' }}>
                  <span className="cal-day-long">{d.long}</span>
                  <span className="cal-day-short">{d.short}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="cal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem' }}>
              {/* Empty leading slots */}
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`empty-${idx}`} className="cal-empty" style={{ minHeight: '70px' }} />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const cellDate = new Date(year, month, dayNum);
                const cellDateStr = cellDate.toISOString().split('T')[0];
                const info = getDateClassification(cellDate);

                let cellBg = 'var(--color-warm-cream)';
                let textColor = 'var(--color-soft-cocoa)';
                let borderStyle = '1px solid var(--color-cocoa-light)';

                if (info.isPeriodDay) {
                  cellBg = 'var(--color-deep-cherry)';
                  textColor = 'var(--color-warm-cream)';
                } else if (info.isOvulation) {
                  cellBg = '#9c27b0';
                  textColor = '#ffffff';
                } else if (info.isFertile) {
                  cellBg = 'var(--color-blush-soft)';
                  borderStyle = '1px solid var(--color-dusty-blush)';
                }

                if (info.isToday) {
                  borderStyle = '2px solid var(--color-cherry-red)';
                }

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedDateStr(cellDateStr)}
                    style={{
                      minHeight: '70px',
                      backgroundColor: cellBg,
                      color: textColor,
                      borderRadius: 'var(--radius-md)',
                      padding: '0.4rem',
                      border: borderStyle,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    className="calendar-cell"
                  >
                    {/* Day number + TODAY pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="cal-day-num" style={{ fontWeight: 700 }}>{dayNum}</span>
                      {info.isToday && (
                        <span
                          className="cal-today-pill"
                          style={{
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            backgroundColor: 'var(--color-cherry-red)',
                            color: '#fff',
                            padding: '0.1rem 0.3rem',
                            borderRadius: '4px',
                            lineHeight: 1.3,
                          }}
                        >
                          NOW
                        </span>
                      )}
                    </div>

                    {/* Emoji dot indicators — always visible, text label only on desktop */}
                    <div className="cal-indicators" style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginTop: '0.2rem' }}>
                      {info.isPeriodDay && (
                        <span className="cal-label" style={{ fontSize: '0.68rem', fontWeight: 600, opacity: 0.95, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          🩸 <span className="cal-label-text">Period</span>
                        </span>
                      )}
                      {info.isOvulation && (
                        <span className="cal-label" style={{ fontSize: '0.68rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          ✨ <span className="cal-label-text">Ovulation</span>
                        </span>
                      )}
                      {info.isHighStainRisk && !info.isPeriodDay && (
                        <span className="cal-label" style={{ fontSize: '0.62rem', opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          ⚠️ <span className="cal-label-text">Risk</span>
                        </span>
                      )}
                      {info.dayLogs.length > 0 && (
                        <span className="cal-label" style={{ fontSize: '0.62rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          📝 <span className="cal-label-text">{info.dayLogs.length}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Date Inspector Card */}
            {selectedDateStr && (
              <div
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: 'var(--color-warm-cream)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid var(--color-deep-cherry)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-deep-cherry)' }}>
                    SELECTED DATE PREVIEW
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.2rem 0' }}>
                    {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                    Cycle Day {getDateClassification(new Date(selectedDateStr + 'T00:00:00')).cycleDay} &bull;{' '}
                    {getDateClassification(new Date(selectedDateStr + 'T00:00:00')).isPeriodDay
                      ? 'Menstrual Flow Day (High NIX Stick need)'
                      : getDateClassification(new Date(selectedDateStr + 'T00:00:00')).isOvulation
                      ? 'Estimated Ovulation Day'
                      : 'Regular Cycle Phase'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setNewLogDate(selectedDateStr);
                      setShowLogModal(true);
                    }}
                  >
                    <Plus size={14} /> Add Log Entry
                  </Button>
                  <button
                    onClick={() => setSelectedDateStr(null)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      fontSize: '0.8rem',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------------
              SECTION: 4 PHASES STAIN PREPAREDNESS GUIDE
              -------------------------------------------------------------------- */}
          <div style={{ marginBottom: '4rem' }}>
            <SectionHeading
              eyebrow="STAIN PREPAREDNESS BY PHASE"
              title="How your cycle impacts your clothes."
              subtitle="Understand when stains are most likely and how to keep NIX ready."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  phase: 'Phase 1: Menstrual',
                  days: 'Days 1 – 5',
                  risk: 'HIGH RISK (85%)',
                  icon: Droplet,
                  color: 'var(--color-deep-cherry)',
                  advice: 'Heavy to moderate flow. Unexpected leaks happen during sitting or active movement.',
                  action: 'Keep NIX Stick in front pocket or main tote bag section.',
                },
                {
                  phase: 'Phase 2: Follicular',
                  days: 'Days 6 – 13',
                  risk: 'LOW RISK (5%)',
                  icon: CheckCircle2,
                  color: '#2e7d32',
                  advice: 'Estrogen rises; energy is high. Ideal time for wearing white trousers & silk dresses.',
                  action: 'Inspect your NIX Stick & restock your backup stick.',
                },
                {
                  phase: 'Phase 3: Ovulatory',
                  days: 'Days 14 – 16',
                  risk: 'MODERATE RISK (30%)',
                  icon: Sparkles,
                  color: '#9c27b0',
                  advice: 'Peak fertility window. ~15% of women experience mild mid-cycle spotting.',
                  action: 'Carry NIX Stick in your handbag for unexpected light spotting.',
                },
                {
                  phase: 'Phase 4: Luteal',
                  days: 'Days 17 – 28',
                  risk: 'MODERATE-HIGH (60%)',
                  icon: AlertCircle,
                  color: '#e65100',
                  advice: 'PMS symptoms & pre-period spotting. Unexpected early period start is common.',
                  action: 'Check NIX Stick volume level and set period reminders.',
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-cream-card)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.75rem',
                      border: '1px solid var(--color-cocoa-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.color, textTransform: 'uppercase' }}>
                          {item.days}
                        </span>
                        <IconComponent size={20} color={item.color} />
                      </div>

                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.phase}</h3>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: 'var(--color-warm-cream)',
                          color: item.color,
                          display: 'inline-block',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-pill)',
                          marginBottom: '1rem',
                        }}
                      >
                        {item.risk}
                      </div>

                      <p style={{ fontSize: '0.88rem', opacity: 0.85, marginBottom: '1rem' }}>{item.advice}</p>
                    </div>

                    <div
                      style={{
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--color-cocoa-light)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-deep-cherry)',
                      }}
                    >
                      💡 <strong>NIX Action:</strong> {item.action}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------------
              SECTION: ANNUAL STAIN SAVER CALCULATOR & RECOMMENDED BUNDLE
              -------------------------------------------------------------------- */}
          <div
            style={{
              backgroundColor: 'var(--color-soft-cocoa)',
              color: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem 2.5rem',
              marginBottom: '4rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-dusty-blush)' }}>
                ANNUAL PREPAREDNESS CALCULATOR
              </span>
              <h2 style={{ color: 'var(--color-warm-cream)', marginBottom: '1rem' }}>
                Your Stain Risk Footprint
              </h2>
              <p style={{ color: 'rgba(248, 240, 227, 0.85)', fontSize: '1.05rem', marginBottom: '1.75rem' }}>
                Based on your {cycleLength}-day cycle and {periodLength}-day period, here is what your year looks like:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(248, 240, 227, 0.08)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-editorial)', color: 'var(--color-dusty-blush)' }}>
                    ~{Math.round(365 / cycleLength)}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Cycles per Year</div>
                </div>

                <div style={{ backgroundColor: 'rgba(248, 240, 227, 0.08)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-editorial)', color: 'var(--color-dusty-blush)' }}>
                    ~{Math.round((365 / cycleLength) * periodLength)}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Peak Stain Risk Days</div>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                ✨ <strong>Estimated clothes saved:</strong> NIX users report saving 4–6 favorite garments per year from permanent stain setting.
              </div>
            </div>

            {/* Smart Bundle Offer */}
            <div
              style={{
                backgroundColor: 'var(--color-warm-cream)',
                color: 'var(--color-soft-cocoa)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '2px solid var(--color-deep-cherry)',
              }}
            >
              <span className="badge badge-cherry" style={{ marginBottom: '0.75rem' }}>
                RECOMMENDED CYCLE BUNDLE
              </span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                NIX Duo Rescue Pack
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.25rem' }}>
                Includes 2x NIX 15g Pre-Treatment Sticks: 1 for your handbag/backpack + 1 for your office desk or car.
              </p>

              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-deep-cherry)', marginBottom: '1.25rem' }}>
                ₹599 <span style={{ fontSize: '0.85rem', color: 'var(--color-soft-cocoa)', textDecoration: 'line-through' }}>₹698</span>
              </div>

              <Button
                onClick={() => {
                  addToCart(2);
                  showToast('NIX Duo Rescue Pack added to your bag!');
                }}
                variant="primary"
                style={{ width: '100%' }}
              >
                <ShoppingBag size={18} /> ADD DUO BUNDLE TO BAG
              </Button>
            </div>
          </div>

          {/* --------------------------------------------------------------------
              SECTION: STAIN & CYCLE LOG HISTORY
              -------------------------------------------------------------------- */}
          <div
            style={{
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-cocoa-light)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>My Cycle & Stain Incident Log</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Log periods, symptoms, and moments NIX saved your clothes.</p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowLogModal(true)}
              >
                <Plus size={16} /> LOG NEW EVENT
              </Button>
            </div>

            {logs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', opacity: 0.7 }}>
                <Info size={32} color="var(--color-deep-cherry)" style={{ margin: '0 auto 0.5rem' }} />
                <p>No log entries yet. Click "Log New Event" above to record a period start or stain save!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {logs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      backgroundColor: 'var(--color-cream-card)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem',
                      border: '1px solid var(--color-cocoa-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: log.type === 'nix_used' ? 'var(--color-blush-soft)' : 'var(--color-deep-cherry)',
                          color: log.type === 'nix_used' ? 'var(--color-deep-cherry)' : 'var(--color-warm-cream)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1rem',
                        }}
                      >
                        {log.type === 'nix_used' ? '✨' : '🩸'}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                            {log.type === 'period_start'
                              ? 'Period Started'
                              : log.type === 'nix_used'
                              ? 'NIX Rescue Stick Used!'
                              : log.type === 'stain_incident'
                              ? 'Stain Incident'
                              : 'Symptom Note'}
                          </span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>({log.date})</span>
                          {log.flow && (
                            <span className="badge badge-blush" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                              {log.flow} Flow
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.88rem', opacity: 0.85, marginTop: '0.2rem' }}>{log.note}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      style={{ color: 'var(--color-cocoa-muted)', opacity: 0.6, cursor: 'pointer', border: 'none', background: 'none' }}
                      title="Delete log entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          LOG ENTRY MODAL
          -------------------------------------------------------------------- */}
      {showLogModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-deep-cherry)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Add Cycle & Stain Log</h3>
              <button
                onClick={() => setShowLogModal(false)}
                style={{ fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLog} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  Event Type
                </label>
                <select
                  value={newLogType}
                  onChange={(e) => setNewLogType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-cream-card)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="period_start">Period Started 🩸</option>
                  <option value="nix_used">Used NIX Rescue Stick ✨</option>
                  <option value="stain_incident">Stain Incident ⚠️</option>
                  <option value="symptom">Symptom Note 📝</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  Date
                </label>
                <input
                  type="date"
                  value={newLogDate}
                  onChange={(e) => setNewLogDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-cream-card)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                  }}
                  required
                />
              </div>

              {newLogType === 'period_start' && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    Flow Strength
                  </label>
                  <select
                    value={newLogFlow}
                    onChange={(e) => setNewLogFlow(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-cocoa-light)',
                      backgroundColor: 'var(--color-cream-card)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  Notes / What Happened?
                </label>
                <textarea
                  value={newLogNote}
                  onChange={(e) => setNewLogNote(e.target.value)}
                  placeholder="e.g. Saved white denim jacket at restaurant using NIX Stick..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    backgroundColor: 'var(--color-cream-card)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>
                  SAVE LOG ENTRY
                </Button>
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-cocoa-light)',
                    fontSize: '0.85rem',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .calendar-cell:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
        }

        /* Desktop: show long day names, hide short */
        .cal-day-long { display: inline; }
        .cal-day-short { display: none; }

        /* Desktop: full font sizes */
        .cal-day-num { font-size: 0.95rem; }
        .cal-label-text { display: inline; }

        @media (max-width: 520px) {
          /* Tighter card padding on mobile */
          .calendar-card {
            padding: 1rem !important;
          }

          /* Stack legend above nav buttons */
          .cal-controls {
            flex-direction: column;
            align-items: flex-start !important;
          }

          /* Wrap legend tightly */
          .cal-legend {
            gap: 0.5rem !important;
            font-size: 0.72rem !important;
          }

          /* Smaller gaps between cells */
          .cal-grid {
            gap: 0.2rem !important;
          }

          /* Compact empty slots */
          .cal-empty {
            min-height: 44px !important;
          }

          /* Compact day cells */
          .calendar-cell {
            min-height: 44px !important;
            padding: 0.25rem !important;
            border-radius: 6px !important;
          }

          /* Smaller day number */
          .cal-day-num {
            font-size: 0.78rem !important;
          }

          /* Hide "NOW" pill — too cramped */
          .cal-today-pill {
            display: none !important;
          }

          /* Show only emoji, hide text label */
          .cal-label-text {
            display: none !important;
          }

          /* Shrink emoji indicators */
          .cal-indicators {
            gap: 0.08rem !important;
          }
          .cal-label {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
          }

          /* Switch to 1-letter day headers */
          .cal-day-long { display: none; }
          .cal-day-short { display: inline; }
        }

        @media (max-width: 380px) {
          .calendar-cell {
            min-height: 38px !important;
          }
          .cal-day-num {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CyclePredictorPage;

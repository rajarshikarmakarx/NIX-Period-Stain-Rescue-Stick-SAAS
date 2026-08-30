import React from 'react';
import { CheckCircle, Circle, Package, Truck, Home } from 'lucide-react';
import type { OrderTimelineStep } from '../../api/types';

interface OrderTimelineProps {
  timeline: OrderTimelineStep[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ timeline }) => {
  const icons = [CheckCircle, Package, Truck, Truck, Home];

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {timeline.map((step, idx) => {
          const StepIcon = step.completed ? CheckCircle : Circle;
          const isLast = idx === timeline.length - 1;

          return (
            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: step.completed ? 'var(--color-deep-cherry)' : 'var(--color-cream-card)',
                    color: step.completed ? 'var(--color-warm-cream)' : 'var(--color-cocoa-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    border: '1px solid var(--color-cocoa-light)',
                  }}
                >
                  <StepIcon size={16} />
                </div>
                {!isLast && (
                  <div
                    style={{
                      width: '2px',
                      height: '30px',
                      backgroundColor: step.completed ? 'var(--color-deep-cherry)' : 'var(--color-cocoa-light)',
                      marginTop: '0.25rem',
                    }}
                  />
                )}
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: step.completed ? 'var(--color-soft-cocoa)' : 'var(--color-cocoa-muted)',
                    fontSize: '1rem',
                  }}
                >
                  {step.label}
                </div>
                {step.timestamp && (
                  <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.1rem' }}>
                    {step.timestamp}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Analytics-ready event tracker (PRD §36).
 * Fires structured analytics events for key D2C user interactions.
 */

export type AnalyticsEvent =
  | 'view_product'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'join_waitlist'
  | 'join_rewards'
  | 'referral_copy'
  | 'reorder'
  | 'view_note';

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] 📊 ${event}`, payload || '');
  }

  // Future integration point for GA4 / PostHog / Mixpanel
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...payload });
  }
}

export function useAnalytics() {
  return { trackEvent };
}

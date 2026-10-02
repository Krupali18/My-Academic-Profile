/**
 * Real User Monitoring (RUM) & Core Web Vitals Tracking (Phase 5)
 * Captures and transmits CLS, INP, LCP, FCP, TTFB
 */
import type { Metric } from 'web-vitals';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function initWebVitals(): void {
  if (typeof window === 'undefined') return;

  const sendToAnalytics = (metric: Metric) => {
    // Forward to Google Analytics 4 if gtag is available
    if (typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_delta: metric.delta,
      });
    }
  };

  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

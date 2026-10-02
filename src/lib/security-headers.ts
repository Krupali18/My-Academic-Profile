/**
 * Security Headers Configuration — REFERENCE ONLY
 *
 * L63 FIX: This module's applySecurityHeaders() function was dead code —
 * it was never called anywhere (there is no server-side handler in a static site).
 *
 * The actual security headers are defined and applied in vercel.json.
 * This file is kept as documentation-only reference for what the CSP contains
 * and why, so future developers understand the header decisions.
 *
 * DO NOT import applySecurityHeaders() — it has no runtime effect on Vercel deployments.
 * To modify headers, edit vercel.json → headers → Content-Security-Policy.
 *
 * Current CSP policy (matches vercel.json):
 * - default-src 'self'
 * - script-src: self + GTM + GA
 * - style-src: self + inline (for runtime CSS)
 * - font-src: self + data: (self-hosted @fontsource, no gstatic needed)
 * - img-src: self + Cloudinary + i.ytimg.com (YouTube thumbnails via facade)
 * - connect-src: self + Formspree + GA + Sentry
 * - frame-src: self + YouTube (for embedded videos)
 * - object-src: none (no Flash/plugins)
 * - base-uri: self (prevent base tag hijacking)
 * - form-action: self + Formspree
 * - upgrade-insecure-requests
 */

export const SECURITY_HEADERS_REFERENCE = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
} as const;

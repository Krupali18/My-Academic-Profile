/// <reference types="vite/client" />

/**
 * Strongly-typed environment variable declarations.
 * All VITE_* variables from .env.example are listed here.
 * Non-VITE_ variables are server-only and must NOT be accessed client-side.
 */
interface ImportMetaEnv {
  /** Cloudinary cloud name for media uploads */
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  /** Cloudinary unsigned upload preset */
  readonly VITE_CLOUDINARY_PRESET?: string;
  /** Public site URL (e.g. https://krupalidonda.com) */
  readonly VITE_SITE_URL?: string;
  /** Additional allowed CORS origins (comma-separated) */
  readonly VITE_CORS_ALLOWED_ORIGINS?: string;
  /** Google Analytics 4 Measurement ID */
  readonly VITE_GA_ID?: string;
  /** Google Tag Manager ID */
  readonly VITE_GTM_ID?: string;
  /** Cloudflare Turnstile CAPTCHA site key */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Sentry DSN for client error tracking */
  readonly VITE_SENTRY_DSN?: string;
  /** Set to 'true' to enable Rollup bundle analysis at build time */
  readonly VITE_ANALYZE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

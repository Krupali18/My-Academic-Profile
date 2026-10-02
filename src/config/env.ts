export const env = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://krupalidonda.com',
  cloudinaryCloud: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  gaId: import.meta.env.VITE_GA_ID || '',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
};

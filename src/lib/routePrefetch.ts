import { preloadGroupImages } from './preloadGroupImages';

// Route loader map for background prefetching
export const routeLoaders = {
  about: () => import('@/pages/AboutPage'),
  research: () => import('@/pages/ResearchPage'),
  teaching: () => import('@/pages/TeachingPage'),
  group: () => import('@/pages/GroupPage'),
  honors: () => import('@/pages/HonorsPage'),
  publications: () => import('@/pages/PublicationsPage'),
  newsOutreach: () => import('@/pages/NewsOutreachPage'),
  gallery: () => import('@/pages/GalleryPage'),
  contact: () => import('@/pages/ContactPage'),
  notFound: () => import('@/pages/NotFoundPage'),
};

export type RouteKey = keyof typeof routeLoaders;

/**
 * Prefetch all routes in the background during idle time so page switching
 * is instantaneous with 0ms delay, even on slow or offline connections.
 */
export const prefetchAllRoutes = (): void => {
  if (typeof window === 'undefined') return;
  Object.values(routeLoaders).forEach((loader) => {
    try {
      loader();
    } catch {
      // Background prefetch is non-critical
    }
  });

  // Preload group images in idle background so Group page has zero image lag
  preloadGroupImages();
};

/**
 * Prefetch an individual route on hover / touchstart
 */
export const prefetchRoute = (key: RouteKey): void => {
  if (routeLoaders[key]) {
    try {
      routeLoaders[key]();
      if (key === 'group') {
        preloadGroupImages();
      }
    } catch {
      // Safe no-op
    }
  }
};

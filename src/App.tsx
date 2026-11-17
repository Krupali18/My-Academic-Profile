import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { SiteProvider } from '@/context/SiteContext';
import { GlobalScrollReveal } from '@/hooks/useGlobalScrollReveal';
import { useImageProtection } from '@/hooks/useImageProtection';
import { preloadGroupImages } from '@/lib/preloadGroupImages';

// Eager: Critical above-the-fold page — loads immediately with zero delay
import HomePage from '@/pages/HomePage';

// Route loader map for background prefetching
export const routeLoaders = {
  about: () => import('@/pages/AboutPage'),
  research: () => import('@/pages/ResearchPage'),
  teaching: () => import('@/pages/TeachingPage'),
  group: () => import('@/pages/GroupPage'),
  honors: () => import('@/pages/HonorsPage'),
  publications: () => import('@/pages/PublicationsPage'),
  talks: () => import('@/pages/TalksPage'),
  service: () => import('@/pages/ServicePage'),
  newsOutreach: () => import('@/pages/NewsOutreachPage'),
  gallery: () => import('@/pages/GalleryPage'),
  contact: () => import('@/pages/ContactPage'),
  notFound: () => import('@/pages/NotFoundPage'),
};

// Lazy: Dynamic components powered by the route loaders
const AboutPage = lazy(routeLoaders.about);
const ResearchPage = lazy(routeLoaders.research);
const TeachingPage = lazy(routeLoaders.teaching);
const GroupPage = lazy(routeLoaders.group);
const HonorsPage = lazy(routeLoaders.honors);
const PublicationsPage = lazy(routeLoaders.publications);
const TalksPage = lazy(routeLoaders.talks);
const ServicePage = lazy(routeLoaders.service);
const NewsOutreachPage = lazy(routeLoaders.newsOutreach);
const GalleryPage = lazy(routeLoaders.gallery);
const ContactPage = lazy(routeLoaders.contact);
const NotFoundPage = lazy(routeLoaders.notFound);

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
export const prefetchRoute = (key: keyof typeof routeLoaders): void => {
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

// Page loading fallback — neutral background, seamless if ever shown
const PageFallback: React.FC = () => (
  <div style={{ minHeight: '100vh', background: '#ffffff' }} aria-hidden="true" />
);

export const App: React.FC = () => {
  // Global image right-click & drag protection
  useImageProtection();

  // Background prefetch all page chunks during idle time after initial render
  useEffect(() => {
    const schedulePrefetch = () => {
      prefetchAllRoutes();
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(schedulePrefetch, { timeout: 2000 });
      } else {
        setTimeout(schedulePrefetch, 1000);
      }
    }
  }, []);

  return (
    <HelmetProvider>
      <SiteProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <ScrollToTop />
            <GlobalScrollReveal />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Canonical public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/teaching" element={<TeachingPage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/honors" element={<HonorsPage />} />
                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/talks" element={<TalksPage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/news-outreach" element={<NewsOutreachPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Legacy .html URL redirects */}
                <Route path="/index.html" element={<Navigate to="/" replace />} />
                <Route path="/about.html" element={<Navigate to="/about" replace />} />
                <Route path="/research.html" element={<Navigate to="/research" replace />} />
                <Route path="/teaching.html" element={<Navigate to="/teaching" replace />} />
                <Route path="/group.html" element={<Navigate to="/group" replace />} />
                <Route path="/honors.html" element={<Navigate to="/honors" replace />} />
                <Route path="/publications.html" element={<Navigate to="/publications" replace />} />
                <Route path="/talks.html" element={<Navigate to="/talks" replace />} />
                <Route path="/service.html" element={<Navigate to="/service" replace />} />
                <Route path="/news-outreach.html" element={<Navigate to="/news-outreach" replace />} />
                <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
                <Route path="/contact.html" element={<Navigate to="/contact" replace />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </SiteProvider>
    </HelmetProvider>
  );
};

export default App;

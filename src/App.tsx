import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { SiteProvider } from '@/context/SiteContext';
import { GlobalScrollReveal } from '@/hooks/useGlobalScrollReveal';

// Direct synchronous import for HomePage so the landing page loads instantly with zero delay
import HomePage from '@/pages/HomePage';

// Lazy-loaded secondary route chunks (Playbook Tier 2.1: Route code-splitting)
// Cuts initial bundle execution by >50%, eliminating unused JS from home page critical path
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ResearchPage = lazy(() => import('@/pages/ResearchPage'));
const TeachingPage = lazy(() => import('@/pages/TeachingPage'));
const GroupPage = lazy(() => import('@/pages/GroupPage'));
const HonorsPage = lazy(() => import('@/pages/HonorsPage'));
const PublicationsPage = lazy(() => import('@/pages/PublicationsPage'));
const TalksPage = lazy(() => import('@/pages/TalksPage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));
const NewsOutreachPage = lazy(() => import('@/pages/NewsOutreachPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Clean fallback with reserved height to prevent CLS
const RouteFallback: React.FC = () => (
  <div style={{ minHeight: '60vh' }} aria-hidden="true" />
);

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SiteProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <ScrollToTop />
            <GlobalScrollReveal />
            <Suspense fallback={<RouteFallback />}>
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

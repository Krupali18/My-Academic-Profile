import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { SiteProvider } from '@/context/SiteContext';
import { GlobalScrollReveal } from '@/hooks/useGlobalScrollReveal';

// Direct imports for zero-latency, instant page transitions without Suspense pauses or blank flashes
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ResearchPage from '@/pages/ResearchPage';
import TeachingPage from '@/pages/TeachingPage';
import GroupPage from '@/pages/GroupPage';
import HonorsPage from '@/pages/HonorsPage';
import PublicationsPage from '@/pages/PublicationsPage';
import TalksPage from '@/pages/TalksPage';
import ServicePage from '@/pages/ServicePage';
import NewsOutreachPage from '@/pages/NewsOutreachPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SiteProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <ScrollToTop />
            <GlobalScrollReveal />
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
          </ErrorBoundary>
        </BrowserRouter>
      </SiteProvider>
    </HelmetProvider>
  );
};

export default App;

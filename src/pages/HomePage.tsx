import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/seo.config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { HomeAboutSection } from '@/components/home/HomeAboutSection';
import { AcademicIntro } from '@/components/home/AcademicIntro';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const HomePage: React.FC = () => {
  const seo = seoConfig.home;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        {/* H19 FIX: og:type="profile" for personal academic profile, og:site_name added */}
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Dr. Krupali Donda" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={seo.ogUrl} />
        <meta name="twitter:card" content={seo.twitterCard} />
        <meta name="twitter:site" content="@krupalidonda" />
        <meta name="twitter:title" content={seo.twitterTitle} />
        <meta name="twitter:description" content={seo.twitterDescription} />
        <meta name="twitter:image" content={seo.twitterImage} />
        {seo.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
          />
        )}
      </Helmet>

      {/* M50 FIX: No location.key prop — removing it prevents AcademicIntro from remounting on every navigation */}
      <AcademicIntro />

      <main className="main-content" id="main-content">
        <Header />
        {/* H14 FIX: Wrap sections in SectionErrorBoundary so crashes don't blank the entire page */}
        <SectionErrorBoundary sectionName="HeroBanner">
          <HeroBanner />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="HomeAbout">
          <HomeAboutSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;

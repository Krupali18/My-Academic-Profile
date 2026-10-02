import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { TalksTimelineSection } from '@/components/talks/TalksTimelineSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const TalksPage: React.FC = () => {
  const seo = seoConfig.talks;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Invited Talks &amp; Seminars" />
        <SectionErrorBoundary sectionName="TalksTimeline">
          <TalksTimelineSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default TalksPage;

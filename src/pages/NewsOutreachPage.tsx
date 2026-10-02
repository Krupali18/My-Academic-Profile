import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { NewsOutreachSection } from '@/components/news/NewsOutreachSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const NewsOutreachPage: React.FC = () => {
  const seo = seoConfig.newsOutreach;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="News &amp; Outreach" />
        <SectionErrorBoundary sectionName="NewsOutreach">
          <NewsOutreachSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default NewsOutreachPage;

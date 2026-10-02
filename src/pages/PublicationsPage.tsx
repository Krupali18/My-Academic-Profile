import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { PublicationsListSection } from '@/components/publications/PublicationsListSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const PublicationsPage: React.FC = () => {
  const seo = seoConfig.publications;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Publications" />
        <SectionErrorBoundary sectionName="Publications">
          <PublicationsListSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default PublicationsPage;

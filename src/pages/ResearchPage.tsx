import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ResearchGallerySection } from '@/components/research/ResearchGallerySection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const ResearchPage: React.FC = () => {
  const seo = seoConfig.research;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Research" />
        <SectionErrorBoundary sectionName="ResearchGallery">
          <ResearchGallerySection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default ResearchPage;

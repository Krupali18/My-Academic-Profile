import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { GalleryShowcaseSection } from '@/components/gallery/GalleryShowcaseSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const GalleryPage: React.FC = () => {
  const seo = seoConfig.gallery;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Photos &amp; Video Gallery" />
        <SectionErrorBoundary sectionName="GalleryShowcase">
          <GalleryShowcaseSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default GalleryPage;

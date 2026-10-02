import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { HonorsFeatureGrid } from '@/components/honors/HonorsFeatureGrid';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const HonorsPage: React.FC = () => {
  const seo = seoConfig.honors;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Honours & Recognition" />
        <SectionErrorBoundary sectionName="HonorsGrid">
          <HonorsFeatureGrid />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default HonorsPage;

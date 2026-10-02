import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ServiceCardsSection } from '@/components/service/ServiceCardsSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const ServicePage: React.FC = () => {
  const seo = seoConfig.service;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Volunteering &amp; Service" />
        <SectionErrorBoundary sectionName="ServiceCards">
          <ServiceCardsSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default ServicePage;

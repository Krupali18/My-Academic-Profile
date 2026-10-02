import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { StackSpreadSection } from '@/components/about/StackSpreadSection';
import { AboutNarrativeSection } from '@/components/about/AboutNarrativeSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const AboutPage: React.FC = () => {
  const seo = seoConfig.about;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="About" />
        <SectionErrorBoundary sectionName="StackSpread">
          <StackSpreadSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutNarrative">
          <AboutNarrativeSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;

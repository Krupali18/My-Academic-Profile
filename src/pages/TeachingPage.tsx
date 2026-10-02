import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { TeachingScheduleSection } from '@/components/teaching/TeachingScheduleSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const TeachingPage: React.FC = () => {
  const seo = seoConfig.teaching;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Teaching" />
        <SectionErrorBoundary sectionName="TeachingSchedule">
          <TeachingScheduleSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default TeachingPage;

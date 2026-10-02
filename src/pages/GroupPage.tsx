import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { GroupSection } from '@/components/group/GroupSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const GroupPage: React.FC = () => {
  const seo = seoConfig.group;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Research Group" />
        <SectionErrorBoundary sectionName="GroupSection">
          <GroupSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default GroupPage;

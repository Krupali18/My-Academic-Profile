import React from 'react';
import { seoConfig } from '@/seo.config';
import { PageSeoHelmet } from '@/components/seo/PageSeoHelmet';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactSection } from '@/components/contact/ContactSection';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';

export const ContactPage: React.FC = () => {
  const seo = seoConfig.contact;

  return (
    <>
      <PageSeoHelmet seo={seo} />

      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <PageHeader title="Get in Touch" />
        <SectionErrorBoundary sectionName="Contact">
          <ContactSection />
        </SectionErrorBoundary>
        <Footer />
      </main>
    </>
  );
};

export default ContactPage;

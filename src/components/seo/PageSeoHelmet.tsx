import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { PageSeoConfig } from '@/seo.config';

interface PageSeoHelmetProps {
  seo: PageSeoConfig;
}

/**
 * PageSeoHelmet — Renders all required SEO meta tags for a page in one place.
 *
 * CRITICAL: react-helmet-async requires dangerouslySetInnerHTML for <script> content.
 * Using JSX expression children ({JSON.stringify(...)}) inside Helmet <script> tags
 * causes a silent rendering failure that prevents the entire page from mounting.
 */
export const PageSeoHelmet: React.FC<PageSeoHelmetProps> = ({ seo }) => {
  const jsonLdItems = Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd ? [seo.jsonLd] : [];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.robots && <meta name="robots" content={seo.robots} />}
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dr. Krupali Donda" />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={seo.ogUrl} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:site" content="@krupalidonda" />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      <meta name="twitter:image" content={seo.twitterImage} />

      {/* JSON-LD: must use dangerouslySetInnerHTML — JSX children not supported in Helmet scripts */}
      {jsonLdItems.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Helmet>
  );
};

export default PageSeoHelmet;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { PageSeoConfig } from '@/seo.config';

interface PageSeoHelmetProps {
  seo: PageSeoConfig;
}

/**
 * PageSeoHelmet — Renders all required SEO meta tags for a page in one place.
 *
 * NOTE: react-helmet-async manages <script type="application/ld+json"> using string
 * children ({JSON.stringify(...)}), rendering <script data-rh="true" type="application/ld+json">...</script>.
 */
export const PageSeoHelmet: React.FC<PageSeoHelmetProps> = ({ seo }) => {
  if (!seo) return null;
  const jsonLdItems = Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd ? [seo.jsonLd] : [];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {/* SEO-09 FIX: author meta tag for academic search engine attribution */}
      <meta name="author" content="Dr. Krupali Donda" />
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
      {/* SEO-05 FIX: og:image:alt required for accessibility and social platform validators */}
      {seo.ogImageAlt && <meta property="og:image:alt" content={seo.ogImageAlt} />}
      <meta property="og:url" content={seo.ogUrl} />

      {/* Twitter / X Card */}
      {/* SEO-06 FIX: Removed twitter:site — unverified @krupalidonda handle; absent is better than wrong */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      <meta name="twitter:image" content={seo.twitterImage} />
      {seo.ogImageAlt && <meta name="twitter:image:alt" content={seo.ogImageAlt} />}

      {/* JSON-LD Structured Data: react-helmet-async expects string children */}
      {jsonLdItems.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default PageSeoHelmet;

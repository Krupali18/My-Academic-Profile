import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    let meta = document.querySelector('meta[name="robots"]');
    const created = !meta;
    const prevContent = meta ? meta.getAttribute('content') : null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    document.title = 'Page not found | Dr. Krupali Donda';
    meta.setAttribute('content', 'noindex, follow');

    return () => {
      document.title = prevTitle;
      if (created) {
        meta?.remove();
      } else if (prevContent) {
        meta?.setAttribute('content', prevContent);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Page not found | Dr. Krupali Donda</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Header solidOnMount />
      <main className="main-content" id="main-content">
        <div className="nf-wrap">
          <svg className="nf-art" viewBox="0 0 230 162" aria-hidden="true" focusable="false">
            <g fill="var(--nf-blob)">
              <ellipse cx="115" cy="104" rx="72" ry="38" />
              <circle cx="98" cy="68" r="34" />
              <circle cx="142" cy="76" r="30" />
            </g>
            <ellipse cx="111" cy="152" rx="40" ry="5" fill="var(--nf-shadow)" />
            <g
              className="nf-doc"
              fill="none"
              stroke="var(--nf-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path fill="#fff" d="M82 36H126L148 58V134a8 8 0 0 1-8 8H82a8 8 0 0 1-8-8V44a8 8 0 0 1 8-8Z" />
              <path d="M126 36V58H148" />
              <path d="M99 116Q111 104 123 116" />
              <circle cx="100" cy="90" r="2.5" fill="var(--nf-ink)" stroke="none" />
              <circle cx="122" cy="90" r="2.5" fill="var(--nf-ink)" stroke="none" />
              <path d="M54 62l9 6M52 84h10M168 62l-9 6M170 84h-10" />
            </g>
          </svg>

          <h1 className="nf-title">
            <span className="nf-code">404</span>
            <span className="nf-heading">Page Not Found</span>
          </h1>
          <p className="nf-text">
            The page you’re looking for doesn’t exist or may have been moved.
            <br />
            Let’s get you back on track.
          </p>

          <Link to="/" className="nf-btn">
            Go to Homepage <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/research" className="nf-link">
            Or explore my research &rarr;
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;

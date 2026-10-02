import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Dr. Krupali Donda</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="main-content" id="main-content">
        <Header solidOnMount />
        <section className="content-section" style={{ textAlign: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span
              style={{
                fontSize: '5rem',
                fontWeight: 800,
                color: '#002E5D',
                lineHeight: 1,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              404
            </span>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111111' }}>Page Not Found</h1>
            <p style={{ color: '#707070', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="btn-primary"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#002E5D',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Return to Homepage
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default NotFoundPage;

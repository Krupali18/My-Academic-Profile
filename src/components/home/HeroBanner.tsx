import React from 'react';
import { Link } from 'react-router-dom';
import { NeuralParticles } from './NeuralParticles';
import { WaveformCanvas } from './WaveformCanvas';
import { prefetchRoute } from '@/lib/routePrefetch';

export const HeroBanner: React.FC = () => {
  return (
    <section id="index" className="hero-banner" aria-label="Hero introduction">
      <NeuralParticles />
      <WaveformCanvas />

      <div className="hero-banner-content">
        <div className="hero-banner-image reveal active">
          <picture>
            <source
              srcSet="/assets/genratedd-2-400w.avif 400w, /assets/genratedd-2-600w.avif 600w"
              sizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
              type="image/avif"
            />
            <source
              srcSet="/assets/genratedd-2-400w.webp 400w, /assets/genratedd-2-600w.webp 600w"
              sizes="(max-width: 320px) 135px, (max-width: 768px) 180px, 280px"
              type="image/webp"
            />
            <img
              src="/assets/genratedd-2-600w.webp"
              alt="Dr. Krupali Donda — Assistant Professor at Adani University"
              decoding="async"
              loading="eager"
              fetchPriority="high"
              draggable="false"
              width={280}
              height={380}
            />
          </picture>
        </div>

        <div className="hero-banner-info reveal active reveal-delay-1">
          <h1 className="hero-title">
            Krupali Donda<span />
          </h1>
          <div className="hero-details">
            <p>
              Researcher | STEM Mentor
              <br />
              AU | IIT Delhi | CNRS, France | IIT Gandhinagar
            </p>
            <p className="glimpse-link" style={{ marginTop: '15px' }}>
              Area of Research: Wave Propagation, Metamaterials, Intelligent Metasurface Design, Machine Learning
            </p>
          </div>

          <div className="hero-socials" aria-label="Social media profiles">
            <a
              href="https://www.linkedin.com/in/krupalidonda/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-bubble in"
              title="LinkedIn"
              aria-label="LinkedIn profile"
            >
              <span aria-hidden="true">in</span>
            </a>
            <a
              href="https://scholar.google.com/citations?user=JRLRYokAAAAJ&hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-bubble scholar"
              title="Google Scholar"
              aria-label="Google Scholar profile"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.4l3 .9v8h18v-8l3-.9L12 0z" />
              </svg>
            </a>
            <a
              href="https://www.researchgate.net/profile/Krupali-Donda-2?ev=hdr_xprf"
              target="_blank"
              rel="noopener noreferrer"
              className="social-bubble rg"
              title="ResearchGate"
              aria-label="ResearchGate profile"
            >
              <span aria-hidden="true">
                R<sup>G</sup>
              </span>
            </a>
            <a
              href="https://www.youtube.com/@humansineducation4511"
              target="_blank"
              rel="noopener noreferrer"
              className="social-bubble yt"
              title="YouTube"
              aria-label="YouTube channel"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.7V8.3l6.4 3.7-6.4 3.7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Link
        to="/news-outreach"
        className="hero-news-btn"
        aria-label="News &amp; Outreach"
        onMouseEnter={() => prefetchRoute('newsOutreach')}
        onTouchStart={() => prefetchRoute('newsOutreach')}
      >
        <span>News &amp; Outreach</span>
        <svg
          className="news-btn-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </section>
  );
};

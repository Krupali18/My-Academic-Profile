import React from 'react';

export const NewsOutreachSection: React.FC = () => {
  // C8 FIX: Removed window.history.replaceState() — directly mutating browser history
  // conflicts with React Router's internal navigation model and can cause URL desync.
  // Pure scroll-to is sufficient for the UX goal here.
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="news-outreach-content">
      {/* Live Animated Ticker Banner — exactly as in news-outreach.html */}
      <div className="infinite-slider-section" aria-label="Latest News Ticker">
        <div className="infinite-slider-block">
          {/* Group 1 */}
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-1')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-1'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Two Research Contributions Presented at META 2026 at Trinity College Dublin, Ireland</span>
          </div>
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-2')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-2'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Invited Talk: AI &amp; Machine Learning in Laboratory Medicine for ICMR (Organized by QCI)</span>
          </div>
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-3')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-3'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Expert Talk: From Classroom to World-Class Lab at SVNIT Surat</span>
          </div>

          {/* Group 2 (duplicate for seamless infinite loop) */}
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-1')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-1'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Two Research Contributions Presented at META 2026 at Trinity College Dublin, Ireland</span>
          </div>
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-2')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-2'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Invited Talk: AI &amp; Machine Learning in Laboratory Medicine for ICMR (Organized by QCI)</span>
          </div>
          <div
            className="banner-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo('news-item-3')}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollTo('news-item-3'); }}
          >
            <span className="banner-icon" aria-hidden="true" />
            <span>Expert Talk: From Classroom to World-Class Lab at SVNIT Surat</span>
          </div>
        </div>
      </div>

      {/* Unified Features Section using Honours Box Design Pattern */}
      <section className="content-section honors-feature-section" aria-label="News and Outreach Highlights">

        {/* Feature 1: Conference Research Presentation */}
        <div
          className="honors-feature-card reveal"
          id="news-item-1"
          data-ticker="Two Research Contributions Presented at META 2026 at Trinity College Dublin, Ireland"
        >
          <div className="honors-media">
            <div className="honors-image-frame">
              <img
                src="/assets/research%20meta.jpg"
                alt="Dr. Krupali Donda presenting research at META 2026, Trinity College Dublin, Ireland"
                decoding="async"
                loading="lazy"
              />
            </div>
            <p className="honors-caption">
              <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Trinity College Dublin, Ireland</span>
            </p>
          </div>

          <div className="honors-copy">
            <span className="honors-pill">Conference Highlight</span>
            <h2>Research Contributions Presented at META 2026, Trinity College Dublin</h2>
            <p className="honors-summary">Dr. Krupali Donda presented two research contributions at META 2026 (The 16th
              International Conference on Metamaterials, Photonic Crystals and Plasmonics) held at Trinity College Dublin,
              Ireland. Her presentations highlighted breakthroughs in AI-driven inverse design of low-frequency underwater
              acoustic metamaterial absorbers using physics-guided deep-learning architectures.</p>

            <div className="honors-meta-grid">
              <div className="honors-meta-item">
                <span className="honors-meta-label">Conference</span>
                <span className="honors-meta-value">META 2026 (16th Int'l Edition)</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Date &amp; Venue</span>
                <span className="honors-meta-value">14–17 July 2026 &bull; Dublin, Ireland</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Research Focus</span>
                <span className="honors-meta-value">Acoustic Metamaterials &amp; AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Invited Talk for ICMR & QCI */}
        <div
          className="honors-feature-card reveal"
          id="news-item-2"
          data-ticker="Invited Talk: AI &amp; Machine Learning in Laboratory Medicine for ICMR (Organized by QCI)"
        >
          <div className="honors-media">
            <div className="honors-image-frame">
              <img
                src="/assets/ai%20in%20medical.jfif"
                alt="Artificial Intelligence and Machine Learning in Laboratory Medicine — Invited talk by Dr. Krupali Donda for ICMR, organized by QCI"
                decoding="async"
                loading="lazy"
              />
            </div>
            <p className="honors-caption">
              <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span>Quality Council of India (QCI) &bull; ICMR</span>
            </p>
          </div>

          <div className="honors-copy">
            <span className="honors-pill">Invited Talk</span>
            <h2>Artificial Intelligence &amp; Machine Learning in Laboratory Medicine</h2>
            <p className="honors-summary">Dr. Krupali Donda delivered an invited talk on <em>AI and Machine Learning in
                Laboratory Medicine</em> for medical professionals of the <strong>Indian Council of Medical Research
                (ICMR)</strong>, organized by the <strong>Quality Council of India (QCI)</strong>. The session explored
              how AI is evolving from deep-learning algorithms in diagnostic medical imaging to Large Language Models
              (LLMs) and emerging agentic AI systems that support patient post-care and follow-up. Highlighting healthcare
              as a sensitive domain where overconfident AI outputs can have real clinical consequences, the discussion
              centered on responsible and informed adoption — establishing when to trust AI outputs, when to verify them,
              and ensuring human clinical judgement remains central.</p>

            <div className="honors-meta-grid">
              <div className="honors-meta-item">
                <span className="honors-meta-label">Organized By</span>
                <span className="honors-meta-value">Quality Council of India (QCI)</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Audience</span>
                <span className="honors-meta-value">ICMR Medical Professionals</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Key Focus</span>
                <span className="honors-meta-value">Responsible AI, LLMs &amp; Clinical Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Outreach Keynote & Student Mentorship */}
        <div
          className="honors-feature-card reveal"
          id="news-item-3"
          data-ticker="Expert Talk: From Classroom to World-Class Lab at SVNIT Surat"
        >
          <div className="honors-media">
            <div className="honors-image-frame">
              <img
                src="/assets/svnit-expert-talk.jpg"
                alt="Dr. Krupali Donda delivering an invited expert talk at Capestone Connect 6.0, RIAC, SVNIT Surat"
                decoding="async"
                loading="lazy"
              />
            </div>
            <p className="honors-caption">
              <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a10.97 10.97 0 01-1.25.949V13.5a.75.75 0 001.5 0v-4.1a12.02 12.02 0 004.5 1.1v4.25a.75.75 0 001.5 0V10.5c1.61 0 3.14-.38 4.5-1.1v4.1a.75.75 0 001.5 0V9a10.97 10.97 0 01-1.25-.949l2.644-1.131a1 1 0 000-1.84l-7-3zM6.5 14.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm7 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" />
              </svg>
              <span>SVNIT Surat &bull; RIAC</span>
            </p>
          </div>

          <div className="honors-copy">
            <span className="honors-pill">Outreach &amp; Mentorship</span>
            <h2>Your Journey Starts Here: From Classroom to World-Class Lab</h2>
            <p className="honors-summary">An interactive mentorship talk and expert lecture delivered for undergraduate and
              postgraduate scholars at SVNIT Surat. Dr. Donda shared practical guidance on transitioning from coursework
              to leading research in world-class laboratories, covering research skills, choosing high-impact projects,
              and preparing for global scientific collaborations.</p>

            <div className="honors-meta-grid">
              <div className="honors-meta-item">
                <span className="honors-meta-label">Initiative</span>
                <span className="honors-meta-value">Capestone Connect 6.0</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Host Institution</span>
                <span className="honors-meta-value">RIAC, SVNIT Surat</span>
              </div>
              <div className="honors-meta-item">
                <span className="honors-meta-label">Audience Focus</span>
                <span className="honors-meta-value">Student Mentorship &amp; Guidance</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default NewsOutreachSection;

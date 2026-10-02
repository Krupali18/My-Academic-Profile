import React from 'react';

export const HonorsFeatureGrid: React.FC = () => {
  return (
    <section className="content-section honors-feature-section" aria-label="Honours details">
      {/* 1. ANRF International Travel Support Grant */}
      <div
        className="honors-feature-card reveal active"
        id="honor-item-1"
        data-ticker="ANRF International Travel Support Grant (2026) — Trinity College Dublin, Ireland"
      >
        <div className="honors-media">
          <div className="honors-image-frame">
            <img
              src="/assets/ANRF%20International%20Travel%20Support%20Grant.jpeg"
              alt="META 2026 Conference Presentation supported by ANRF International Travel Support Grant"
              decoding="async"
              loading="lazy"
              width={480}
              height={320}
            />
          </div>
          <p className="honors-caption">
            <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Trinity College Dublin, Ireland</span>
          </p>
        </div>

        <div className="honors-copy">
          <span className="honors-pill">International Travel Grant</span>
          <h2>ANRF International Travel Support Grant</h2>
          <p className="honors-summary">
            Awarded the prestigious ANRF International Travel Support Grant by the Government of India in recognition of
            research excellence to present research at the 16th International Conference on Metamaterials, Photonic
            Crystals and Plasmonics (META 2026), Trinity College Dublin, Ireland.
          </p>

          <div className="honors-meta-grid" aria-label="Grant details">
            <div className="honors-meta-item">
              <span className="honors-meta-label">Granting Body</span>
              <span className="honors-meta-value">ANRF, Govt. of India</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Host &amp; Venue</span>
              <span className="honors-meta-value">Trinity College Dublin, Ireland</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Conference</span>
              <span className="honors-meta-value">META 2026 (16th Int'l Edition)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Women in Acoustics Emerging Investigator Travel Grant */}
      <div
        className="honors-feature-card reveal active"
        id="honor-item-2"
        data-ticker="Women in Acoustics Emerging Investigator Travel Grant (2025) — Honolulu, Hawaii"
      >
        <div className="honors-media">
          <div className="honors-image-frame contain-fit">
            <img
              src="/assets/ASA%20ASJ.png"
              alt="Acoustical Society of America — JASA publication abstract for Dr. Krupali Donda"
              decoding="async"
              loading="lazy"
              width={480}
              height={320}
            />
          </div>
          <p className="honors-caption">
            <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Acoustical Society of America &bull; JASA Spotlight</span>
          </p>
        </div>

        <div className="honors-copy">
          <span className="honors-pill">Emerging Investigator Award</span>
          <h2>Women in Acoustics Emerging Investigator Travel Grant</h2>
          <p className="honors-summary">
            Selected for the Women in Acoustics Emerging Investigator Travel Grant, a competitive award supporting
            emerging acousticians presenting their research at an ASA conference. The grant supported participation in
            the ASA 2025 Meeting in Honolulu, Hawaii.
          </p>

          <div className="honors-meta-grid" aria-label="Award details">
            <div className="honors-meta-item">
              <span className="honors-meta-label">Awarding Body</span>
              <span className="honors-meta-value">Acoustical Society of America (ASA)</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Meeting Venue</span>
              <span className="honors-meta-value">Honolulu, Hawaii, USA (ASA 2025)</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Recognition Focus</span>
              <span className="honors-meta-value">Women in Acoustics &bull; JASA Feature</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INSA Visiting Scientist Fellowship */}
      <div
        className="honors-feature-card reveal"
        id="honor-item-3"
        data-ticker="INSA Visiting Scientist Fellowship (2025) — Indian Institute of Technology Delhi"
      >
        <div className="honors-media">
          <div className="honors-image-frame">
            <img
              src="/assets/iit%20delhi.jpg"
              alt="Dr. Krupali Donda at the Indian Institute of Technology Delhi campus"
              decoding="async"
              loading="lazy"
              width={480}
              height={320}
            />
          </div>
          <p className="honors-caption">
            <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a10.97 10.97 0 01-1.25.949V13.5a.75.75 0 001.5 0v-4.1a12.02 12.02 0 004.5 1.1v4.25a.75.75 0 001.5 0V10.5c1.61 0 3.14-.38 4.5-1.1v4.1a.75.75 0 001.5 0V9a10.97 10.97 0 01-1.25-.949l2.644-1.131a1 1 0 000-1.84l-7-3zM6.5 14.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm7 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" />
            </svg>
            <span>Indian Institute of Technology Delhi</span>
          </p>
        </div>

        <div className="honors-copy">
          <span className="honors-pill">Visiting Fellowship</span>
          <h2>Visiting Scientist Fellowship</h2>
          <p className="honors-summary">
            Awarded the prestigious Visiting Scientist Fellowship by the Indian National Science Academy (INSA) in
            recognition of academic and research contributions, hosted at the Indian Institute of Technology Delhi (IIT
            Delhi).
          </p>

          <div className="honors-meta-grid" aria-label="Recognition details">
            <div className="honors-meta-item">
              <span className="honors-meta-label">Awarding Academy</span>
              <span className="honors-meta-value">Indian National Science Academy (INSA)</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Host Institution</span>
              <span className="honors-meta-value">IIT Delhi (2025)</span>
            </div>
            <div className="honors-meta-item">
              <span className="honors-meta-label">Field &amp; Focus</span>
              <span className="honors-meta-value">Acoustic Metamaterials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

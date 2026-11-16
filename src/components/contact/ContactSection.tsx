import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section className="content-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="sr-only">
        Contact Information
      </h2>
      <div className="contact-grid reveal active">
        {/* Contact Info */}
        <div className="contact-info-card stagger-item active">
          <h3>Contact Information</h3>

          <div className="contact-info-item">
            <div className="ci-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21c-4.5-5.2-7-8.5-7-12a7 7 0 1 1 14 0c0 3.5-2.5 6.8-7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="ci-text">
              <h4>Office Address</h4>
              <p>
                Department of ICT, Adani University
                <br />
                Shantigram, Near Vaishnodevi Circle
                <br />
                Ahmedabad – 382421, Gujarat, India
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="ci-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M3 7.5l9 6 9-6" />
              </svg>
            </div>
            <div className="ci-text">
              <h4>Email</h4>
              <p>
                <a href="mailto:krupali.donda@adaniuni.ac.in">krupali.donda@adaniuni.ac.in</a>
                <br />
                <a href="mailto:krupalip18@gmail.com">krupalip18@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="ci-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div className="ci-text">
              <h4>LinkedIn</h4>
              <p>
                <a href="https://www.linkedin.com/in/krupalidonda/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/krupalidonda
                </a>
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="ci-icon" aria-hidden="true">
              <span className="rg-badge-text">
                R<sup>G</sup>
              </span>
            </div>
            <div className="ci-text">
              <h4>ResearchGate</h4>
              <p>
                <a
                  href="https://www.researchgate.net/profile/Krupali-Donda-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  researchgate.net/profile/Krupali-Donda-2
                </a>
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="ci-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.4l3 .9v8h18v-8l3-.9L12 0z" />
              </svg>
            </div>
            <div className="ci-text">
              <h4>Google Scholar</h4>
              <p>
                <a
                  href="https://scholar.google.com/citations?user=JRLRYokAAAAJ&hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Publications
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Map / Location */}
        <div className="contact-map stagger-item active">
          <div className="map-placeholder">
            <div className="map-icon" aria-hidden="true">
              <svg
                className="map-svg-icon"
                viewBox="0 0 64 64"
                width="56"
                height="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 14l17-6 18 6 17-6v42l-17 6-18-6-17 6V14z" fill="rgba(0, 46, 93, 0.08)" stroke="#002E5D" />
                <line x1="23" y1="8" x2="23" y2="50" stroke="#002E5D" strokeDasharray="3 3" />
                <line x1="41" y1="14" x2="41" y2="56" stroke="#002E5D" strokeDasharray="3 3" />
                <path
                  d="M32 17c-3.5 0-6.2 2.7-6.2 6.2 0 4.8 6.2 12.8 6.2 12.8s6.2-8 6.2-12.8c0-3.5-2.7-6.2-6.2-6.2z"
                  fill="#002E5D"
                  stroke="#002E5D"
                />
                <circle cx="32" cy="23.2" r="2.2" fill="#ffffff" />
              </svg>
            </div>
            <p>
              <strong>Adani University</strong>
            </p>
            <p>
              Shantigram, Nr. Vaishnodevi Circle,
              <br />
              S.G. Highway, Ahmedabad – 382421
            </p>
            <br />
            <a
              href="https://maps.google.com/?q=Adani+University+Ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary map-btn"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

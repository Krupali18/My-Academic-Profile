import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <p className="footer-text">Let's push the frontiers of science together.</p>
      <nav className="footer-icons" aria-label="Social media links">
        <a
          href="https://www.linkedin.com/in/krupalidonda/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon linkedin"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <span aria-hidden="true">in</span>
        </a>
        <a
          href="https://scholar.google.com/citations?user=JRLRYokAAAAJ&hl=fr"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon scholar"
          aria-label="Google Scholar"
          title="Google Scholar"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.4l3 .9v8h18v-8l3-.9L12 0z" />
          </svg>
        </a>
        <a
          href="https://www.researchgate.net/profile/Krupali-Donda-2?ev=hdr_xprf"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon rg"
          aria-label="ResearchGate"
          title="ResearchGate"
        >
          <span aria-hidden="true">
            R<sup>G</sup>
          </span>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;


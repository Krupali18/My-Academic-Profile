import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStickyHeader } from '@/hooks/useStickyHeader';
import { useSite } from '@/context/SiteContext';

export interface HeaderProps {
  solidOnMount?: boolean;
}

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/teaching', label: 'Teaching' },
  { to: '/group', label: 'Group' },
  { to: '/honors', label: 'Honours' },
  { to: '/publications', label: 'Publications' },
  { to: '/news-outreach', label: 'News & Outreach' },
  { to: '/gallery', label: 'Gallery' },
];

export const Header: React.FC<HeaderProps> = ({ solidOnMount }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isScrolled } = useStickyHeader(10, 8);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useSite();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Sync body class for mobile menu scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [mobileMenuOpen]);

  // Keyboard escape listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isSolid = !isHomePage || solidOnMount;

  const navClass = [
    'o_header_standard',
    isSolid
      ? 'navbar-solid bg-black'
      : isScrolled
        ? 'ad-scrolled bg-black'
        : 'bg-transparent',
    isScrolled && isSolid ? 'ad-scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.header
      id="top"
      className={navClass}
      role="banner"
      initial={false}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* M47 FIX: Skip link must be visible on focus per WCAG 2.4.1 — was always sr-only (hidden even on focus) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-blue-800 focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <nav className="ad_navbar" aria-label="Primary navigation">
        <div className="container-fluid">
          <Link
            to="/"
            className="ad_brand_logo"
            id="site-nav-brand"
            aria-label="Dr. Krupali Donda — Home"
          >
            Dr. Krupali Donda
          </Link>

          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation"
            aria-controls="nav-links"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <div
            className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}
            id="nav-links"
            aria-hidden={isMobile && !mobileMenuOpen}
            role={mobileMenuOpen ? 'dialog' : undefined}
            aria-label={mobileMenuOpen ? 'Mobile navigation menu' : undefined}
          >
            <ul className="navbar-nav">
              {NAV_LINKS.map((item) => (
                <li key={item.to} style={{ position: 'relative' }}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `ad_nav_link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeNavPill"
                            className="nav-active-pill"
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/contact"
                  className="ad_nav_link mobile-contact-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <motion.div
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link to="/contact" className="ad_nav_link contact-btn">
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;

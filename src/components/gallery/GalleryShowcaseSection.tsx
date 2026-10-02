import React, { useState, useEffect } from 'react';

interface GalleryPhoto {
  src: string;
  alt: string;
  objectPosition?: string;
}

const showcasePhotos: GalleryPhoto[] = [
  {
    src: '/assets/gallary/image 1.jpeg',
    alt: 'Research lab mentorship and computational session',
  },
  {
    src: '/assets/gallary/image 2.jpeg',
    alt: 'Research group get-together and fellowship',
  },
  {
    src: '/assets/gallary/image 3.jpg',
    alt: 'Research group members on campus',
    objectPosition: 'center 65%',
  },
  {
    src: '/assets/gallary/image 4.jpeg',
    alt: 'META 2026 Conference with Prof. Ortwin Hess',
    objectPosition: 'center 25%',
  },
  {
    src: '/assets/gallary/image 5.jpeg',
    alt: 'META 2026 Presentation Auditorium',
    objectPosition: 'center 25%',
  },
];

export const GalleryShowcaseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcasePhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + showcasePhotos.length) % showcasePhotos.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % showcasePhotos.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="gallery-hero-section" aria-label="Featured Showcase Slideshow">
        <div className="gallery-hero-container">
          <div className="showcase-header showcase-header-minimal">
            <div className="showcase-controls-top">
              <button
                type="button"
                className="slider-play-btn"
                id="showcase-play-toggle"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                <span id="play-pause-icon">{isPlaying ? '⏸' : '▶'}</span>
                <span id="play-pause-label">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <span className="slider-counter" id="showcase-counter">
                {currentIndex + 1} / {showcasePhotos.length}
              </span>
            </div>
          </div>

          {/* Main Showcase Stage */}
          <div
            className="showcase-viewer"
            id="showcase-viewer"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured photos carousel"
          >
            {showcasePhotos.map((photo, idx) => (
              <div
                key={photo.src}
                className={`showcase-slide ${idx === currentIndex ? 'active' : ''}`}
                data-index={idx}
                style={{ cursor: 'pointer' }}
                onClick={() => openLightbox(idx)}
              >
                <div
                  className="showcase-bg-blur"
                  style={{ backgroundImage: `url('${photo.src}')` }}
                  aria-hidden="true"
                />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="showcase-img"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="showcase-zoom-hint" aria-hidden="true" title="Click to expand">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                </div>
              </div>
            ))}

            {/* Navigation Arrow Controls */}
            <button
              type="button"
              className="showcase-nav-btn showcase-nav-prev"
              id="showcase-prev-btn"
              aria-label="Previous slide"
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + showcasePhotos.length) % showcasePhotos.length)
              }
            >
              ‹
            </button>
            <button
              type="button"
              className="showcase-nav-btn showcase-nav-next"
              id="showcase-next-btn"
              aria-label="Next slide"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % showcasePhotos.length)}
            >
              ›
            </button>
          </div>

          {/* Interactive Thumbnail Strip */}
          <div className="showcase-thumbs" id="showcase-thumbs" role="tablist" aria-label="Select slide">
            {showcasePhotos.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                className={`thumb-item ${idx === currentIndex ? 'active' : ''}`}
                data-target={idx}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Show Photo ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={photo.src} alt={`Photo ${idx + 1}`} loading="lazy" style={{ objectPosition: photo.objectPosition }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-modal open"
          id="lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox-header lightbox-header-pure">
            <button
              type="button"
              className="lightbox-btn close-btn"
              id="lightbox-close-btn"
              aria-label="Close fullscreen view"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-arrow lightbox-prev"
              id="lightbox-prev-btn"
              aria-label="Previous image"
              onClick={() =>
                setLightboxIndex((prev) => (prev - 1 + showcasePhotos.length) % showcasePhotos.length)
              }
            >
              ‹
            </button>
            <div className="lightbox-img-wrapper">
              <img
                src={showcasePhotos[lightboxIndex].src}
                alt={showcasePhotos[lightboxIndex].alt}
                className="lightbox-main-img"
                id="lightbox-img"
              />
            </div>
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              id="lightbox-next-btn"
              aria-label="Next image"
              onClick={() => setLightboxIndex((prev) => (prev + 1) % showcasePhotos.length)}
            >
              ›
            </button>
          </div>

          <div className="lightbox-bottom-bar lightbox-bottom-pure" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-thumbs-scroll" id="lightbox-thumbs-list" role="tablist">
              {showcasePhotos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`lightbox-thumb-btn ${i === lightboxIndex ? 'active' : ''}`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Jump to slide ${i + 1}`}
                >
                  <img src={photo.src} alt={`Thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

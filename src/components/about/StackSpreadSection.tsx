import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CardData {
  id: number;
  idx: string;
  title: string;
  src: string;
  modalSrc: string;
  stackOffset: { x: number; y: number };
  stackRotate: number;
  target: { x: number; y: number; rotate: number; scale: number; w: number; h: number };
  targetSm: { x: number; y: number; rotate: number; scale: number };
  z: number;
}

// 14 Curated Pure-Image Cards — Perfectly Distributed around 16:9 Viewport
// Desktop: 4 Top Arc, 3 Right Flank, 4 Bottom Arc, 3 Left Flank
// Mobile: 7 Top Arc (y ≈ -25vh to -37vh), 7 Bottom Arc (y ≈ +25vh to +37vh)
// Perfectly leaves the vertical center (-16vh to +16vh) 100% clear for the Tagore quote
const CARDS_DATA: CardData[] = [
  // ── TOP ARC (7 cards above quote on mobile) ───────────────────
  {
    id: 0,
    idx: '01',
    title: 'Campus Moments',
    src: '/assets/about-gallery/card_01.jpg',
    modalSrc: '/assets/about-gallery/modal_01.jpg',
    stackOffset: { x: -5, y: -6 },
    stackRotate: -12,
    target: { x: -38, y: -34, rotate: -2.2, scale: 0.9, w: 15, h: 21 },
    targetSm: { x: -32, y: -26, rotate: -7, scale: 0.8 },
    z: 2,
  },
  {
    id: 1,
    idx: '02',
    title: 'CNRS Nancy Cohort',
    src: '/assets/about-gallery/card_02.jpg',
    modalSrc: '/assets/about-gallery/modal_02.jpg',
    stackOffset: { x: 4, y: -7 },
    stackRotate: 10,
    target: { x: -19, y: -35.5, rotate: 1.4, scale: 0.9, w: 15.5, h: 21 },
    targetSm: { x: -21, y: -36, rotate: 5, scale: 0.83 },
    z: 3,
  },
  {
    id: 2,
    idx: '03',
    title: 'Parc de la Pépinière Walk',
    src: '/assets/about-gallery/card_03.jpg',
    modalSrc: '/assets/about-gallery/modal_03.jpg',
    stackOffset: { x: -2, y: -4 },
    stackRotate: -5,
    target: { x: 0, y: -36, rotate: -1.0, scale: 0.9, w: 15.5, h: 21 },
    targetSm: { x: -11, y: -25, rotate: -3, scale: 0.8 },
    z: 4,
  },
  {
    id: 3,
    idx: '04',
    title: 'Laboratory Collaboration',
    src: '/assets/about-gallery/card_04.jpg',
    modalSrc: '/assets/about-gallery/modal_04.jpg',
    stackOffset: { x: 6, y: -2 },
    stackRotate: 13,
    target: { x: 19, y: -35.5, rotate: 1.8, scale: 0.9, w: 15, h: 21 },
    targetSm: { x: 0, y: -37, rotate: 2, scale: 0.84 },
    z: 5,
  },
  {
    id: 4,
    idx: '05',
    title: 'Historic French Architecture',
    src: '/assets/about-gallery/card_05.jpg',
    modalSrc: '/assets/about-gallery/modal_05.jpg',
    stackOffset: { x: -6, y: 2 },
    stackRotate: -9,
    target: { x: 38, y: -34, rotate: -2.2, scale: 0.9, w: 14.5, h: 22 },
    targetSm: { x: 11, y: -25, rotate: -4, scale: 0.8 },
    z: 6,
  },
  {
    id: 5,
    idx: '06',
    title: 'Aerospace Symposium',
    src: '/assets/about-gallery/card_06.jpg',
    modalSrc: '/assets/about-gallery/modal_06.jpg',
    stackOffset: { x: 5, y: 4 },
    stackRotate: 7,
    target: { x: 40.5, y: -13, rotate: 2.0, scale: 0.9, w: 16, h: 20 },
    targetSm: { x: 21, y: -36, rotate: 5, scale: 0.83 },
    z: 7,
  },
  {
    id: 6,
    idx: '07',
    title: 'Metasurface Testing',
    src: '/assets/about-gallery/card_07.jpg',
    modalSrc: '/assets/about-gallery/modal_07.jpg',
    stackOffset: { x: -4, y: 6 },
    stackRotate: -13,
    target: { x: 40.5, y: 13, rotate: -2.0, scale: 0.9, w: 15, h: 21 },
    targetSm: { x: 32, y: -26, rotate: -6, scale: 0.8 },
    z: 8,
  },

  // ── BOTTOM ARC (7 cards below quote on mobile) ────────────────
  {
    id: 7,
    idx: '08',
    title: 'Winter Lights',
    src: '/assets/about-gallery/card_08.jpg',
    modalSrc: '/assets/about-gallery/modal_08.jpg',
    stackOffset: { x: 7, y: 6 },
    stackRotate: 11,
    target: { x: 38, y: 34, rotate: 2.2, scale: 0.9, w: 15, h: 21 },
    targetSm: { x: 32, y: 26, rotate: 6, scale: 0.8 },
    z: 9,
  },
  {
    id: 8,
    idx: '09',
    title: 'Campus Lawns',
    src: '/assets/about-gallery/card_09.jpg',
    modalSrc: '/assets/about-gallery/modal_09.jpg',
    stackOffset: { x: -6, y: -3 },
    stackRotate: -7,
    target: { x: 19, y: 35.5, rotate: -1.5, scale: 0.9, w: 14.5, h: 22 },
    targetSm: { x: 21, y: 36, rotate: -5, scale: 0.83 },
    z: 10,
  },
  {
    id: 9,
    idx: '10',
    title: 'Waterfront Dialogue',
    src: '/assets/about-gallery/card_11.jpg',
    modalSrc: '/assets/about-gallery/modal_11.jpg',
    stackOffset: { x: -4, y: 4 },
    stackRotate: -10,
    target: { x: 0, y: 36, rotate: 1.2, scale: 0.9, w: 15.5, h: 21 },
    targetSm: { x: 11, y: 25, rotate: 4, scale: 0.8 },
    z: 11,
  },
  {
    id: 10,
    idx: '11',
    title: 'Ph.D. Defense & Milestones',
    src: '/assets/about-gallery/card_12.jpg',
    modalSrc: '/assets/about-gallery/modal_12.jpg',
    stackOffset: { x: 5, y: -5 },
    stackRotate: 8,
    target: { x: -19, y: 35.5, rotate: -1.8, scale: 0.9, w: 15.5, h: 21 },
    targetSm: { x: 0, y: 37, rotate: -2, scale: 0.84 },
    z: 12,
  },
  {
    id: 11,
    idx: '12',
    title: 'Culinary Heritage',
    src: '/assets/about-gallery/card_13.jpg',
    modalSrc: '/assets/about-gallery/modal_13.jpg',
    stackOffset: { x: -3, y: -5 },
    stackRotate: -6,
    target: { x: -38, y: 34, rotate: 2.5, scale: 0.9, w: 14.5, h: 22 },
    targetSm: { x: -11, y: 25, rotate: 3, scale: 0.8 },
    z: 13,
  },
  {
    id: 12,
    idx: '13',
    title: 'Vosges Mountains Countryside',
    src: '/assets/about-gallery/card_14.jpg',
    modalSrc: '/assets/about-gallery/modal_14.jpg',
    stackOffset: { x: 3, y: 2 },
    stackRotate: 6,
    target: { x: -40.5, y: 13, rotate: -2.0, scale: 0.9, w: 15, h: 21 },
    targetSm: { x: -21, y: 36, rotate: -6, scale: 0.83 },
    z: 14,
  },
  {
    id: 13,
    idx: '14',
    title: 'Precision Acoustic Measurement',
    src: '/assets/about-gallery/card_16.jpg',
    modalSrc: '/assets/about-gallery/modal_16.jpg',
    stackOffset: { x: 2, y: -2 },
    stackRotate: 8,
    target: { x: -40.5, y: -13, rotate: 2.0, scale: 0.9, w: 14.5, h: 22 },
    targetSm: { x: -32, y: 26, rotate: 5, scale: 0.8 },
    z: 15,
  },
];

// Configuration constants
const SCATTER_START = 0.0;
const SCATTER_END = 0.52;
const STACK_SCALE = 0.85;
const PARALLAX_X = 2.0;
const PARALLAX_Y = 1.6;
const SPRING_FACTOR = 0.08;

function getParallaxDepth(index: number, total: number) {
  if (total <= 1) return 1;
  return 0.55 + (index / (total - 1)) * 0.75;
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export const StackSpreadSection: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const manifestoBoxRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  const openModal = useCallback((index: number) => {
    setActiveModalIndex((index + CARDS_DATA.length) % CARDS_DATA.length);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextModal = useCallback(() => {
    setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % CARDS_DATA.length : 0));
  }, []);

  const prevModal = useCallback(() => {
    setActiveModalIndex((prev) => (prev !== null ? (prev - 1 + CARDS_DATA.length) % CARDS_DATA.length : CARDS_DATA.length - 1));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') prevModal();
      else if (e.key === 'ArrowRight') nextModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, closeModal, nextModal, prevModal]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Animation frame loop with smooth physics and direct DOM updates
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    let animId: number = 0;
    let isRunning = true;
    let isInView = true;

    const tick = (scheduleNext = true) => {
      if (!wrapperRef.current || !isRunning) return;
      // Do NOT run continuous loop when tab is hidden or section is scrolled offscreen
      if (document.hidden || (!isInView && scheduleNext)) return;
      const isMobile = window.innerWidth <= 768;

      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = wrapperHeight - viewportHeight;

      let rawScrollProgress = 0;
      if (totalScrollableDistance > 0) {
        rawScrollProgress = clamp(-rect.top / totalScrollableDistance, 0, 1);
      }

      // Scatter progress [0 -> 1]
      const scatterProgress = clamp(
        (rawScrollProgress - SCATTER_START) / (SCATTER_END - SCATTER_START),
        0,
        1
      );

      // Smooth mouse spring physics
      mouseRef.current.currentX = lerp(mouseRef.current.currentX, mouseRef.current.targetX, SPRING_FACTOR);
      mouseRef.current.currentY = lerp(mouseRef.current.currentY, mouseRef.current.targetY, SPRING_FACTOR);

      // Update Central Manifesto (Fade In & Scale Up)
      if (manifestoBoxRef.current) {
        const textOpacity = isMobile
          ? clamp(lerp(0.15, 1, scatterProgress / 0.5), 0.15, 1)
          : clamp(lerp(0.3, 1, scatterProgress / 0.45), 0.3, 1);
        const textScale = clamp(lerp(0.92, 1, scatterProgress / 0.5), 0.92, 1);

        manifestoBoxRef.current.style.opacity = String(textOpacity);
        manifestoBoxRef.current.style.transform = `scale(${textScale})`;
      }

      // Update Scroll Hint
      if (scrollHintRef.current) {
        const hintOpacity = clamp(1 - rawScrollProgress * 6, 0, 1);
        scrollHintRef.current.style.opacity = String(hintOpacity);
        scrollHintRef.current.style.pointerEvents = hintOpacity > 0.05 ? 'auto' : 'none';
      }

      // Update Every Card's Transform
      const canParallax = !isMobile && scatterProgress > 0.8;

      CARDS_DATA.forEach((cfg, index) => {
        const el = cardElsRef.current[index];
        if (!el) return;

        const stackOffset = cfg.stackOffset || { x: 0, y: 0 };
        const stackRotate = cfg.stackRotate || 0;

        let targetX: number, targetY: number, targetRotate: number, restScale: number;
        let startX = stackOffset.x;
        let startY = stackOffset.y;
        let startScale = STACK_SCALE;

        if (isMobile && cfg.targetSm) {
          targetX = cfg.targetSm.x;
          targetY = cfg.targetSm.y;
          targetRotate = cfg.targetSm.rotate !== undefined ? cfg.targetSm.rotate : 0;
          restScale = cfg.targetSm.scale || 0.80;
          startX = stackOffset.x * 0.45;
          startY = stackOffset.y * 0.35;
          startScale = 0.82;
          // Clear desktop inline width/height so CSS clamp sets the card aspect ratio
          el.style.width = '';
          el.style.height = '';
        } else {
          targetX = cfg.target.x;
          targetY = cfg.target.y;
          targetRotate = cfg.target.rotate;
          restScale = cfg.target.scale || 0.90;
          el.style.width = cfg.target.w + 'vw';
          el.style.height = cfg.target.h + 'vh';
        }

        // Interpolated position
        const currentTx = lerp(startX, targetX, scatterProgress);
        const currentTy = lerp(startY, targetY, scatterProgress);
        const currentRotate = lerp(stackRotate, targetRotate, scatterProgress);
        const currentScale = lerp(startScale, restScale, scatterProgress);

        let dx = currentTx;
        let dy = currentTy;

        // Subtle mouse parallax drift when scattered on desktop
        if (canParallax) {
          const depth = getParallaxDepth(index, CARDS_DATA.length);
          const drift = depth * scatterProgress;
          dx -= mouseRef.current.currentX * PARALLAX_X * drift;
          dy -= mouseRef.current.currentY * PARALLAX_Y * drift;
        }

        // Hardware accelerated transform matching html site exactly
        el.style.transform = `translate(calc(-50% + ${dx}vw), calc(-50% + ${dy}vh)) rotate(${currentRotate}deg) scale(${currentScale})`;
      });

      if (scheduleNext && isInView && !document.hidden && isRunning) {
        animId = requestAnimationFrame(() => tick(true));
      }
    };

    const startLoop = () => {
      if (isRunning && isInView && !document.hidden) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => tick(true));
      }
    };

    // Draw initial frame synchronously so initial card stack position is ready before intersection
    tick(false);

    const observer =
      typeof IntersectionObserver !== 'undefined' && wrapperRef.current
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              isInView = entry.isIntersecting;
              if (isInView) {
                startLoop();
              } else {
                cancelAnimationFrame(animId);
              }
            },
            { rootMargin: '200px 0px' }
          )
        : null;

    if (observer && wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    // C7 FIX: Resume RAF loop when tab becomes visible again
    const onVisibilityChange = () => {
      if (!document.hidden && isRunning && isInView) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (!observer) {
      startLoop();
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <>
      <section
        ref={wrapperRef}
        className="stack-spread-wrapper"
        id="philosophy-stack"
        aria-label="Interactive Photo Stack and Academic Journey"
      >
        <div className="stack-sticky-container">
          {/* Architectural Hairline Grid */}
          <div className="stack-grid-lines" aria-hidden="true">
            <div />
            <div />
            <div />
            <div />
          </div>

          {/* Central Manifesto */}
          <div className="stack-manifesto-box" id="manifestoBox" ref={manifestoBoxRef}>
            <h2 className="stack-manifesto-title">
              “I leave no trace of <span className="quote-maroon">wings</span> in the air but I am glad I had my{' '}
              <span className="quote-maroon">flight</span>” <span className="quote-author">— Tagore</span>
            </h2>
          </div>

          {/* Scattering Cards Layer */}
          <div className="stack-cards-layer" id="cardsLayer">
            {CARDS_DATA.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardElsRef.current[index] = el;
                }}
                className="stack-card-item"
                style={{
                  zIndex: card.z,
                  width: `${card.target.w}vw`,
                  height: `${card.target.h}vh`,
                }}
              >
                <div
                  className="stack-card-inner"
                  role="button"
                  tabIndex={0}
                  aria-label={`Photo ${index + 1}`}
                  onClick={() => openModal(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(index);
                    }
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.title ? `${card.title} — personal archive photo` : `Personal archive photo ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="stack-card-shade" />
                  <div className="stack-card-zoom-top" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll to Spread Hint */}
          <div className="stack-scroll-hint" id="scrollHint" ref={scrollHintRef}>
            <span className="hint-desktop">SCROLL TO SPREAD</span>
            <span className="hint-mobile">SCROLL DOWN</span>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Pure Visual Photo Display) */}
      {activeModalIndex !== null && (
        <div
          className="stack-lightbox-modal is-open"
          id="stackLightboxModal"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="stack-lightbox-container" id="stackLightboxContainer">
            <button
              type="button"
              className="stack-lightbox-close"
              id="stackLightboxClose"
              aria-label="Close photo"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="stack-lightbox-body">
              <button
                type="button"
                className="stack-lightbox-btn stack-lightbox-prev"
                id="stackLightboxPrev"
                aria-label="Previous photo"
                onClick={prevModal}
              >
                ‹
              </button>
              <img
                id="stackLightboxImg"
                src={CARDS_DATA[activeModalIndex].modalSrc || CARDS_DATA[activeModalIndex].src}
                alt={CARDS_DATA[activeModalIndex].title || 'Photo preview'}
              />
              <button
                type="button"
                className="stack-lightbox-btn stack-lightbox-next"
                id="stackLightboxNext"
                aria-label="Next photo"
                onClick={nextModal}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StackSpreadSection;

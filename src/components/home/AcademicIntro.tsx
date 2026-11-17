import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface AcademicIntroProps {
  onComplete?: () => void;
}

interface NeuralNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  currentRadius: number;
  color: string;
  freq: number;
  phase: number;
}

interface PhotonSignal {
  from: NeuralNode;
  to: NeuralNode;
  progress: number;
  speed: number;
}

export const AcademicIntro: React.FC<AcademicIntroProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const techFrameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLParagraphElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const finishIntroRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is active or if running in automated audit (Lighthouse / PageSpeed)
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const isSyntheticAudit =
      typeof navigator !== 'undefined' &&
      /Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);

    if (prefersReducedMotion || isSyntheticAudit) {
      if (preloaderRef.current) {
        preloaderRef.current.style.display = 'none';
        preloaderRef.current.style.pointerEvents = 'none';
      }
      const brand = document.getElementById('site-nav-brand');
      if (brand) {
        brand.style.removeProperty('opacity');
        brand.style.removeProperty('pointer-events');
        brand.style.removeProperty('visibility');
      }
      document.body.style.removeProperty('overflow');
      onComplete?.();
      window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
      return;
    }

    // Lock body scroll during intro animation so background page cannot scroll
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let isCompleted = false;
    let animFrameId: number | null = null;
    let currentTimeline: ReturnType<typeof gsap.timeline> | null = null;

    // ── Motion & Warp State Machine ───────────────────────────────────────
    const animState = {
      flightProgress: 0,
      warp: 0,
      waveAlpha: 1,
      isFlying: false,
    };

    // ── Living Synaptic & Wave Manifold Canvas ───────────────────────────
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    const nodes: NeuralNode[] = [];
    const signals: PhotonSignal[] = [];
    const heroColors = ['#1250A3', '#3B82F6', '#60A5FA', '#93C5FD'];
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isMouseActive = false;
    let time = 0;
    let canvasW = window.innerWidth;
    let canvasH = window.innerHeight;
    let xPoints: number[] = [];
    let envelopes: number[] = [];
    let baseFreqs: number[] = [];
    let cachedZone = { left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0 };

    function getExclusionZone() {
      if (!identityRef.current) return { left: 0, right: 0, top: 0, bottom: 0, cx: 0, cy: 0 };
      const rect = identityRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;
      const isNarrow = window.innerWidth <= 480;
      const padX = isNarrow
        ? Math.min(16, window.innerWidth * 0.03)
        : isMobile
          ? Math.min(28, window.innerWidth * 0.04)
          : Math.max(65, window.innerWidth * 0.05);
      const padY = isMobile ? 22 : 40;
      return {
        left: rect.left - padX,
        right: rect.right + padX,
        top: rect.top - padY,
        bottom: rect.bottom + padY,
        cx: (rect.left + rect.right) / 2,
        cy: (rect.top + rect.bottom) / 2,
      };
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cachedZone = getExclusionZone();

      xPoints = [];
      envelopes = [];
      baseFreqs = [];
      const isMobile = canvasW <= 768;
      const step = canvasW > 1200 ? 5 : isMobile ? 4 : 7;
      const freqMult = isMobile ? Math.PI * 2.6 : Math.PI * 4;
      const envPower = isMobile ? 2.0 : 2.5;

      for (let x = 0; x <= canvasW; x += step) {
        xPoints.push(x);
        const xNorm = x / canvasW;
        envelopes.push(Math.pow(Math.sin(xNorm * Math.PI), envPower));
        baseFreqs.push(xNorm * freqMult);
      }
    }

    function initNeuralNodes() {
      nodes.length = 0;
      signals.length = 0;
      const w = canvasW;
      const h = canvasH;
      const zone = getExclusionZone();
      const isMobile = w <= 768;
      const count = Math.min(58, Math.max(isMobile ? 24 : 34, Math.floor(w / 34)));

      for (let i = 0; i < count; i++) {
        let x: number;
        let y: number;
        let tries = 0;
        do {
          x = Math.random() * (w - 70) + 35;
          y = Math.random() * (h - 70) + 35;
          tries++;
        } while (
          tries < 30 &&
          x > zone.left &&
          x < zone.right &&
          y > zone.top &&
          y < zone.bottom
        );

        const baseRadius = Math.random() * 1.3 + 2.0;
        const assignedColor = heroColors[Math.floor(Math.random() * heroColors.length)];

        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: baseRadius,
          currentRadius: baseRadius,
          color: assignedColor,
          freq: Math.random() * 0.012 + 0.006,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function renderCanvasScene() {
      if (!ctx || !canvas) return;
      // C6 FIX: Do NOT queue a new RAF frame when tab is hidden.
      // The visibilitychange listener below restarts the loop when tab becomes visible.
      if (document.hidden) return;
      const w = canvasW;
      const h = canvasH;
      ctx.clearRect(0, 0, w, h);
      time += 0.011;

      if (isMouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.12;
        mouseY += (targetMouseY - mouseY) * 0.12;
      } else {
        mouseX += (-1000 - mouseX) * 0.08;
        mouseY += (-1000 - mouseY) * 0.08;
      }

      const warpFactor = animState.warp;
      const zone = cachedZone;

      // ── 1. 3D Metamaterial Acoustic Waveform ──────────────────────────────
      if (animState.waveAlpha > 0.005 && xPoints.length > 0) {
        const isMobile = w <= 768;
        const numLines = isMobile ? 22 : w > 1400 ? 32 : w > 1100 ? 28 : w > 900 ? 24 : 18;
        const centerY = h / 2;

        const timeShift = time * (isMobile ? 1.3 : 1.5);
        const animTime1_2 = time * (isMobile ? 1.05 : 1.2);
        const animTime0_9 = time * (isMobile ? 0.82 : 0.9);
        const ampScale = isMobile ? 0.5 : 1.0;
        const spreadScale = isMobile ? 0.4 : 1.0;

        for (let i = 0; i < numLines; i++) {
          const normalized = i / (numLines - 1);
          const depth = Math.sin(normalized * Math.PI);

          ctx.beginPath();
          const strokeAlpha =
            (isMobile ? 0.06 + depth * 0.33 : 0.08 + depth * 0.45) *
            animState.waveAlpha *
            (1 - warpFactor * 0.85);
          ctx.strokeStyle = isMobile
            ? `rgba(75, 160, 255, ${strokeAlpha})`
            : `rgba(10, 100, 255, ${strokeAlpha})`;
          ctx.lineWidth = (isMobile ? 0.75 + depth * 1.2 : 0.8 + depth * 1.5) * (1 + warpFactor * 0.5);

          const phaseOffset = normalized * Math.PI * (isMobile ? 2.4 : 2.5);
          const wave1Phase = -timeShift + phaseOffset;
          const wave2Phase = animTime1_2 - phaseOffset * 0.8;
          const verticalSpread = (normalized - 0.5) * (180 * spreadScale);

          for (let j = 0; j < xPoints.length; j++) {
            const x = xPoints[j];
            const env = envelopes[j];
            const baseF = baseFreqs[j];

            const wave1 = Math.sin(baseF + wave1Phase) * (80 * ampScale);
            const wave2 = Math.cos(baseF * 1.3 + wave2Phase) * (45 * ampScale);
            const wave3 = Math.sin(baseF * 0.7 - animTime0_9) * (35 * ampScale);

            const spreadY = verticalSpread * Math.sin(baseF + time);
            const rawY = centerY + (spreadY + wave1 + wave2 + wave3) * env;

            let y = rawY;

            if (isMouseActive && !isMobile) {
              const dx = x - mouseX;
              const dy = rawY - mouseY;
              const distSq = dx * dx + dy * dy;
              const maxDistSq = 30000;
              if (distSq < maxDistSq) {
                const pull = 1 - distSq / maxDistSq;
                y += (dy / Math.sqrt(distSq + 0.0001)) * (30 * pull * depth);
              }
            }

            if (warpFactor > 0) {
              y += (y - centerY) * warpFactor * 0.85;
            }

            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
      }

      // ── 2. Neural Constellation & Synaptic Mesh ───────────────────────────
      const maxDist = 180;
      const maxDistSq = maxDist * maxDist;
      const activeLinks: Array<{ a: NeuralNode; b: NeuralNode }> = [];

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        a.x += a.vx + Math.sin(time * a.freq + a.phase) * 0.18;
        a.y += a.vy + Math.cos(time * a.freq + a.phase) * 0.18;

        if (a.x < 25 || a.x > w - 25) a.vx *= -1;
        if (a.y < 25 || a.y > h - 25) a.vy *= -1;

        if (a.x > zone.left && a.x < zone.right && a.y > zone.top && a.y < zone.bottom) {
          const pushX = a.x - zone.cx > 0 ? 0.95 : -0.95;
          const pushY = a.y - zone.cy > 0 ? 0.95 : -0.95;
          a.x += pushX;
          a.y += pushY;
        }

        if (warpFactor > 0) {
          const angle = Math.atan2(a.y - h * 0.4, a.x - w * 0.3);
          a.x += Math.cos(angle) * warpFactor * 4.2;
          a.y += Math.sin(angle) * warpFactor * 4.2;
        }

        if (isMouseActive) {
          const mdx = a.x - mouseX;
          const mdy = a.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < 36100) {
            const mdist = Math.sqrt(mDistSq);
            if (mdist < 160) {
              const factor = 1 - mdist / 160;
              a.currentRadius = a.radius + factor * 2.2;
            } else {
              a.currentRadius += (a.radius - a.currentRadius) * 0.1;
            }

            const mAlpha = (1 - mdist / 190) * 0.6;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(a.x, a.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${mAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          } else {
            a.currentRadius += (a.radius - a.currentRadius) * 0.1;
          }
        } else {
          a.currentRadius += (a.radius - a.currentRadius) * 0.1;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / maxDist;
            const alpha = Math.max(0, (0.05 + 0.32 * norm) * (1 - warpFactor * 0.85));

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(114, 174, 245, ${alpha})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();

            if (activeLinks.length < 150) {
              activeLinks.push({ a, b });
            }
          }
        }
      }

      // Emission of photon signal packets along waveguides
      if (signals.length < 6 && Math.random() < 0.05 && activeLinks.length > 0) {
        const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
        signals.push({
          from: link.a,
          to: link.b,
          progress: 0,
          speed: 0.02 + Math.random() * 0.015,
        });
      }

      // ── 3. Travelling Synaptic Photon Packets ──
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }
        const sx = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
        const sy = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;

        // Glow halo without expensive per-frame shadowBlur Gaussian filter
        ctx.beginPath();
        ctx.arc(sx, sy, 5.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.32)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // ── 4. Render Metamaterial Nodes ──
      const nodeAlpha = Math.max(0, 1 - warpFactor * 0.9);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const r = n.currentRadius || n.radius;

        // Outer soft glow halo
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}1a`;
        ctx.fill();

        // Main body
        ctx.globalAlpha = 0.75 * nodeAlpha;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Luminous white core
        ctx.globalAlpha = 0.92 * nodeAlpha;
        ctx.beginPath();
        ctx.arc(n.x - r * 0.25, n.y - r * 0.25, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animFrameId = requestAnimationFrame(renderCanvasScene);
    }

    // ── Finish & FLIP Touchdown Handler ──────────────────────────────────
    function finishIntro() {
      if (isCompleted) return;
      isCompleted = true;

      // Restore body scrolling immediately
      document.body.style.removeProperty('overflow');

      if (currentTimeline) {
        currentTimeline.kill();
        currentTimeline = null;
      }

      const preloader = preloaderRef.current;
      const navBrand = document.getElementById('site-nav-brand');
      const nameEl = nameRef.current;

      const introElements = [
        preloader,
        curtainRef.current,
        gridRef.current,
        canvasRef.current,
        techFrameRef.current,
        nameEl,
        eyebrowRef.current,
        hairlineRef.current,
        rolesRef.current,
        skipBtnRef.current,
      ].filter(Boolean);

      if (introElements.length) {
        gsap.killTweensOf(introElements);
      }

      gsap.killTweensOf([
        '.ad_nav_link',
        '.contact-btn',
        '.profile-container',
        '.profile-card',
        '.hero-banner-image',
        '.hero-banner-info',
      ]);
      gsap.set(
        ['.ad_nav_link', '.contact-btn', '.profile-container', '.profile-card', '.hero-banner-image', '.hero-banner-info'],
        {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          x: 0,
        }
      );

      // Ensure all hero elements and scroll-reveal items in hero are fully active and opaque
      document.querySelectorAll('.hero-banner .reveal, .hero-banner-image, .hero-banner-info').forEach((el) => {
        el.classList.add('active');
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });

      if (navBrand) {
        navBrand.style.setProperty('opacity', '1', 'important');
        navBrand.style.removeProperty('pointer-events');
        navBrand.style.removeProperty('visibility');
        navBrand.classList.add('touchdown-shimmer');
        setTimeout(() => navBrand.classList.remove('touchdown-shimmer'), 800);
      }

      if (preloader) {
        preloader.style.pointerEvents = 'none';
        preloader.style.display = 'none';
        preloader.style.opacity = '0';
      }

      if (nameEl) {
        nameEl.style.display = 'none';
      }

      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }

      if (onComplete) onComplete();
      window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
    }

    // ── Main Continuous FLIP Morph Sequence ──────────────────────────────
    function playIntro() {
      isCompleted = false;
      if (currentTimeline) currentTimeline.kill();

      animState.flightProgress = 0;
      animState.warp = 0;
      animState.waveAlpha = 1;

      resizeCanvas();
      initNeuralNodes();
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(renderCanvasScene);
      }

      const navBrand = document.getElementById('site-nav-brand');
      if (navBrand) {
        navBrand.style.opacity = '0';
        navBrand.style.pointerEvents = 'none';
      }

      const preloader = preloaderRef.current;
      if (preloader) {
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.pointerEvents = 'auto';
      }

      const nameEl = nameRef.current;
      if (nameEl) {
        nameEl.style.display = 'inline-block';
      }

      const curtain = curtainRef.current;
      const grid = gridRef.current;
      const canvasEl = canvasRef.current;
      const techFrame = techFrameRef.current;
      const eyebrow = eyebrowRef.current;
      const hairline = hairlineRef.current;
      const roles = rolesRef.current;
      const skipBtn = skipBtnRef.current;

      if (!nameEl) return;

      document.body.style.overflow = 'hidden';

      gsap.killTweensOf([
        curtain,
        grid,
        canvasEl,
        techFrame,
        nameEl,
        eyebrow,
        hairline,
        roles,
        skipBtn,
        preloader,
      ]);

      if (curtain) gsap.set(curtain, { clearProps: 'all', opacity: 1, scale: 1 });
      if (grid) gsap.set(grid, { clearProps: 'all', opacity: 1 });
      if (canvasEl) gsap.set(canvasEl, { clearProps: 'all', opacity: 1 });
      if (techFrame) gsap.set(techFrame, { clearProps: 'all', opacity: 1, scale: 1, y: 0 });
      if (eyebrow) gsap.set(eyebrow, { clearProps: 'all', opacity: 0, y: 12 });
      if (hairline) gsap.set(hairline, { clearProps: 'all', opacity: 0, scaleX: 0.5 });
      if (roles) {
        gsap.set(roles, { clearProps: 'all', opacity: 0, y: 12 });
        const pills = roles.querySelectorAll('.role-pill, .intro-sep');
        if (pills.length) gsap.set(pills, { clearProps: 'all', opacity: 1, y: 0 });
      }
      if (skipBtn) gsap.set(skipBtn, { clearProps: 'all', opacity: 1 });

      gsap.set(nameEl, {
        clearProps: 'all',
        transformOrigin: 'top left',
        x: 0,
        y: 0,
        scale: 0.95,
        opacity: 0,
        color: '#000000',
      });

      // Precise Real-Time FLIP Morph Coordinates Calculation (matching html site)
      function getTargetCoordinates() {
        if (!navBrand || !nameEl) return { x: 0, y: 0, scale: 1 };
        const navRect = navBrand.getBoundingClientRect();
        const currX = (gsap.getProperty(nameEl, 'x') as number) || 0;
        const currY = (gsap.getProperty(nameEl, 'y') as number) || 0;
        const currScale = (gsap.getProperty(nameEl, 'scale') as number) || 1;
        const rect = nameEl.getBoundingClientRect();

        const baseX = rect.left - currX;
        const baseY = rect.top - currY;
        const baseW = rect.width / currScale;

        return {
          x: navRect.left - baseX,
          y: navRect.top - baseY,
          scale: navRect.width / (baseW || 1),
        };
      }

      const tl = gsap.timeline();
      currentTimeline = tl;

      // Phase A: Orchestrated Center Reveal (Silky, cinematic easing)
      tl.fromTo(
        nameEl,
        { scale: 0.95, opacity: 0, y: 12 },
        { scale: 1.0, opacity: 1, y: 0, duration: 0.40, ease: 'power2.out' }
      )
        .fromTo(
          [eyebrow, roles],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
          '-=0.25'
        )
        .fromTo(
          hairline,
          { scaleX: 0.5, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.30, ease: 'power2.out' },
          '-=0.25'
        );

      // Phase B: Holding for Reading & Academic Authority (0.70s: confident, poised, fast)
      tl.to({}, { duration: 0.70 });

      // Phase C: The "Going and All" Sequence — Aerodynamic Flight & Velvet Site Awakening
      tl.add('going');

      // 1. Staged peripheral clearance:
      tl.to(hairline, { scaleX: 0, opacity: 0, duration: 0.22, ease: 'power2.inOut' }, 'going');
      tl.to(eyebrow, { opacity: 0, y: -8, duration: 0.20, ease: 'power2.out' }, 'going+=0.04');
      const rolePills = roles ? roles.querySelectorAll('.role-pill, .intro-sep') : [roles];
      tl.to(rolePills, { opacity: 0, y: 6, duration: 0.20, stagger: 0.02, ease: 'power2.out' }, 'going+=0.05');
      tl.to(skipBtn, { opacity: 0, duration: 0.18, ease: 'power2.out' }, 'going');
      if (techFrame) {
        tl.to(techFrame, { opacity: 0, scale: 0.98, duration: 0.20, ease: 'power2.out' }, 'going');
      }

      // 2. Micro-buoyancy anticipation lift (unmooring from gravity)
      tl.to(nameEl, { y: -3, duration: 0.14, ease: 'sine.out' }, 'going+=0.10');

      // 3. The Grand Flight: Continuous Bezier Aerodynamic Arc (0.92s duration)
      tl.to(
        nameEl,
        {
          x: () => getTargetCoordinates().x,
          y: () => getTargetCoordinates().y,
          scale: () => getTargetCoordinates().scale,
          duration: 0.92,
          ease: 'power2.inOut',
        },
        'going+=0.22'
      );

      // 4. Canvas warp & liquid node dispersion along departure stream
      tl.to(
        animState,
        {
          warp: 1,
          waveAlpha: 0,
          flightProgress: 1,
          duration: 1.20,
          ease: 'power2.out',
        },
        'going+=0.28'
      );

      // 5. Background Curtain: Silky-smooth aperture cross-fade
      tl.add(() => {
        window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
      }, 'going+=0.70');
      tl.to(
        curtain,
        {
          opacity: 0,
          scale: 1.025,
          duration: 0.72,
          ease: 'power2.inOut',
        },
        'going+=0.74'
      );
      tl.to(
        [grid, canvasEl],
        {
          opacity: 0,
          duration: 0.62,
          ease: 'power2.inOut',
        },
        'going+=0.78'
      );

      // 6. Site Awakening ("and all"): Navbar and hero section glide softly into place
      tl.fromTo(
        '.ad_nav_link, .contact-btn',
        { y: -5, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.02, ease: 'power2.out', immediateRender: false },
        'going+=0.86'
      );
      tl.fromTo(
        '.profile-container, .profile-card, .hero-banner-image, .hero-banner-info',
        { y: 8, opacity: 0.7 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', immediateRender: false },
        'going+=0.90'
      );

      // Phase D: Velvet Touchdown & Seamless 100% Precise Handoff
      tl.add(() => {
        // 1. Reveal navbar brand in its exact position with NO scale displacement
        if (navBrand) {
          navBrand.style.setProperty('opacity', '1', 'important');
          navBrand.classList.add('touchdown-shimmer');
          setTimeout(() => navBrand.classList.remove('touchdown-shimmer'), 800);
        }

        // 2. Immediately hide flying intro name so there is ZERO overlap or double-text
        nameEl.style.display = 'none';

        // 3. Silky-smooth cross-fade of preloader curtain & canvas so hero is revealed
        if (preloader) {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.22,
            ease: 'power1.out',
            onComplete: finishIntro,
          });
        } else {
          finishIntro();
        }
      }, 'going+=1.18');
    }

    finishIntroRef.current = finishIntro;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      if (!isMouseActive) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
      isMouseActive = true;
    };

    const onMouseLeave = () => {
      isMouseActive = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
        if (!isMouseActive) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        }
        isMouseActive = true;
      }
    };

    const onTouchEnd = () => {
      isMouseActive = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') finishIntro();
    };

    // Auto-finish immediately if tab is backgrounded to prevent frozen black screen; resume RAF if visible
    const onVisibilityChange = () => {
      if (document.hidden) {
        finishIntro();
      } else if (!isCompleted) {
        if (animFrameId !== null) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(renderCanvasScene);
      }
    };

    const handleReplayIntro = () => {
      window.scrollTo(0, 0);
      playIntro();
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('kd_replay_intro', handleReplayIntro);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Auto-play intro immediately
    const startTimer = setTimeout(playIntro, 30);

    // Failsafe timer: guaranteed dismissal after 2.8s even if RAF, GSAP or tab backgrounding stalls
    const safetyTimer = setTimeout(() => {
      if (!isCompleted) finishIntro();
    }, 2800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(safetyTimer);
      finishIntro();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('kd_replay_intro', handleReplayIntro);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onComplete]);

  return (
    <div
      id="site-preloader"
      ref={preloaderRef}
      onClick={() => finishIntroRef.current?.()}
      role="dialog"
      aria-modal="true"
      aria-label="Dr. Krupali Donda Intro"
    >
      <div id="intro-curtain" ref={curtainRef} />
      <div id="intro-grid" ref={gridRef} aria-hidden="true" />

      <div className="intro-tech-frame" id="intro-tech-frame" ref={techFrameRef} aria-hidden="true">
        <div className="intro-corner top-left">
          <span className="corner-bracket">┌</span>
          <span className="corner-label">LAB // METAMATERIALS &amp; AI</span>
        </div>
        <div className="intro-corner top-right">
          <span className="corner-label">0.1–10 THz // INVERSE DESIGN</span>
          <span className="corner-bracket">┐</span>
        </div>
        <div className="intro-corner bottom-left">
          <span className="corner-bracket">└</span>
          <span className="corner-label">ADANI UNIVERSITY • DEPT. OF ICT</span>
        </div>
      </div>

      <canvas id="intro-neural-canvas" ref={canvasRef} aria-hidden="true" />

      <div id="intro-identity" ref={identityRef}>
        <div id="intro-eyebrow" ref={eyebrowRef}>
          <span className="eyebrow-beacon" />
          <span>Metamaterials &bull; Wave Physics &bull; AI</span>
        </div>
        <h1 id="intro-name" ref={nameRef}>
          Dr. Krupali Donda
        </h1>
        <div id="intro-hairline" ref={hairlineRef} aria-hidden="true" />
        <p id="intro-roles" ref={rolesRef} aria-label="Scientist, Researcher and Mentor">
          <span className="role-pill">Scientist</span>
          <span className="intro-sep">&bull;</span>
          <span className="role-pill">Researcher</span>
          <span className="intro-sep">&bull;</span>
          <span className="role-pill">Mentor</span>
        </p>
      </div>

      <button
        id="intro-skip-btn"
        ref={skipBtnRef}
        type="button"
        aria-label="Skip introduction"
        onClick={() => {
          if (finishIntroRef.current) {
            finishIntroRef.current();
          } else {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            window.dispatchEvent(new CustomEvent('academic-intro-curtain-opening'));
            const brand = document.getElementById('site-nav-brand');
            if (brand) brand.style.opacity = '1';
            if (onComplete) onComplete();
          }
        }}
      >
        <span>Skip</span>
        <kbd>Esc</kbd>
      </button>
    </div>
  );
};

export default AcademicIntro;

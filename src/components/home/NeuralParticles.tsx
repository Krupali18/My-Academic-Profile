import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: { r: number; g: number; b: number };
  opacity: number;
}

interface SignalPacket {
  from: ParticleNode;
  to: ParticleNode;
  progress: number;
  speed: number;
}

export const NeuralParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;
    let isCurtainBlocking = Boolean(
      (() => {
        const p = document.getElementById('site-preloader');
        return p && p.style.display !== 'none' && !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      })()
    );
    let containerRect = container.getBoundingClientRect();

    const palette = [
      { r: 37, g: 99, b: 235 }, // #2563EB
      { r: 59, g: 130, b: 246 }, // #3B82F6
      { r: 96, g: 165, b: 250 }, // #60A5FA
      { r: 147, g: 197, b: 253 }, // #93C5FD
    ];

    const particles: ParticleNode[] = [];
    const signals: SignalPacket[] = [];

    function updateRect() {
      if (container) containerRect = container.getBoundingClientRect();
    }

    function resize() {
      if (!canvas || !container || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth || window.innerWidth;
      height = container.offsetHeight || 550;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRect();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    // Spawn particles (40 mobile / 75 desktop — visually unchanged)
    const particleCount = width < 768 ? 40 : 75;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 0.65,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - containerRect.left;
      mouseY = e.clientY - containerRect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    function shouldAnimate() {
      return isVisible && isTabVisible && !isCurtainBlocking;
    }

    function stop() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    function start() {
      if (!animId && shouldAnimate()) {
        animId = requestAnimationFrame(render);
      }
    }

    const maxDistSq = 190 * 190;
    const mouseDistSq = 160 * 160;

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Move and draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse hover bubble push
        if (mouseX > 0) {
          const dx = p1.x - mouseX;
          const dy = p1.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseDistSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 160) * 1.5;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 190) * 0.48;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(114, 174, 245, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 2. Render Metamaterial Specular Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const r = p.radius;
        const rgb = p.color;
        const opacity = p.opacity;

        // Outer soft halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.16})`;
        ctx.fill();

        // Main node body
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.7})`;
        ctx.fill();

        // Luminous white specular core
        ctx.beginPath();
        ctx.arc(
          p.x - r * 0.25,
          p.y - r * 0.25,
          Math.max(0.75, r * 0.35),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.94})`;
        ctx.fill();
      }

      // 3. Synaptic Photon Packets
      if (signals.length < 10 && Math.random() < 0.08 && particles.length > 2) {
        const idxA = Math.floor(Math.random() * particles.length);
        const pA = particles[idxA];
        for (let j = 0; j < particles.length; j++) {
          if (j === idxA) continue;
          const pB = particles[j];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 190 && dist > 35) {
            signals.push({
              from: pA,
              to: pB,
              progress: 0,
              speed: 0.016 + Math.random() * 0.014,
            });
            break;
          }
        }
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }
        const sx = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
        const sy = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;

        // Soft glow halo without shadowBlur CPU overhead
        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
    }

    function render() {
      drawFrame();
      if (shouldAnimate()) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    }

    // Pause when tab is hidden (saves CPU/GPU and battery)
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Pause when canvas is scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) start();
          else stop();
        });
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const onCurtainOpening = () => {
      isCurtainBlocking = false;
      start();
    };

    // Draw initial crisp frame immediately so hero is populated behind curtain
    drawFrame();
    if (isCurtainBlocking) {
      window.addEventListener('academic-intro-curtain-opening', onCurtainOpening, { once: true });
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener('academic-intro-curtain-opening', onCurtainOpening);
      window.removeEventListener('scroll', updateRect);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particles-js"
      className="hero-neural-layer"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

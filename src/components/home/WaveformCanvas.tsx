import React, { useEffect, useRef } from 'react';

export const WaveformCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number | null = null;
    let isCanvasVisible = true;
    let isTabVisible = !document.hidden;
    let isCurtainBlocking = Boolean(
      (() => {
        const p = document.getElementById('site-preloader');
        return p && p.style.display !== 'none';
      })()
    );
    let step = 5;
    let canvasRect = canvas.getBoundingClientRect();

    let xPoints: number[] = [];
    let envelopes: number[] = [];
    let baseFreqs: number[] = [];

    function updateRect() {
      if (canvas) canvasRect = canvas.getBoundingClientRect();
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : 550;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRect();

      xPoints = [];
      envelopes = [];
      baseFreqs = [];
      step = width > 1200 ? 5 : 7;
      for (let x = 0; x <= width; x += step) {
        xPoints.push(x);
        const xProgress = x / width;
        envelopes.push(Math.pow(Math.sin(xProgress * Math.PI), 2.5));
        baseFreqs.push(xProgress * Math.PI * 4);
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let hoverForce = 0;
    let isHovering = false;

    const parent = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - canvasRect.left;
      targetMouseY = e.clientY - canvasRect.top;
      isHovering = true;
    };
    const onMouseLeave = () => {
      isHovering = false;
    };

    if (parent) {
      parent.addEventListener('mousemove', onMouseMove, { passive: true });
      parent.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    let time = 0;

    function shouldAnimate() {
      return isCanvasVisible && isTabVisible && !isCurtainBlocking;
    }

    function stop() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function start() {
      if (!animationFrameId && shouldAnimate()) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    function drawFrame() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      hoverForce += ((isHovering ? 1 : 0) - hoverForce) * 0.05;

      const numLines = width > 1400 ? 32 : width > 1100 ? 28 : width > 900 ? 24 : 16;
      const centerY = height / 2;

      const timeShift = time * 1.5;
      const animTime1_2 = time * 1.2;
      const animTime0_9 = time * 0.9;

      for (let i = 0; i < numLines; i++) {
        const normalized = i / (numLines - 1);
        const depth = Math.sin(normalized * Math.PI);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(10, 100, 255, ${0.08 + depth * 0.45})`;
        ctx.lineWidth = 0.8 + depth * 1.5;

        const phaseOffset = normalized * Math.PI * 2.5;
        const wave1Phase = -timeShift + phaseOffset;
        const wave2Phase = animTime1_2 - phaseOffset * 0.8;
        const verticalSpread = (normalized - 0.5) * 180;

        for (let j = 0; j < xPoints.length; j++) {
          const x = xPoints[j];
          const env = envelopes[j];
          const baseF = baseFreqs[j];

          const wave1 = Math.sin(baseF + wave1Phase) * 80;
          const wave2 = Math.cos(baseF * 1.3 + wave2Phase) * 45;
          const wave3 = Math.sin(baseF * 0.7 - animTime0_9) * 35;

          const spreadY = verticalSpread * Math.sin(baseF + time);
          const rawY = centerY + (spreadY + wave1 + wave2 + wave3) * env;

          let y = rawY;

          if (hoverForce > 0.01) {
            const dx = x - mouseX;
            const dy = rawY - mouseY;
            const distSq = dx * dx + dy * dy;
            const maxDistSq = 30000;

            if (distSq < maxDistSq) {
              const pull = (1 - distSq / maxDistSq) * hoverForce;
              y += (dy / Math.sqrt(distSq + 0.0001)) * (30 * pull * depth);
            }
          }

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.01;
    }

    function draw() {
      if (!shouldAnimate()) {
        animationFrameId = null;
        return;
      }
      drawFrame();
      animationFrameId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) start();
          else stop();
        });
      },
      { threshold: 0.05 }
    );

    if (parent) observer.observe(parent);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) start();
      else stop();
    };

    const onCurtainOpening = () => {
      isCurtainBlocking = false;
      start();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    drawFrame();
    if (isCurtainBlocking) {
      window.addEventListener('academic-intro-curtain-opening', onCurtainOpening, { once: true });
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener('academic-intro-curtain-opening', onCurtainOpening);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateRect);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
        observer.disconnect();
      }
    };
  }, []);

  return <canvas id="hero-waveform-canvas" ref={canvasRef} aria-hidden="true" />;
};

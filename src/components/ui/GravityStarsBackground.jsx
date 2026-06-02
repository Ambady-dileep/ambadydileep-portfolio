'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

export function GravityStarsBackground({
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  glowAnimation = 'ease',
  movementSpeed = 0.3,
  mouseInfluence = 100,
  mouseGravity = 'attract',
  gravityStrength = 75,
  starsInteraction = false,
  starsInteractionType = 'bounce',
  className,
  ...props
}) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);
  const starsRef = React.useRef([]);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = React.useState(1);
  const [canvasSize, setCanvasSize] = React.useState({ width: 800, height: 600 });
  const [isVisible, setIsVisible] = React.useState(false);

  const readColor = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return '#ffffff';
    return getComputedStyle(el).color || '#ffffff';
  }, []);

  const initStars = React.useCallback(
    (w, h) => {
      starsRef.current = Array.from({ length: starsCount }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = movementSpeed * (0.5 + Math.random() * 0.5);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * starsSize + 0.5,
          opacity: starsOpacity,
          baseOpacity: starsOpacity,
          mass: Math.random() * 0.5 + 0.5,
          glowMultiplier: 1,
          glowVelocity: 0,
        };
      });
    },
    [starsCount, movementSpeed, starsOpacity, starsSize]
  );

  const redistributeStars = React.useCallback((w, h) => {
    starsRef.current.forEach((p) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
    });
  }, []);

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    setDpr(nextDpr);
    canvas.width = Math.max(1, Math.floor(rect.width * nextDpr));
    canvas.height = Math.max(1, Math.floor(rect.height * nextDpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    setCanvasSize({ width: rect.width, height: rect.height });
    if (starsRef.current.length === 0) initStars(rect.width, rect.height);
    else redistributeStars(rect.width, rect.height);
  }, [initStars, redistributeStars]);

  const handlePointerMove = React.useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;
    if ('touches' in e) {
      const t = e.touches[0];
      if (!t) return;
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const updateStars = React.useCallback(() => {
    const w = canvasSize.width;
    const h = canvasSize.height;
    const mouse = mouseRef.current;

    for (let i = 0; i < starsRef.current.length; i++) {
      const p = starsRef.current[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence;
        const nx = dx / dist;
        const ny = dy / dist;
        const g = force * (gravityStrength * 0.001);
        if (mouseGravity === 'attract') {
          p.vx += nx * g;
          p.vy += ny * g;
        } else {
          p.vx -= nx * g;
          p.vy -= ny * g;
        }
        p.opacity = Math.min(1, p.baseOpacity + force * 0.35);
        const targetGlow = 1 + force * 1.5;
        const currentGlow = p.glowMultiplier || 1;
        if (glowAnimation === 'ease') {
          p.glowMultiplier = currentGlow + (targetGlow - currentGlow) * 0.15;
        } else {
          p.glowMultiplier = targetGlow;
        }
      } else {
        p.opacity = Math.max(p.baseOpacity * 0.35, p.opacity - 0.02);
        const currentGlow = p.glowMultiplier || 1;
        p.glowMultiplier = Math.max(1, currentGlow + (1 - currentGlow) * 0.08);
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.999;
      p.vy *= 0.999;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }
  }, [canvasSize.width, canvasSize.height, mouseInfluence, mouseGravity, gravityStrength, glowAnimation]);

  const drawStars = React.useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const color = readColor();
      for (const p of starsRef.current) {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = glowIntensity * (p.glowMultiplier || 1) * 2;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
    [dpr, glowIntensity, readColor]
  );



  React.useEffect(() => {
    resizeCanvas();
    const container = containerRef.current;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resizeCanvas) : null;
    if (container && ro) ro.observe(container);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (ro && container) ro.disconnect();
    };
  }, [resizeCanvas]);

  React.useEffect(() => {
    if (starsRef.current.length === 0) initStars(canvasSize.width, canvasSize.height);
    else {
      starsRef.current.forEach((p) => {
        p.baseOpacity = starsOpacity;
        p.opacity = starsOpacity;
      });
    }
  }, [starsCount, starsOpacity, movementSpeed, canvasSize.width, canvasSize.height, initStars]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!isVisible) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      updateStars();
      drawStars(ctx);
      animRef.current = requestAnimationFrame(animate);
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [updateStars, drawStars, isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden text-[var(--text-subtle)]', className)}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      aria-hidden
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

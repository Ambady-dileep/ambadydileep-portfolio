import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Check if the device is mobile/touch-only
    const isMobile = window.matchMedia('(pointer: coarse)').matches || 
                     /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis');

    return () => {
      lenis.destroy();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.documentElement.classList.remove('lenis');
    };
  }, []);
}

import { useEffect, useState } from 'react';

export function useCursorSpotlight() {
  const [position, setPosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches || 
                     /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return position;
}

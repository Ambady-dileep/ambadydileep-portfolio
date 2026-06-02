import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useDeferredInit } from './useDeferredInit';

export function useMouseParallax(strength = 14) {
  const shouldInit = useDeferredInit(500);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smooth tracking
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (!shouldInit) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [strength, mouseX, mouseY, shouldInit]);

  return { x: springX, y: springY };
}

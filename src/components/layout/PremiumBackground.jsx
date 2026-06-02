import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDeferredInit } from "../../hooks/useDeferredInit";

export function PremiumBackground() {
  const shouldInit = useDeferredInit(400);
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!shouldInit) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let rafId;
    let pendingX = 50;
    let pendingY = 30;
    let updating = false;

    const updatePosition = () => {
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${pendingX}% ${pendingY}%, rgba(37, 99, 235, 0.09), transparent 65%)`;
      }
      updating = false;
    };

    const onMove = (e) => {
      pendingX = (e.clientX / window.innerWidth) * 100;
      pendingY = (e.clientY / window.innerHeight) * 100;

      if (!updating) {
        updating = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldInit]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[var(--bg)]" />

      {shouldInit && (
        <>
          <div className="absolute inset-0 mesh-gradient opacity-100" />

          <motion.div
            className="aurora-layer"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 0.55, 0.4],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="gradient-orb orb-1"
            initial={{ opacity: 0 }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: 0.45 }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="gradient-orb orb-2"
            initial={{ opacity: 0 }}
            animate={{ x: [0, -40, 0], y: [0, 25, 0], opacity: 0.45 }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="gradient-orb orb-3"
            initial={{ opacity: 0 }}
            animate={{ x: [0, 20, 0], y: [0, 30, 0], opacity: 0.45 }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div
        ref={spotlightRef}
        className="cursor-spotlight"
        style={{
          background: `radial-gradient(600px circle at 50% 30%, rgba(37, 99, 235, 0.09), transparent 65%)`,
        }}
      />

      <div className="noise-overlay" />
    </div>
  );
}

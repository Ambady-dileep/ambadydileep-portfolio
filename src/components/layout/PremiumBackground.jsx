import { motion } from "framer-motion";
import { useCursorSpotlight } from "../../hooks/useCursorSpotlight";

export function PremiumBackground() {
  const spotlight = useCursorSpotlight();

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <div className="absolute inset-0 mesh-gradient opacity-100" />

      <motion.div
        className="aurora-layer"
        animate={{
          opacity: [0.4, 0.55, 0.4],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="gradient-orb orb-1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="gradient-orb orb-2"
        animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="gradient-orb orb-3"
        animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="cursor-spotlight"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(37, 99, 235, 0.09), transparent 65%)`,
        }}
      />

      <div className="noise-overlay" />
    </div>
  );
}

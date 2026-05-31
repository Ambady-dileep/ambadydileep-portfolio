import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { fadeUp } from '../utils/motion';

export function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
      <motion.div
        className="text-center max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <p className="text-8xl font-bold text-[#2563EB]/20 select-none">404</p>
        <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">Page not found</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-[var(--radius-button)] bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors focus-ring shadow-lg shadow-blue-500/20"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

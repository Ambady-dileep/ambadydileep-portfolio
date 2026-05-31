import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ isDark, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center focus-ring transition-colors duration-300 hover:bg-[var(--text)]/8 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
      >
        <Sun className="w-[15px] h-[15px] text-[var(--text-muted)]" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
      >
        <Moon className="w-[15px] h-[15px] text-[var(--text-muted)]" strokeWidth={1.5} />
      </motion.div>
    </button>
  );
}

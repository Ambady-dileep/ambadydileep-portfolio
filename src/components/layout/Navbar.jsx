import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../../data/site';
import { ThemeToggle } from './ThemeToggle';

export function Navbar({ activeId, isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none pt-4 sm:pt-5">
      <motion.nav
        aria-label="Main navigation"
        className="pointer-events-auto nav-pill glass flex items-center gap-0.5"
        initial={false}
        animate={{ scale: scrolled ? 0.96 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Desktop Navbar (MD & Up) */}
        <ul className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`relative px-3.5 lg:px-4 py-1.5 text-[13px] font-normal tracking-[-0.01em] rounded-full transition-colors duration-300 focus-ring ${
                  activeId === link.id
                    ? 'text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-pill-indicator"
                    className="absolute inset-0 bg-[var(--text)]/8 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            </li>
          ))}
          <li className="flex items-center pl-1 ml-0.5 border-l border-[var(--border)]">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </li>
        </ul>

        {/* Mobile Navbar (Below MD) */}
        <ul className="flex md:hidden items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`relative px-1.5 min-[350px]:px-2 min-[375px]:px-2.5 min-[390px]:px-3 py-1 text-[10.5px] min-[350px]:text-[11px] min-[375px]:text-[12px] font-normal tracking-[-0.01em] rounded-full transition-colors duration-300 focus-ring ${
                  activeId === link.id
                    ? 'text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-pill-indicator-mobile"
                    className="absolute inset-0 bg-[var(--text)]/8 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            </li>
          ))}
          <li className="flex items-center pl-1 border-l border-[var(--border)] ml-0.5">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </li>
        </ul>
      </motion.nav>
    </header>
  );
}

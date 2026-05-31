import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  download,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.2);

  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-[-0.01em] rounded-full transition-all duration-300 focus-ring';
  const variants = {
    primary:
      'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20',
    gradient:
      'btn-gradient text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    secondary:
      'glass text-[var(--text)] hover:bg-[var(--bg-muted)]',
    ghost: 'text-[var(--text-muted)] hover:text-[var(--text)]',
  };

  const combined = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center justify-center gap-2 w-full h-full transition-transform duration-200 ease-out"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={combined}
        download={download}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combined}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {inner}
    </motion.button>
  );
}

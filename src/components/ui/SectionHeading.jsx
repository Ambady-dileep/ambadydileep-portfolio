import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';

export function SectionHeading({ label, title, align = 'left' }) {
  return (
    <motion.div
      className={`mb-8 md:mb-10 ${align === 'center' ? 'text-center mx-auto' : 'max-w-lg'}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      {label && (
        <p className="text-[11px] font-normal tracking-[0.18em] uppercase text-[var(--text-subtle)] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.035em] text-[var(--text)] leading-[1.1]">
        {title}
      </h2>
    </motion.div>
  );
}

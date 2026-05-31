import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text = '',
  tag = 'p',
  className = '',
  delay = 0.04,        // stagger between chars (seconds)
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],  // custom spring-like ease
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  threshold = 0.2,
  once = true,
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  // Split into words, then chars — preserves spacing
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { ...from },
    visible: (i) => ({
      ...to,
      transition: {
        duration,
        ease,
      },
    }),
  };

  const Tag = tag;
  let charIndex = 0;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ textAlign, display: 'block' }}
      aria-label={text}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onAnimationComplete={onLetterAnimationComplete}
        style={{ display: 'inline' }}
        aria-hidden="true"
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word.split('').map((char) => {
              const idx = charIndex++;
              return (
                <motion.span
                  key={idx}
                  custom={idx}
                  variants={charVariants}
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, opacity',
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {/* Space between words */}
            {wi < words.length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
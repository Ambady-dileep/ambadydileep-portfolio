import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';

export function AnimateOnScroll({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Compass, Target } from 'lucide-react';
import { about } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

export function About() {
  return (
    <section id="about" className="section-pad section-overlap relative section-blend">
      <div className="section-container max-w-4xl">
        <SectionHeading label="About" title="Engineer & builder" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] font-light tracking-[-0.01em]"
          >
            {about.statement}
          </motion.p>

          <div className="space-y-3">
            <motion.div variants={fadeUp} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Compass className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={1.5} />
                <h3 className="text-[13px] font-medium text-[var(--text)] tracking-[-0.01em]">
                  Development Philosophy
                </h3>
              </div>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed font-light">
                {about.philosophy}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Target className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={1.5} />
                <h3 className="text-[13px] font-medium text-[var(--text)] tracking-[-0.01em]">
                  Career Vision
                </h3>
              </div>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed font-light">
                {about.vision}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

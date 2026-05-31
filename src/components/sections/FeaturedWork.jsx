import { motion } from 'framer-motion';
import { projects } from '../../data/site';
import { MotionCarousel } from '../work/MotionCarousel';
import { ProjectSlideCard } from '../work/ProjectSlideCard';
import { fadeUp, viewportOnce } from '../../utils/motion';

const carouselOptions = {
  loop: true,
  align: 'center',
  containScroll: 'trimSnaps',
  dragFree: false,
};

export function FeaturedWork() {
  return (
    <section id="work" className="section-pad section-overlap relative section-blend w-full overflow-hidden">
      {/* Header Container retains the clean standard padding */}
      <div className="section-container mb-8 md:mb-10">
        <motion.div
          className="text-center max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="text-[11px] font-normal tracking-[0.18em] uppercase text-[var(--text-subtle)] mb-2">
            Work
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.035em] text-[var(--text)]">
            Featured Work
          </h2>
          <p className="mt-3 text-[13px] sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
            A selection of projects focused on full-stack development, modern web technologies,
            and real-world problem solving.
          </p>
        </motion.div>
      </div>

      {/* ── Outer bounds stripped of restriction constraints to allow true full-bleed width ── */}
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto">
        <MotionCarousel
          slides={projects}
          options={carouselOptions}
          renderSlide={(project, _index, isActive) => (
            <ProjectSlideCard project={project} isActive={isActive} />
          )}
        />
      </div>
    </section>
  );
}
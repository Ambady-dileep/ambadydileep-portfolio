import { motion } from 'framer-motion';
import { Compass, Target } from 'lucide-react';
import { about } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

export function About() {
  return (
    <section
      id="about"
      className="section-pad section-overlap relative section-blend"
    >
      <div className="section-container max-w-4xl">
        <SectionHeading label="About" title="Engineer & builder" />

        {/* ── Intro + Philosophy / Vision ───────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start"

        >
          {/* Left — intro paragraphs */}
          <motion.div variants={fadeUp} className="space-y-3">

            <p
              className="text-sm sm:text-base lg:text-lg text-[var(--text-muted)] leading-[1.75] font-light tracking-[-0.01em]"

            >
              {about.intro.description1}
            </p>
            <p
              className="text-sm sm:text-base lg:text-lg text-[var(--text-muted)] leading-[1.75] font-light tracking-[-0.01em]"

            >
              {about.intro.description2}
            </p>
          </motion.div>

          {/* Right — philosophy & vision cards */}
          <div className="space-y-3">
            <motion.div variants={fadeUp} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Compass
                  className="w-3.5 h-3.5 text-[#2563EB]"
                  strokeWidth={1.5}
                />
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
                <Target
                  className="w-3.5 h-3.5 text-[#2563EB]"
                  strokeWidth={1.5}
                />
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

        {/* ── Education & Qualifications ─────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 sm:mt-16"

        >
          <motion.h2
            variants={fadeUp}
            className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-widest mb-5 sm:mb-8"

          >
            Education & Qualifications
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">


            {/* SSLC */}
            <motion.div variants={fadeUp} className="glass rounded-xl p-4 sm:p-5 space-y-1">

              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-light">

                2022 · SSLC
              </p>
              <p className="text-lg sm:text-[22px] font-semibold text-[var(--text)] tracking-tight leading-none">

                {about.stats[0].value}
              </p>
              <p className="text-[11px] sm:text-[12px] text-[var(--text-muted)] font-light">

                Thiruvampady HSS
              </p>
            </motion.div>

            {/* Higher Secondary */}
            <motion.div variants={fadeUp} className="glass rounded-xl p-4 sm:p-5 space-y-1">

              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-light">

                2024 · Plus Two
              </p>
              <p className="text-lg sm:text-[22px] font-semibold text-[var(--text)] tracking-tight leading-none">

                {about.stats[1].value}
              </p>
              <p className="text-[11px] sm:text-[12px] text-[var(--text-muted)] font-light">

                Commerce with CS
              </p>
            </motion.div>

            {/* Full Stack Training */}
            <motion.div variants={fadeUp} className="glass rounded-xl p-4 sm:p-5 space-y-1">

              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-light">

                2024–26 · Training
              </p>
              <p className="text-sm sm:text-[15px] font-semibold text-[var(--text)] tracking-tight leading-snug">

                Full Stack Dev
              </p>
              <p className="text-[11px] sm:text-[12px] text-[var(--text-muted)] font-light">

                Brototype · {about.stats[2].value} yrs
              </p>
            </motion.div>

            {/* BCA */}
            <motion.div variants={fadeUp} className="glass rounded-xl p-4 sm:p-5 space-y-1">

              <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-light">

                {about.stats[3].value} · Degree
              </p>
              <p className="text-sm sm:text-[15px] font-semibold text-[var(--text)] tracking-tight leading-snug">

                BCA
              </p>
              <p className="text-[11px] sm:text-[12px] text-[var(--text-muted)] font-light">

                IGNOU · Pursuing
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
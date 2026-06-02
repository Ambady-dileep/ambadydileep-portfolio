import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { heroStats, siteConfig } from '../../data/site';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { MagneticButton } from '../ui/MagneticButton';
import { fadeUp, staggerContainer } from '../../utils/motion';
import SplitText from '../ui/SplitText';
import LightRays from '../ui/LightRays';

export function Hero({ isDark }) {
  const [imgError, setImgError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const scrollYImage = useTransform(scrollY, [0, 500], [0, 24]);
  const mouse = useMouseParallax(5);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const rayColor = isDark ? '#ffffff' : '#f5f5f0';

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      {/* Light Rays Background Effect */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor={rayColor}
          raysSpeed={0.4}
          lightSpread={isMobile ? 1.6 : 1.3}
          rayLength={isMobile ? 4.2 : 2.4}
          fadeDistance={isMobile ? 3.2 : 1.6}
          saturation={1.0}
          followMouse={!isMobile}
          mouseInfluence={0.1}
          noiseAmount={0.015}
          distortion={0.01}
          pulsating={false}
        />
        <div
          style={{
            position: 'absolute',
            inset: isMobile ? '35% 0 0 0' : '65% 0 0 0',
            background: isDark
              ? 'linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.4) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(248,250,252,0.4) 100%)'
          }}
        />
      </div>

      {/* ── Content Container ── */}
      <div
        className="
          relative
          z-10
          w-full
          flex
          items-center
          justify-center
          min-h-auto
          lg:min-h-screen
          px-6
          md:px-10
          lg:px-12
          pt-24
          lg:pt-32
          pb-16
        "
        style={{
          zIndex: 2,
          paddingTop: isMobile ? '80px' : '110px',
          paddingBottom: isMobile ? '48px' : '72px',
          paddingLeft: isMobile ? '24px' : '5%',
          paddingRight: isMobile ? '24px' : '5%',
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="
            mx-auto
            w-full
            max-w-7xl
            flex
            flex-col
            lg:flex-row
            items-center
            justify-center
            lg:justify-between
            gap-10
            lg:gap-16
          "
        >
          {/* ── LEFT AREA: Identity + Premium Status Badge ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '1 1 45%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: '12px',
              width: isMobile ? '100%' : 'auto',
              order: isMobile ? 1 : 0,
            }}
          >
            <SplitText
              text={siteConfig.role}
              tag="p"
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--text-subtle)]"
              delay={0.02}
              duration={0.4}
              ease={[0.22, 1, 0.36, 1]}
              from={{ opacity: 0, y: 6 }}
              to={{ opacity: 1, y: 0 }}
              textAlign={isMobile ? 'center' : 'left'}
              threshold={0.1}
            />
            
            <SplitText
              text={siteConfig.name}
              tag="h1"
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold tracking-[-0.045em] text-[var(--text)] leading-[1.05]"
              delay={0.03}
              duration={0.6}
              ease={[0.22, 1, 0.36, 1]}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              textAlign={isMobile ? 'center' : 'left'}
              threshold={0.1}
            />

            {/* Apple-Style Premium Availability Badge */}
            <motion.div 
              variants={fadeUp}
              className="glass px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-[var(--shadow-soft)] border border-[var(--glass-border)]"
              style={{ marginTop: '4px' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium tracking-tight text-[var(--text-muted)]">
                Available for Freelance Projects
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-1.5 text-[12px] text-[var(--text-subtle)] font-light"
              style={{
                justifyContent: isMobile ? 'center' : 'flex-start',
                marginTop: '6px',
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} />
              <span>Kerala, India</span>
            </motion.div>
          </motion.div>

          {/* ── CENTER AREA: Clean Portrait Card (Zero Borders) ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: isMobile ? 0 : 1,
            }}
          >
            <motion.div style={{ y: scrollYImage }}>
              <motion.div
                style={{ x: mouse.x, y: mouse.y }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="relative"
              >
                {/* Minimal Deep Ambient Glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-24px',
                    borderRadius: '32px',
                    background: isDark
                      ? 'radial-gradient(ellipse at top, rgba(37,99,235,0.15) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse at top, rgba(37,99,235,0.12) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }}
                />
                
                {/* Image Structure - Completely borderless/frameless */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ width: isMobile ? '250px' : '310px' }}
                >
                  <div
                    className="w-full overflow-hidden bg-[var(--bg-muted)]"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {!imgError ? (
                      <img
                        src={siteConfig.heroImagePath}
                        alt={`${siteConfig.name} — portrait`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                        onError={() => setImgError(true)}
                        loading="eager"
                        fetchPriority="high"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
                        style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.06), transparent)' }}
                      >
                        <span className="text-3xl font-semibold tracking-[-0.04em] text-blue-500/20">AD</span>
                        <p className="text-[10px] text-[var(--text-subtle)] font-light">
                          Add asset to <code className="text-[var(--text-muted)]">public/portfolio.png</code>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT AREA: Engineered Conversion Metrics + CTAs ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '1 1 40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-end',
              gap: '20px',
              width: isMobile ? '100%' : 'auto',
              order: 2,
            }}
          >
            {/* Conversion Stats Deck */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                width: isMobile ? '100%' : '310px',
              }}
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl flex flex-col items-center text-center border border-[var(--border)] shadow-[var(--shadow-soft)]"
                  style={{ padding: '14px 8px' }}
                >
                  <p
                    className="font-semibold text-[var(--text)] tracking-[-0.03em]"
                    style={{ fontSize: isMobile ? '15px' : '17px' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[var(--text-subtle)] mt-1 font-normal tracking-tight leading-tight"
                    style={{ fontSize: '10px' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* High-Contrast Conversion Actions */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: isMobile ? '100%' : '310px',
                marginTop: isMobile ? '8px' : '0',
              }}
            >
              <MagneticButton onClick={scrollToWork} style={{ width: '100%', justifyContent: 'center' }}>
                View Featured Work
                <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
              </MagneticButton>
              
              <MagneticButton
                href={siteConfig.resumePath}
                variant="secondary"
                download="AmbadyDileepResume.pdf"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download className="w-4 h-4 mr-1" strokeWidth={1.8} />
                Download Resume
              </MagneticButton>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
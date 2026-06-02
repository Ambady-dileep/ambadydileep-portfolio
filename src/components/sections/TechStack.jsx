import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GravityStarsBackground } from '../ui/GravityStarsBackground';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { siteConfig } from '../../data/site';
import { TechBrandIcon, getBrandHex } from '../ui/TechBrandIcon';

// ─── Data ─────────────────────────────────────────────────────────────────────

const RINGS = [
  {
    items: [
      { id: 'react',      name: 'React',      slug: 'react'      },
      { id: 'django',     name: 'Django',      slug: 'django'     },
      { id: 'python',     name: 'Python',      slug: 'python'     },
      { id: 'postgresql', name: 'PostgreSQL',  slug: 'postgresql' },
      { id: 'javascript', name: 'JavaScript',  slug: 'javascript' },
    ],
    radiusFraction: 0.245,
    speed: 0.00018,
    dir: 1,
  },
  {
    items: [
      { id: 'html5',     name: 'HTML5',         slug: 'html5'      },
      { id: 'css',       name: 'CSS',           slug: 'css'        },
      { id: 'tailwind',  name: 'Tailwind CSS',  slug: 'tailwindcss'},
      { id: 'vite',      name: 'Vite',          slug: 'vite'       },
      { id: 'nodedotjs', name: 'Node.js',       slug: 'nodedotjs'  },
      { id: 'framer',    name: 'Framer Motion', slug: 'framer'     },
      { id: 'redux',     name: 'Redux',         slug: 'redux'      },
      { id: 'jwt',       name: 'JWT',           slug: 'jwt'        },
    ],
    radiusFraction: 0.385,
    speed: 0.00012,
    dir: -1,
  },
  {
    items: [
      { id: 'git',        name: 'Git',        slug: 'git'        },
      { id: 'github',     name: 'GitHub',     slug: 'github'     },
      { id: 'mongodb',    name: 'MongoDB',    slug: 'mongodb'    },
      { id: 'mysql',      name: 'MySQL',      slug: 'mysql'      },
      { id: 'sqlalchemy', name: 'SQLAlchemy', slug: 'sqlalchemy' },
      { id: 'postman',    name: 'Postman',    slug: 'postman'    },
      { id: 'vscode',     name: 'VS Code',    slug: 'vscode'     },
      { id: 'axios',      name: 'Axios',      slug: 'axios'      },
      { id: 'npm',        name: 'NPM',        slug: 'npm'        },
    ],
    radiusFraction: 0.51,
    speed: 0.000085,
    dir: 1,
  },
];

export const orbitTechnologies = RINGS.flatMap(r => r.items);

// ─── Viewport hook ─────────────────────────────────────────────────────────────

function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const isMobile = width < 640;
  const stageSize = isMobile
    ? Math.max(280, Math.min(340, Math.floor(width * 0.92)))
    : width < 768
    ? 340
    : width < 1024
    ? 380
    : 440;
  const itemSize = isMobile ? 34 : width < 768 ? 38 : width < 1024 ? 41 : 44;
  const avatarSize = isMobile ? 62 : width < 768 ? 72 : 92;

  return { isMobile, stageSize, itemSize, avatarSize };
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function CenterAvatar({ size = 92 }) {
  const [err, setErr] = useState(false);
  const initials = siteConfig.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          inset: `${-size * 0.3}px`,
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{
          width: size,
          height: size,
          border: '1.5px solid var(--border)',
          background: 'var(--bg-muted)',
        }}
      >
        {!err ? (
          <img
            src={siteConfig.heroImagePath}
            alt={siteConfig.name}
            className="w-full h-full object-cover object-center"
            onError={() => setErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-medium"
            style={{ fontSize: size * 0.28, color: 'rgba(37,99,235,0.65)' }}
          >
            {initials}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Single icon node ─────────────────────────────────────────────────────────

function IconNode({ item, size, isActive, onEnter, onLeave, domRef }) {
  const hex = getBrandHex(item.slug);
  return (
    <button
      ref={domRef}
      type="button"
      aria-label={item.name}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onTouchStart={(e) => { 
        e.preventDefault(); 
        onEnter(item); 
      }}
      className="absolute flex items-center justify-center rounded-full focus-visible:outline-none select-none"
      style={{
        width:      size,
        height:     size,
        marginLeft: -size / 2,
        marginTop:  -size / 2,
        border: isActive
          ? `1px solid #${hex}55`
          : '1px solid rgba(255,255,255,0.08)',
        background: isActive
          ? `radial-gradient(circle at 40% 35%, #${hex}20, transparent 70%)`
          : 'var(--bg-muted)',
        boxShadow: isActive
          ? `0 0 18px #${hex}44, 0 0 40px #${hex}18`
          : 'none',
        transform: isActive ? 'scale(1.18)' : 'scale(1)',
        transition:
          'transform 0.22s ease, border-color 0.22s, background 0.22s, box-shadow 0.22s',
        cursor: 'pointer',
        zIndex: isActive ? 20 : 10,
        touchAction: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <TechBrandIcon slug={item.slug} className="w-[52%] h-[52%] pointer-events-none" />
    </button>
  );
}

// ─── Radial orbit (all screen sizes) ─────────────────────────────────────────

function TechRadialIntro({ stageSize = 440, itemSize = 44, avatarSize = 92, className = '' }) {
  const [activeItem, setActiveItem] = useState(null);
  const anglesRef  = useRef([]);
  const rafRef     = useRef(null);
  const lastTsRef  = useRef(null);
  const nodeDomRefs = useRef({});

  const nodes = useMemo(() => {
    const flat = [];
    RINGS.forEach(ring => {
      const r = ring.radiusFraction * stageSize;
      const n = ring.items.length;
      ring.items.forEach((item, i) => {
        flat.push({
          id:    item.id,
          item,
          radius: r,
          speed:  ring.speed,
          dir:    ring.dir,
          angle:  (2 * Math.PI / n) * i - Math.PI / 2,
        });
      });
    });
    anglesRef.current = flat.map(n => n.angle);
    return flat;
  }, [stageSize]);

  useEffect(() => {
    const cx = stageSize / 2;
    const cy = stageSize / 2;
    lastTsRef.current = null;

    function tick(ts) {
      const dt = lastTsRef.current
        ? Math.min(ts - lastTsRef.current, 50)
        : 16;
      lastTsRef.current = ts;

      nodes.forEach((node, i) => {
        anglesRef.current[i] += node.speed * node.dir * dt;
        const a = anglesRef.current[i];
        const x = cx + node.radius * Math.cos(a);
        const y = cy + node.radius * Math.sin(a);
        
        const domEl = nodeDomRefs.current[node.id];
        if (domEl) {
          domEl.style.left = `${x}px`;
          domEl.style.top = `${y}px`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stageSize, nodes]);

  useEffect(() => {
    const clearTouch = () => setActiveItem(null);
    window.addEventListener('touchstart', clearTouch, { passive: true });
    return () => window.removeEventListener('touchstart', clearTouch);
  }, []);

  const handleEnter = (item) => setActiveItem(item);
  const handleLeave = ()     => setActiveItem(null);

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: stageSize, height: stageSize }}
      onMouseLeave={handleLeave} 
    >
      {/* Ambient fill */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 62%)',
        }}
      />

      {/* Orbiting icons */}
      {nodes.map(node => {
        return (
          <IconNode
            key={node.id}
            item={node.item}
            domRef={el => {
              if (el) {
                nodeDomRefs.current[node.id] = el;
              } else {
                delete nodeDomRefs.current[node.id];
              }
            }}
            size={itemSize}
            isActive={activeItem?.id === node.id}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        );
      })}

      {/* Center: avatar + label */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="flex flex-col items-center">
          <div className="pointer-events-auto">
            <CenterAvatar size={avatarSize} />
          </div>

          {/* Fixed-height slot so avatar never shifts */}
          <div
            style={{
              height:         24,
              marginTop:      6,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.14 }}
                  className="font-medium whitespace-nowrap pointer-events-none"
                  style={{
                    fontSize:       '10px',
                    color:          'var(--text)',
                    background:     'var(--glass)',
                    border:         '1px solid var(--glass-border)',
                    backdropFilter: 'blur(10px)',
                    padding:        '2px 9px',
                    borderRadius:   '20px',
                  }}
                >
                  {activeItem.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TechStack() {
  const { stageSize, itemSize, avatarSize } = useViewport();

  return (
    <section
      id="stack"
      className="section-pad-compact section-overlap relative overflow-hidden"
      style={{ minHeight: stageSize + 160 }}
    >
      <GravityStarsBackground
        starsCount={60}
        starsSize={1.5}
        starsOpacity={0.4}
        glowIntensity={10}
        movementSpeed={0.15}
        mouseInfluence={50}
        gravityStrength={40}
        glowAnimation="ease"
      />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-8 max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="text-[11px] font-normal tracking-[0.18em] uppercase text-[var(--text-subtle)] mb-2">
            Stack
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.035em] text-[var(--text)]">
            Technologies I Work With
          </h2>
          <p className="mt-2 text-[13px] text-[var(--text-muted)] font-light leading-relaxed">
            Building modern web applications with a carefully selected technology stack.
          </p>
        </motion.div>

        {/* Orbit */}
        <motion.div
          className="flex justify-center px-2"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechRadialIntro
            stageSize={stageSize}
            itemSize={itemSize}
            avatarSize={avatarSize}
          />
        </motion.div>
      </div>
    </section>
  );
}

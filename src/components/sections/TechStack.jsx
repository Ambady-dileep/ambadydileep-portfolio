import { useEffect, useRef, useState } from 'react';
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
    ],
    radiusFraction: 0.51,
    speed: 0.000085,
    dir: 1,
  },
];

export const orbitTechnologies = RINGS.flatMap(r => r.items);

// ─── Viewport hook ─────────────────────────────────────────────────────────────
// Now always returns a stageSize — on mobile it's sized to fit the screen width.

function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Mobile: use 92% of screen width, capped at 340, min 280
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

function IconNode({ item, x, y, size, isActive, onEnter, onLeave }) {
  const hex = getBrandHex(item.slug);
  return (
    <button
      type="button"
      aria-label={item.name}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onTouchStart={(e) => { e.preventDefault(); onEnter(item); }}
      onTouchEnd={() => setTimeout(onLeave, 800)}
      onFocus={() => onEnter(item)}
      onBlur={onLeave}
      className="absolute flex items-center justify-center rounded-full focus-visible:outline-none"
      style={{
        width:      size,
        height:     size,
        left:       x,
        top:        y,
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
      }}
    >
      <TechBrandIcon slug={item.slug} className="w-[52%] h-[52%]" />
    </button>
  );
}

// ─── Radial orbit (all screen sizes) ─────────────────────────────────────────

function TechRadialIntro({ stageSize = 440, itemSize = 44, avatarSize = 92, className = '' }) {
  const [activeItem, setActiveItem] = useState(null);
  const [positions,  setPositions]  = useState([]);
  const anglesRef  = useRef([]);
  const rafRef     = useRef(null);
  const lastTsRef  = useRef(null);
  const activeRef  = useRef(null);
  const nodesRef   = useRef([]);

  useEffect(() => {
    const cx = stageSize / 2;
    const cy = stageSize / 2;
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
    nodesRef.current  = flat;
    anglesRef.current = flat.map(n => n.angle);
    setPositions(flat.map(n => ({
      id: n.id,
      x:  cx + n.radius * Math.cos(n.angle),
      y:  cy + n.radius * Math.sin(n.angle),
    })));
  }, [stageSize]);

  useEffect(() => {
    const cx = stageSize / 2;
    const cy = stageSize / 2;

    function tick(ts) {
      const dt = lastTsRef.current
        ? Math.min(ts - lastTsRef.current, 50)
        : 16;
      lastTsRef.current = ts;

      const next = nodesRef.current.map((node, i) => {
        if (activeRef.current !== node.id) {
          anglesRef.current[i] += node.speed * node.dir * dt;
        }
        const a = anglesRef.current[i];
        return { id: node.id, x: cx + node.radius * Math.cos(a), y: cy + node.radius * Math.sin(a) };
      });

      setPositions(next);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stageSize]);

  const handleEnter = (item) => { activeRef.current = item.id; setActiveItem(item); };
  const handleLeave = ()     => { activeRef.current = null;    setActiveItem(null); };

  const posMap = {};
  positions.forEach(p => { posMap[p.id] = p; });

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: stageSize, height: stageSize }}
    >
      {/* Ambient fill */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 62%)',
        }}
      />

      {/* Orbiting icons */}
      {nodesRef.current.map(node => {
        const pos = posMap[node.id];
        if (!pos) return null;
        return (
          <IconNode
            key={node.id}
            item={node.item}
            x={pos.x}
            y={pos.y}
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

        {/* Orbit — same on all screen sizes, just scaled */}
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
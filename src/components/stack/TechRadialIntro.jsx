import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '../../data/site';
import { TechBrandIcon, getBrandHex } from '../ui/TechBrandIcon';

// ─── Ring definitions ─────────────────────────────────────────────────────────

const RINGS = [
  {
    items: [
      { id: 'react',      name: 'React',      slug: 'react'      },
      { id: 'django',     name: 'Django',      slug: 'django'     },
      { id: 'python',     name: 'Python',      slug: 'python'     },
      { id: 'postgresql', name: 'PostgreSQL',  slug: 'postgresql' },
      { id: 'javascript', name: 'JavaScript',  slug: 'javascript' },
    ],
    radiusFraction: 0.245,  // fraction of stageSize
    speed:          0.00018,
    dir:            1,
  },
  {
    items: [
      { id: 'html5',      name: 'HTML5',         slug: 'html5'      },
      { id: 'css',        name: 'CSS',           slug: 'css'        },
      { id: 'tailwind',   name: 'Tailwind CSS',  slug: 'tailwindcss'},
      { id: 'vite',       name: 'Vite',          slug: 'vite'       },
      { id: 'nodedotjs',  name: 'Node.js',       slug: 'nodedotjs'  },
      { id: 'framer',     name: 'Framer Motion', slug: 'framer'     },
    ],
    radiusFraction: 0.385,
    speed:          0.00012,
    dir:            -1,
  },
  {
    items: [
      { id: 'git',        name: 'Git',        slug: 'git'       },
      { id: 'github',     name: 'GitHub',     slug: 'github'    },
      { id: 'mongodb',    name: 'MongoDB',    slug: 'mongodb'   },
      { id: 'mysql',      name: 'MySQL',      slug: 'mysql'     },
      { id: 'sqlalchemy', name: 'SQLAlchemy', slug: 'sqlalchemy'},
      { id: 'postman',    name: 'Postman',    slug: 'postman'   },
      { id: 'vscode',     name: 'VS Code',    slug: 'vscode'    },
    ],
    radiusFraction: 0.51,
    speed:          0.000085,
    dir:            1,
  },
];

export const orbitTechnologies = RINGS.flatMap(r => r.items);

// ─── Center avatar ────────────────────────────────────────────────────────────

// Avatar — no layout shift ever
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
        style={{ inset: `-${size * 0.3}px`, background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="relative rounded-full overflow-hidden flex-shrink-0"
        style={{ width: size, height: size, border: '1.5px solid var(--border)', background: 'var(--bg-muted)' }}
      >
        {!err ? (
          <img
            src={siteConfig.heroImagePath}
            alt={siteConfig.name}
            className="w-full h-full object-cover object-center"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-medium" style={{ color: 'rgba(37,99,235,0.65)' }}>
            {initials}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Icon node ────────────────────────────────────────────────────────────────

function IconNode({ item, x, y, size, onEnter, onLeave, isActive }) {
  const hex = getBrandHex(item.slug);
  return (
    <button
      type="button"
      aria-label={item.name}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(item)}
      onBlur={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onEnter(item);
      }}
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
        transition: 'transform 0.22s ease, border-color 0.22s, background 0.22s, box-shadow 0.22s',
        cursor: 'pointer',
        zIndex: isActive ? 20 : 10,
      }}
    >
      <TechBrandIcon slug={item.slug} className="w-[52%] h-[52%]" />
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TechRadialIntro({ stageSize = 440, itemSize = 44, className = '' }) {
  const [activeItem, setActiveItem] = useState(null);
  const [positions, setPositions] = useState([]);   // { id, x, y }[]
  const anglesRef  = useRef([]);                     // mutable angle per icon
  const rafRef     = useRef(null);
  const lastTsRef  = useRef(null);
  const activeRef  = useRef(null);                   // track hovered id without re-render

  // Build flat node list once
  const nodes = useRef([]);
  useEffect(() => {
    const cx = stageSize / 2;
    const cy = stageSize / 2;
    const flat = [];
    RINGS.forEach(ring => {
      const r = ring.radiusFraction * stageSize;
      const n = ring.items.length;
      ring.items.forEach((item, i) => {
        flat.push({
          id:     item.id,
          item,
          radius: r,
          speed:  ring.speed,
          dir:    ring.dir,
          angle:  (2 * Math.PI / n) * i - Math.PI / 2,
        });
      });
    });
    nodes.current    = flat;
    anglesRef.current = flat.map(n => n.angle);

    // Initial positions
    setPositions(flat.map(n => ({
      id: n.id,
      x:  cx + n.radius * Math.cos(n.angle),
      y:  cy + n.radius * Math.sin(n.angle),
    })));
  }, [stageSize]);

  // RAF loop
  useEffect(() => {
    const cx = stageSize / 2;
    const cy = stageSize / 2;

    function tick(ts) {
      const dt = lastTsRef.current ? Math.min(ts - lastTsRef.current, 50) : 16;
      lastTsRef.current = ts;

      const next = nodes.current.map((node, i) => {
        // Pause only the hovered icon's angle advancement
        if (activeRef.current !== node.id) {
          anglesRef.current[i] += node.speed * node.dir * dt;
        }
        const a = anglesRef.current[i];
        return {
          id: node.id,
          x:  cx + node.radius * Math.cos(a),
          y:  cy + node.radius * Math.sin(a),
        };
      });

      setPositions(next);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stageSize]);

  const handleEnter = useCallback((item) => {
    activeRef.current = item.id;
    setActiveItem(item);
  }, []);

  const handleLeave = useCallback(() => {
    activeRef.current = null;
    setActiveItem(null);
  }, []);

  // Build position lookup
  const posMap = {};
  positions.forEach(p => { posMap[p.id] = p; });

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: stageSize, height: stageSize }}
      onClick={handleLeave}
    >
      {/* Very faint ambient fill */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 62%)',
        }}
      />

      {/* Icon nodes — positioned via left/top, NEVER rotated */}
      {positions.map(pos => {
        const item = orbitTechnologies.find(t => t.id === pos.id);
        if (!item) return null;
        return (
          <IconNode
            key={pos.id}
            item={item}
            x={pos.x}
            y={pos.y}
            size={itemSize}
            isActive={activeItem?.id === pos.id}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        );
      })}

      {/* Center */}
      <div
        className="absolute z-30 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="pointer-events-auto">
          <CenterAvatar size={stageSize < 340 ? 64 : stageSize < 400 ? 76 : 92} />
        </div>

        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.span
              key={activeItem.id}
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="font-medium whitespace-nowrap pointer-events-none"
              style={{
                color:          'var(--text)',
                background:     'var(--glass)',
                border:         '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                padding:        stageSize < 400 ? '2px 8px' : '3px 11px',
                borderRadius:   '20px',
                fontSize:       stageSize < 400 ? '10px' : '11px',
              }}
            >
              {activeItem.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Mobile grid ──────────────────────────────────────────────────────────────

export function TechOrbitGrid({ items, className = '' }) {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-5 gap-2 max-w-sm mx-auto ${className}`}>
      {items.map(item => {
        const hex = getBrandHex(item.slug);
        return (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 border transition-colors duration-250"
            style={{
              borderColor: 'transparent',
              background: `linear-gradient(150deg, #${hex}0e, transparent 70%)`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `#${hex}30`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <TechBrandIcon slug={item.slug} className="w-5 h-5" />
            <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-light text-center leading-tight">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { reduceMotion } from '../utils/gsap';

/* Very slow, slightly different durations per layer — motion felt, not seen. */
const DRIFT_DURATIONS = { a: 38, b: 46, c: 54, e: 70 } as const;

/**
 * Scroll parallax per layer — different speeds create the depth sensation.
 * Small values: layers slide gently apart as the user scrolls through the Hero.
 * Range is in pixels (≈ one Hero height) so the drift spreads smoothly over
 * the whole section instead of snapping to full offset after 1px.
 */
const PARALLAX_RANGE: number[] = [0, 800];
const PARALLAX_OUTPUT: Record<'a' | 'b' | 'c' | 'thread', number[]> = {
  a: [0, 120],
  b: [0, -60],
  c: [0, 180],
  thread: [0, -100],
};
const PARALLAX_OUTPUT_M: Record<'a' | 'b' | 'c', number[]> = {
  a: [0, 60],
  b: [0, -30],
  c: [0, 90],
};

/** Per-layer motion: each ribbon keeps its own base angle (baked into x/rotate). */
const RIBBON_MOTION: Record<'a' | 'b' | 'c' | 'thread', { x: number[]; y: number[]; rotate: number[] }> = {
  a: { x: [0, 50, -30, 0], y: [0, 14, -22, 0], rotate: [-16, -14.5, -18, -16] },
  b: { x: [0, -60, 34, 0], y: [0, 22, -16, 0], rotate: [-12, -13.5, -10, -12] },
  c: { x: [0, 44, -26, 0], y: [0, -20, 12, 0], rotate: [-10, -8.5, -12.5, -10] },
  thread: { x: [0, 70, -44, 0], y: [0, -14, 18, 0], rotate: [-14, -12, -16.5, -14] },
};

/** Per-layer glow gain — the thread pops, far layers stay whispered. */
const STRENGTH: Record<'a' | 'b' | 'c' | 'thread', number> = { a: 0.75, b: 1, c: 0.85, thread: 1.15 };

/**
 * One "digital light ribbon": a wide translucent band plus a thin bright
 * core, fading out at both ends along its own axis — real waves, not blobs.
 * Pure SVG (inline gradient defs), animated on transform only. When motion
 * is reduced (or on mobile) the same shapes render statically via the
 * `.hero-ribbon-static` wrapper, which carries the base tilt in CSS.
 */
function Ribbon({
  variant,
  className,
  duration = 0,
  delay = 0,
  animate,
  parallaxY,
}: {
  variant: keyof typeof RIBBON_MOTION;
  className: string;
  duration?: number;
  delay?: number;
  animate: boolean;
  parallaxY?: MotionValue<number>;
}) {
  const m = RIBBON_MOTION[variant];
  const s = STRENGTH[variant];

  const shape = (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        {/* Band: wide translucent stroke, brightest mid-way, fading at both ends */}
        <linearGradient id={`hero-band-${variant}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="28%" stopColor="#1d4ed8" stopOpacity={0.3 * s} />
          <stop offset="52%" stopColor="#3b82f6" stopOpacity={0.36 * s} />
          <stop offset="74%" stopColor="#2563eb" stopOpacity={0.26 * s} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* Core: thin bright stroke inside the band */}
        <linearGradient id={`hero-core-${variant}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="34%" stopColor="#60a5fa" stopOpacity={0.28 * s} />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.42 * s} />
          <stop offset="66%" stopColor="#2563eb" stopOpacity={0.24 * s} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M 130 520 C 340 300, 470 610, 640 380 C 760 215, 900 330, 1060 170"
        fill="none"
        stroke={`url(#hero-band-${variant})`}
        strokeWidth={variant === 'thread' ? 90 : 150}
        strokeLinecap="round"
      />
      <path
        d="M 130 520 C 340 300, 470 610, 640 380 C 760 215, 900 330, 1060 170"
        fill="none"
        stroke={`url(#hero-core-${variant})`}
        strokeWidth={variant === 'thread' ? 26 : 46}
        strokeLinecap="round"
      />
    </svg>
  );

  if (!animate) {
    return (
      <motion.div
        aria-hidden="true"
        className={`hero-ribbon ${className}`}
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        <div className="hero-ribbon-static">{shape}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`hero-ribbon ${className}`}
      style={parallaxY ? { y: parallaxY } : undefined}
      animate={{ x: m.x, y: m.y, rotate: m.rotate }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {shape}
    </motion.div>
  );
}

/**
 * "Flowing digital light" — translucent luminous ribbons crossing the Hero,
 * several depth layers drifting at different speeds, deliberately calm zones
 * behind text and portrait. Independent decorative layer, pointer-events-none,
 * overflow contained — no layout impact. Theme adaptation (dark/light) is
 * handled purely in CSS so both themes get the full composition.
 */
export default function HeroBackground() {
  const reduced = reduceMotion();

  /* Scroll-linked depth: slow parallax while the Hero scrolls away.
     scrollY is smoothed through a spring so wheel jumps stay fluid. */
  const { scrollY } = useScroll();
  const scrollYSmooth = useSpring(scrollY, { stiffness: 110, damping: 28, mass: 0.5 });
  const parallaxA = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT.a);
  const parallaxB = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT.b);
  const parallaxC = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT.c);
  const parallaxThread = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT.thread);
  const parallaxBM = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT_M.b);
  const parallaxCM = useTransform(scrollYSmooth, PARALLAX_RANGE, PARALLAX_OUTPUT_M.c);

  /* Reduced motion: no drift, no parallax — pure static composition. */
  if (reduced) {
    return (
      <div className="hero-bg absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-bg-wash top-[-28%] left-[-10%] w-[90vw] h-[70vh]" />
        <div className="hero-bg-wash bottom-[-30%] right-[-12%] w-[85vw] h-[65vh]" />
        <Ribbon variant="a" animate={false} className="hidden sm:block absolute -top-[14%] -left-[20%] w-[80vw] h-[52vh] hero-ribbon-a" />
        <Ribbon variant="b" animate={false} className="hidden sm:block absolute top-[4%] -right-[24%] w-[100vw] h-[66vh] hero-ribbon-b" />
        <Ribbon variant="c" animate={false} className="hidden sm:block absolute bottom-[-16%] -left-[16%] w-[85vw] h-[54vh] hero-ribbon-c" />
        <Ribbon variant="thread" animate={false} className="hidden md:block absolute top-[28%] -left-[8%] w-[75vw] h-[30vh] hero-ribbon-thread" />
        <Ribbon variant="b" animate={false} className="sm:hidden absolute top-[10%] -right-[30%] w-[110vw] h-[55vh] hero-ribbon-b" />
        <Ribbon variant="c" animate={false} className="sm:hidden absolute bottom-[5%] -left-[25%] w-[90vw] h-[45vh] hero-ribbon-c" />
        <div className="hero-calm absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="hero-bg absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Depth layer 0 — ambient washes anchoring the whole scene (all breakpoints) */}
      <div className="hero-bg-wash top-[-28%] left-[-10%] w-[90vw] h-[70vh] animate-pulse-light" />
      <div
        className="hero-bg-wash bottom-[-30%] right-[-12%] w-[85vw] h-[65vh] animate-pulse-light"
        style={{ animationDelay: '4s' }}
      />

      {/* Depth layer 1 — widest, faintest far ribbon (top-left diagonal sweep). Desktop/tablet only. */}
      <Ribbon
        variant="a"
        animate
        duration={DRIFT_DURATIONS.e}
        parallaxY={parallaxA}
        className="hidden sm:block absolute -top-[14%] -left-[20%] w-[80vw] h-[52vh] hero-ribbon-a"
      />

      {/* Depth layer 2 — main luminous wave crossing behind the portrait (right side) */}
      <Ribbon
        variant="b"
        animate
        duration={DRIFT_DURATIONS.b}
        delay={3}
        parallaxY={parallaxB}
        className="hidden sm:block absolute top-[4%] -right-[24%] w-[100vw] h-[66vh] hero-ribbon-b"
      />

      {/* Depth layer 3 — low counter-wave, opposite drift direction (bottom-left) */}
      <Ribbon
        variant="c"
        animate
        duration={DRIFT_DURATIONS.c}
        delay={9}
        parallaxY={parallaxC}
        className="hidden sm:block absolute bottom-[-16%] -left-[16%] w-[85vw] h-[54vh] hero-ribbon-c"
      />

      {/* Depth layer 4 — thin bright accent thread, the most "digital light" element. Desktop only. */}
      <Ribbon
        variant="thread"
        animate
        duration={DRIFT_DURATIONS.a}
        delay={6}
        parallaxY={parallaxThread}
        className="hidden md:block absolute top-[28%] -left-[8%] w-[75vw] h-[30vh] hero-ribbon-thread"
      />

      {/* Mobile keeps a light version: washes + two soft static ribbons (gentle parallax only) */}
      <Ribbon variant="b" animate={false} parallaxY={parallaxBM} className="sm:hidden absolute top-[10%] -right-[30%] w-[110vw] h-[55vh] hero-ribbon-b" />
      <Ribbon variant="c" animate={false} parallaxY={parallaxCM} className="sm:hidden absolute bottom-[5%] -left-[25%] w-[90vw] h-[45vh] hero-ribbon-c" />

      {/* Calm veil — quietly quiets the center-left text zone so content always wins */}
      <div className="hero-calm absolute inset-0" />
    </div>
  );
}

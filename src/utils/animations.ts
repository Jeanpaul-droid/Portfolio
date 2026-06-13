import type { Variants, Transition } from 'framer-motion';

/** Courbe bezier équivalente à 'easeOut' — compatible Framer Motion v12 */
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/** Transition de base réutilisable */
export const baseTransition = (duration = 0.6, delay = 0): Transition => ({
  duration,
  delay,
  ease,
});

/** Variants fadeUp — compatible Framer Motion v12 (pas de string ease) */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease } as Transition,
  },
};

/** Variants container avec stagger */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease,
      staggerChildren: 0.1,
    } as Transition,
  },
};

/** Variants item pour stagger */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease } as Transition,
  },
};

/** Variants scale popup */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease } as Transition,
  },
};

/** Slide depuis la gauche */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease } as Transition,
  },
};

/** Slide depuis la droite */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease } as Transition,
  },
};

/** Props communes pour les sections animées whileInView */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
} as const;

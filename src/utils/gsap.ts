import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register once — idempotent.
gsap.registerPlugin(ScrollTrigger, SplitText);

/** Honor OS-level reduced-motion preference: skip GSAP flourishes, show final state. */
export function reduceMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, SplitText };

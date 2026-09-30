import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { gsap, SplitText, reduceMotion } from '../utils/gsap';

/**
 * Cinematic masked line-reveal for Cormorant display titles.
 * Animates every `[data-split-title]` inside `ref` once, on scroll into view.
 * Scoped strictly to `ref` via querySelectorAll (no global selection).
 * Falls back to a block fade-up if SplitText yields no lines.
 * Rule: Framer Motion handles interactions — GSAP owns these titles only.
 */
export function useSplitTitles(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduceMotion()) return;

    const ctx = gsap.context(() => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-split-title]'));
      targets.forEach((el) => {
        let lines: Element[] = [];
        try {
          const split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'gsap-line',
          });
          lines = Array.from(split.lines ?? []);
        } catch {
          lines = [];
        }
        if (lines.length === 0) {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
          return;
        }
        gsap.from(lines, {
          yPercent: 120,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.14,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

import { useLayoutEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../utils/gsap';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

/** Scroll-triggered animated counter (About stats). Static text if reduced motion. */
export default function CountUp({ end, suffix = '', duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = `0${suffix}`;
    if (reduceMotion()) {
      el.textContent = `${end}${suffix}`;
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: end,
      duration,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.v)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

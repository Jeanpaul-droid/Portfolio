import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, PhoneCall, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import moiDetoure from '../assets/moi-detoure.png';
import { useLang } from '../context/LanguageContext';
import { gsap, reduceMotion } from '../utils/gsap';
import HeroBackground from './HeroBackground';

const rolesEN = ['Software Developer', 'Full-Stack Developer', 'Algorithms Enthusiast'];
const rolesFR = ['Développeur Informatique', 'Développeur Full-Stack', 'Passionné d\'Algorithmes'];

export default function Hero() {
  const { lang } = useLang();
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = lang === 'en' ? rolesEN : rolesFR;
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // GSAP entrance timeline — owns Hero entrance only.
  // Framer Motion keeps slot-machine roles, hovers and the floating badge.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-hero="badge"]', { y: 24, opacity: 0, duration: 0.7 }, 0.1)
        .from('[data-hero="title"]', { y: 56, opacity: 0, duration: 1.1 }, 0.2)
        .from('[data-hero="role"]', { y: 28, opacity: 0, duration: 0.8 }, 0.45)
        .from('[data-hero="desc"]', { y: 28, opacity: 0, duration: 0.8 }, 0.55)
        .from('[data-hero="cta"]', { y: 28, opacity: 0, duration: 0.8 }, 0.65)
        .from('[data-hero="social"]', { y: 20, opacity: 0, duration: 0.7 }, 0.75);

      // Entrée du portrait: monte depuis le bas (y: 100 -> 0), opacity 0 -> 1, scale 1.05 -> 1, durée 1.2s, ease "power3.out"
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          y: 100,
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: 'power3.out',
        });
      }

      // Parallaxe légère à la souris (±15px) avec gsap.quickTo, désactivée sur mobile et si prefers-reduced-motion est activé
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        if (reduceMotion() || !portraitImgRef.current) return;

        const xTo = gsap.quickTo(portraitImgRef.current, 'x', { duration: 0.9, ease: 'power2.out' });
        const yTo = gsap.quickTo(portraitImgRef.current, 'y', { duration: 0.9, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          const clampedX = Math.max(-1, Math.min(1, relX));
          const clampedY = Math.max(-1, Math.min(1, relY));
          xTo(clampedX * 15);
          yTo(clampedY * 15);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        root.addEventListener('mousemove', handleMouseMove);
        root.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          root.removeEventListener('mousemove', handleMouseMove);
          root.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="home" className="relative min-h-[95vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 pb-28 md:pb-20 overflow-hidden">
      {/* "Flowing digital light" background — independent decorative layer */}
      <HeroBackground />

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 max-w-5xl w-full">

        {/* LEFT: Text content */}
        <div             className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0 lg:min-w-[26rem]">

          {/* Badge */}
          <div
            data-hero="badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-body text-xs font-semibold uppercase tracking-wider mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {lang === 'en' ? 'Available for opportunities' : 'Disponible pour opportunités'}
          </div>

          {/* Full Name */}
          <h1
            data-hero="title"
            className="text-6xl md:text-7xl lg:text-8xl mb-4 font-heading font-medium leading-[1.05]"
          >
            de-SOUZA
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Jeanpaul
            </span>
          </h1>

          {/* Slot-machine role subtitle — width hugs the current word so the
              whole line stays truly centered on mobile (left-aligned on lg) */}
          <div
            data-hero="role"
            className="text-base md:text-2xl font-medium text-[var(--text-secondary)] font-body mb-6 flex items-center justify-center lg:justify-start gap-2 overflow-hidden w-full"
          >
            <span className="shrink-0">{lang === 'en' ? 'I am' : 'Je suis'}</span>
            <div className="relative h-[1.4em] overflow-hidden flex-none">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  exit={{ opacity: 0, y: '-100%' }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block font-semibold text-[var(--electric)] whitespace-nowrap"
                >
                  {roles[roleIndex % roles.length]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Brief description */}
          <p
            data-hero="desc"
            className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed font-light font-body"
          >
            {lang === 'en'
              ? 'Rigorous software developer, specialized in architecture and full-stack application development. I build performant, scalable solutions tailored to your needs.'
              : 'Développeur informatique rigoureux, spécialisé dans l\'architecture et le développement d\'applications full-stack. Je conçois des solutions performantes, évolutives et adaptées à vos besoins.'}
          </p>

          {/* CTA Buttons */}
          <div
            data-hero="cta"
            className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto"
          >
            <Link
              to="/projects"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-body font-semibold text-sm md:text-base transition-all duration-300 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              {lang === 'en' ? 'Explore my work' : 'Explorer mon travail'}
              <ArrowRight size={18} />
            </Link>
            <motion.a
              href="tel:+2290156100070"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-body font-semibold text-sm md:text-base transition-all duration-300 border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-blue-500/40 hover:text-[var(--electric)]"
            >
              <PhoneCall size={18} className="text-[var(--electric)]" />
              {lang === 'en' ? 'Contact me' : 'Me contacter'}
            </motion.a>
          </div>

          {/* Social Links */}
          <div
            data-hero="social"
            className="flex items-center gap-3"
          >
            {[
              { href: 'https://github.com/Jeanpaul-droid', icon: <Github size={18} />, label: 'GitHub' },
              { href: 'https://linkedin.com', icon: <Linkedin size={18} />, label: 'LinkedIn' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--electric)] hover:border-blue-500/40 transition-all duration-200 font-body text-sm font-medium"
                aria-label={social.label}
              >
                {social.icon}
                {social.label}
              </motion.a>
            ))}
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--electric)] hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 font-body text-sm font-medium"
            >
              <ArrowUpRight size={18} />
              Contact
            </Link>
          </div>
        </div>

        {/* Portrait détouré — colonne de droite sur desktop, collé au bas de la section */}
        <div
          ref={portraitRef}
          data-hero="portrait"
          style={{ zIndex: 5 }}
          className="pointer-events-none select-none z-[5] relative flex justify-center items-end w-full max-w-[90%] mx-auto mt-8 -mb-28 md:-mb-20 lg:mt-0 lg:w-auto lg:max-w-none lg:shrink-0 lg:self-end"
        >
          <img
            ref={portraitImgRef}
            src={moiDetoure}
            alt="de-SOUZA Jeanpaul"
            className="h-full w-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-none object-contain object-bottom pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { ArrowRight, PhoneCall, Code, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { motion } from 'framer-motion';
import profilPhoto from '../assets/Profil photo.jpeg';

const roles = ['Développeur Informatique', 'Développeur Full-Stack', 'Passionné d\'Algorithmes'];

// Helper pour les transitions inline (évite le variant fonctionnel incompatible avec FM v12)
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        if (currentText === fullText) {
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
        }
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[80px] animate-pulse-light z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/8 blur-[100px] animate-pulse-light z-0" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-5xl w-full">

        {/* LEFT: Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0">

          {/* Badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-body text-xs font-semibold uppercase tracking-wider mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Disponible pour opportunités
          </motion.div>

          {/* Full Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 font-heading leading-none"
          >
            de-SOUZA
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Jeanpaul
            </span>
          </motion.h1>

          {/* Dynamic Typing Subtitle */}
          <motion.h2
            {...fadeUp(0.2)}
            className="text-lg md:text-2xl font-medium text-[var(--text-secondary)] font-body mb-6 min-h-[34px] flex items-center justify-center lg:justify-start"
          >
            Je suis&nbsp;
            <span className="font-semibold text-[var(--electric)]">
              {currentText}
            </span>
            <span className="w-[2px] h-5 bg-[var(--electric)] ml-1 animate-blink" />
          </motion.h2>

          {/* Brief description */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed font-light font-body"
          >
            Développeur informatique rigoureux, spécialisé dans l'architecture et le développement d'applications full-stack. Je conçois des solutions performantes, évolutives et adaptées à vos besoins.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-body font-semibold text-base transition-all duration-300 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Explorer mon travail
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="tel:+2290156100070"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-body font-semibold text-base transition-all duration-300 border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-blue-500/40 hover:text-[var(--electric)]"
            >
              <PhoneCall size={18} className="text-[var(--electric)]" />
              Me contacter
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex items-center gap-3"
          >
            {[
              { href: 'https://github.com', icon: <Github size={18} />, label: 'GitHub' },
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
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--electric)] hover:border-blue-500/40 transition-all duration-200 font-body text-sm font-medium"
            >
              <ArrowUpRight size={18} />
              Contact
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT: Profile photo with glass effect */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="relative flex-shrink-0 hidden lg:block"
        >
          {/* Glow derrière la photo */}
          <div className="absolute inset-[-24px] rounded-[60px] bg-gradient-to-br from-blue-500/45 to-blue-800/25 blur-[70px]" />

          {/* Cadre glass translucide */}
          <div className="relative p-[6px] rounded-[44px] bg-gradient-to-br from-white/20 via-blue-400/20 to-blue-700/15 border border-white/25 shadow-2xl shadow-blue-700/30 backdrop-blur-sm">
            <div className="rounded-[38px] overflow-hidden w-[350px] h-[400px] relative">
              <img
                src={profilPhoto}
                alt="de-SOUZA Jeanpaul"
                className="w-full h-full object-cover object-top"
              />

              {/* Reflet glass haut */}
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

              {/* Glass overlay bas bien visible */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-blue-950/85 via-blue-900/50 to-transparent backdrop-blur-md flex items-end p-5">
                <div>
                  <p className="text-white font-heading font-bold text-base leading-tight drop-shadow">de-SOUZA Jeanpaul</p>
                  <p className="text-blue-300 font-body text-xs mt-1 font-light tracking-wide">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 p-3 rounded-2xl glass-effect border border-blue-400/25 shadow-xl backdrop-blur-md"
          >
            <Code size={22} className="text-[var(--electric)]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

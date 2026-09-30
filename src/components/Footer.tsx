import { ArrowUp, Mail, Phone } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useLang } from '../context/LanguageContext';

const footerNav = [
  { nameEN: 'Home', nameFR: 'Accueil', to: '/' },
  { nameEN: 'About', nameFR: 'À propos', to: '/about' },
  { nameEN: 'Projects', nameFR: 'Projets', to: '/projects' },
  { nameEN: 'Contact', nameFR: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { lang } = useLang();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-4 md:px-6 pb-8 mt-16 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-[1.75rem] bg-[var(--footer-frame)] p-2 md:p-3 shadow-2xl transition-colors duration-300"
      >
        <div className="relative overflow-hidden rounded-[1.25rem] bg-[var(--footer-bg)] px-6 py-8 md:px-12 md:py-10 transition-colors duration-300">
          {/* Glow bleu portfolio (remplace l'orange de la maquette) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-[radial-gradient(ellipse_70%_90%_at_50%_110%,var(--electric-glow)_0%,rgba(37,99,235,0.18)_35%,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 bottom-0 h-[55%] bg-[radial-gradient(ellipse_60%_80%_at_50%_110%,var(--footer-glow)_0%,transparent_70%)] blur-2xl"
          />

          {/* Haut : nav + contact */}
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Nav gauche */}
            <nav aria-label="Navigation pied de page">
              <ul className="flex flex-col gap-3 md:gap-4">
                {footerNav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to={item.to}
                      className="font-body text-lg md:text-xl font-medium tracking-tight text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--electric)]"
                    >
                      {lang === 'en' ? item.nameEN : item.nameFR}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Contact droite */}
            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <div className="flex items-center gap-4 md:justify-end">
                {[
                  { href: 'https://github.com/Jeanpaul-droid', icon: <Github size={22} />, label: 'GitHub' },
                  { href: 'https://linkedin.com', icon: <Linkedin size={22} />, label: 'LinkedIn' },
                  { href: 'mailto:amirjeanpaul9@gmail.com', icon: <Mail size={22} />, label: 'Email' },
                  { href: 'tel:+2290156100070', icon: <Phone size={22} />, label: lang === 'en' ? 'Phone' : 'Téléphone' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={s.label}
                    className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--electric)]"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
              <div className="font-body text-sm md:text-base font-light tracking-wide text-[var(--text-secondary)] flex flex-col gap-1.5">
                <a
                  href="mailto:amirjeanpaul9@gmail.com"
                  className="transition-colors hover:text-[var(--text-primary)]"
                >
                  {lang === 'en' ? 'Email: ' : 'E-mail : '}amirjeanpaul9@gmail.com
                </a>
                <a href="tel:+2290156100070" className="transition-colors hover:text-[var(--text-primary)]">
                  (+229) 01 56 10 00 70
                </a>
                <span className="text-[var(--text-muted)]">Cotonou, Bénin</span>
              </div>
            </div>
          </div>

          {/* Grand texte */}
          <div aria-hidden className="relative z-0 -mb-[0.23em] mt-6 md:mt-10 select-none">
            <h2 className="heading-transparent font-heading font-bold leading-[0.85] tracking-[-0.05em] text-center whitespace-nowrap text-[clamp(4rem,17.5vw,15rem)] bg-gradient-to-b from-[var(--footer-brand-from)] via-[var(--footer-brand-via)] to-[var(--footer-brand-to)] bg-clip-text blur-[0.5px]">
              jean<span className="text-[var(--electric)] [-webkit-text-fill-color:var(--electric)]">.</span>dev<span className="text-[var(--electric)] [-webkit-text-fill-color:var(--electric)]">.</span>
            </h2>
            {/* Voile bas pour fondre dans le glow comme la maquette */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--footer-veil)] to-transparent blur-xl" />
          </div>
        </div>

        {/* Barre basse : copyright + retour haut */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <p className="font-body text-xs font-light text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} de-SOUZA Jeanpaul — {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 rounded-xl px-3.5 py-2 font-body text-xs font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--electric)] cursor-pointer"
            aria-label={lang === 'en' ? 'Back to top' : 'Retour en haut de page'}
          >
            <ArrowUp size={15} />
            {lang === 'en' ? 'Top' : 'Haut'}
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}

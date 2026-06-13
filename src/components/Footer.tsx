import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-10 px-6 mt-16 relative">
      <div className="container max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="font-heading font-bold text-sm tracking-wide text-[var(--text-primary)]">
            de-SOUZA Jeanpaul<span className="text-[var(--electric)]">.</span>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-light font-body">
            &copy; {new Date().getFullYear()} Tous droits réservés.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {[
            { href: 'https://github.com', icon: <Github size={16} />, label: 'GitHub' },
            { href: 'https://linkedin.com', icon: <Linkedin size={16} />, label: 'LinkedIn' },
            { href: '#contact', icon: <Mail size={16} />, label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--electric)] hover:border-blue-500/30 transition-all duration-200 font-body text-xs font-medium"
              aria-label={social.label}
            >
              {social.icon}
              {social.label}
            </motion.a>
          ))}
        </div>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 text-[var(--electric)] hover:bg-[var(--electric)] hover:text-white transition-colors duration-300 cursor-pointer shadow-md font-body text-sm font-medium"
          aria-label="Retour en haut de page"
          title="Retour en haut"
        >
          <ArrowUp size={16} />
          Haut
        </motion.button>
      </div>
    </footer>
  );
}

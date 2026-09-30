import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

/** 404 — bilingual, back to Home. */
export default function NotFound() {
  const { lang } = useLang();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[80vh] flex items-center justify-center px-6"
    >
      <div className="text-center">
        <p className="font-heading font-medium text-7xl md:text-8xl text-[var(--text-primary)] leading-none mb-4">
          404
        </p>
        <p className="font-body font-light text-base md:text-lg text-[var(--text-muted)] max-w-md mx-auto mb-8">
          {lang === 'en'
            ? 'This page does not exist — or has moved elsewhere.'
            : 'Cette page n’existe pas — ou a déménagé ailleurs.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-body font-semibold text-sm md:text-base transition-all duration-300 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
        >
          <ArrowLeft size={18} />
          {lang === 'en' ? 'Back to Home' : "Retour à l'accueil"}
        </Link>
      </div>
    </motion.main>
  );
}

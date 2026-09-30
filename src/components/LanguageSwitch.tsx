import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

interface LanguageSwitchProps {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Real ON/OFF-style language switch (EN ⇄ FR).
 * Single toggle action flips the global language (LangProvider).
 * Sliding thumb + accessible role="switch".
 */
export default function LanguageSwitch({ orientation = 'horizontal' }: LanguageSwitchProps) {
  const { lang, setLang } = useLang();
  const isEN = lang === 'en';
  const vertical = orientation === 'vertical';

  const toggle = () => setLang(isEN ? 'fr' : 'en');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isEN}
      aria-label={isEN ? 'Switch language to French' : 'Passer la langue en anglais'}
      title={isEN ? 'Passer en français' : 'Switch to English'}
      onClick={toggle}
      className={`relative shrink-0 rounded-full glass-effect border border-[var(--border-color)] cursor-pointer transition-colors duration-300 hover:border-blue-500/40 ${
        vertical ? 'w-10 h-[74px]' : 'w-[74px] h-10'
      }`}
    >
      {/* Labels */}
      <span
        className={`absolute inset-0 flex items-center font-body text-[10px] font-bold uppercase tracking-wider ${
          vertical ? 'flex-col justify-between py-2.5' : 'flex-row justify-between px-2.5'
        }`}
      >
        <span
          className={`z-10 w-5 text-center transition-colors duration-300 ${
            isEN ? 'text-white' : 'text-[var(--text-muted)]'
          }`}
        >
          EN
        </span>
        <span
          className={`z-10 w-5 text-center transition-colors duration-300 ${
            !isEN ? 'text-white' : 'text-[var(--text-muted)]'
          }`}
        >
          FR
        </span>
      </span>

      {/* Sliding thumb */}
      <motion.span
        aria-hidden
        initial={false}
        animate={vertical ? { y: isEN ? 0 : 34 } : { x: isEN ? 0 : 34 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 left-1 block h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-md shadow-blue-600/30"
      />
    </button>
  );
}

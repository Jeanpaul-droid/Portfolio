import { Home, User, FolderGit2, Mail, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const navItems = [
  { id: 'home', nameEN: 'Home', nameFR: 'Accueil', icon: Home, to: '/' },
  { id: 'about', nameEN: 'About', nameFR: 'À propos', icon: User, to: '/about' },
  { id: 'projects', nameEN: 'Projects', nameFR: 'Projets', icon: FolderGit2, to: '/projects' },
  { id: 'contact', nameEN: 'Contact', nameFR: 'Contact', icon: Mail, to: '/contact' },
];

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const { lang } = useLang();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      {/* Left Sidebar Navigation (Desktop) */}
      <motion.nav
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-5"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const itemName = lang === 'en' ? item.nameEN : item.nameFR;
          return (
            <motion.span
              key={item.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="group relative flex items-center justify-center"
            >
              <NavLink
                to={item.to}
                aria-label={itemName}
                className="relative flex items-center justify-center"
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator glow */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-glow"
                        className="absolute inset-0 rounded-xl bg-[var(--electric)] opacity-20 blur-md"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-200 ${isActive
                          ? 'text-[var(--electric)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--electric)]'
                        }`}
                    >
                      <Icon size={26} strokeWidth={isActive ? 2.2 : 1.7} />
                    </span>

                    {/* Tooltip */}
                    <span className="absolute left-14 pointer-events-none">
                      <span className="relative px-3 py-1.5 rounded-lg bg-gray-900/90 dark:bg-gray-800/90 text-white text-xs font-body font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/10 flex">
                        {itemName}
                        <span className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-2 h-2 rotate-45 bg-gray-900/90 dark:bg-gray-800/90 border-l border-b border-white/10" />
                      </span>
                    </span>
                  </>
                )}
              </NavLink>
            </motion.span>
          );
        })}

        {/* Divider */}
        <div className="w-[2px] h-6 rounded-full bg-[var(--border-color)]" />

        {/* Language Switch (global EN/FR) */}
        <LanguageSwitch orientation="vertical" />

        {/* Theme Toggle */}
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-[var(--text-muted)] hover:text-[var(--electric)] transition-colors duration-200"
          aria-label={lang === 'en' ? 'Toggle theme' : 'Changer de thème'}
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon size={22} strokeWidth={1.7} />
              </motion.div>
            ) : (
              <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun size={22} strokeWidth={1.7} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Bottom Floating Navigation (Mobile) — round pill dock */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center justify-between gap-1 px-2 py-1.5 rounded-full glass-effect border border-[var(--border-color)] shadow-xl w-auto transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const itemName = lang === 'en' ? item.nameEN : item.nameFR;
          return (
            <NavLink
              key={item.id}
              to={item.to}
              aria-label={itemName}
              className={({ isActive }) =>
                `relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ${isActive
                    ? 'text-[var(--electric)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--electric)]'
                  }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Soft active pill — glides between links */}
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute inset-0 rounded-full bg-[var(--electric)]/10 shadow-sm shadow-blue-600/10 ring-1 ring-blue-500/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    <Icon size={24} strokeWidth={isActive ? 2.2 : 1.7} />
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
        <LanguageSwitch orientation="horizontal" />
        <div className="w-[1px] h-6 bg-[var(--border-color)]" />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-full text-[var(--text-muted)] hover:text-[var(--electric)] transition-colors duration-200"
          aria-label={lang === 'en' ? 'Toggle theme' : 'Changer de thème'}
        >
          {theme === 'light' ? <Moon size={22} strokeWidth={1.7} /> : <Sun size={22} strokeWidth={1.7} />}
        </button>
      </motion.nav>
    </>
  );
}

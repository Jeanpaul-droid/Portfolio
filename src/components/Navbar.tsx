import { Home, User, Cpu, FolderGit2, Mail, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const navItems = [
  { id: 'home', name: 'Accueil', icon: Home, href: '#home' },
  { id: 'about', name: 'À propos', icon: User, href: '#about' },
  { id: 'skills', name: 'Compétences', icon: Cpu, href: '#skills' },
  { id: 'projects', name: 'Projets', icon: FolderGit2, href: '#projects' },
  { id: 'contact', name: 'Contact', icon: Mail, href: '#contact' },
];

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          const isActive = activeSection === item.id;
          return (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="group relative flex items-center justify-center"
              aria-label={item.name}
            >
              {/* Active indicator glow */}
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 rounded-xl bg-[var(--electric)] opacity-20 blur-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--electric)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--electric)]'
                }`}
              >
                <Icon size={26} strokeWidth={isActive ? 2.2 : 1.7} />
              </div>

              {/* Tooltip */}
              <div className="absolute left-14 pointer-events-none">
                <div className="relative px-3 py-1.5 rounded-lg bg-gray-900/90 dark:bg-gray-800/90 text-white text-xs font-body font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/10">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-2 h-2 rotate-45 bg-gray-900/90 dark:bg-gray-800/90 border-l border-b border-white/10" />
                </div>
              </div>
            </motion.a>
          );
        })}

        {/* Divider */}
        <div className="w-[2px] h-6 rounded-full bg-[var(--border-color)]" />

        {/* Theme Toggle */}
        <motion.button
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-[var(--text-muted)] hover:text-[var(--electric)] transition-colors duration-200"
          aria-label="Changer de thème"
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

      {/* Bottom Floating Navigation (Mobile) */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center justify-between gap-1 px-3 py-2 rounded-2xl glass-effect border border-[var(--border-color)] shadow-xl w-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 ${
                isActive
                  ? 'text-[var(--electric)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--electric)]'
              }`}
              aria-label={item.name}
            >
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--electric)]" />
              )}
              <Icon size={24} strokeWidth={isActive ? 2.2 : 1.7} />
            </a>
          );
        })}
        <div className="w-[1px] h-6 bg-[var(--border-color)]" />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-xl text-[var(--text-muted)] hover:text-[var(--electric)] transition-colors duration-200"
          aria-label="Changer de thème"
        >
          {theme === 'light' ? <Moon size={22} strokeWidth={1.7} /> : <Sun size={22} strokeWidth={1.7} />}
        </button>
      </motion.nav>
    </>
  );
}

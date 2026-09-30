import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SkeletonPage from './components/SkeletonPage';
import ScrollToTop from './components/ScrollToTop';
import { LangProvider } from './context/LanguageContext';
import { usePageMeta } from './hooks/usePageMeta';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  usePageMeta();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // `?theme=light|dark` wins — handy for previews/screenshots.
    const param = new URLSearchParams(window.location.search).get('theme');
    if (param === 'light' || param === 'dark') return param;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return savedTheme || 'dark';
  });
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate loading for 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-300">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SkeletonPage />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Floating vertical sidebar (desktop) or bottom dock (mobile) */}
                <Navbar theme={theme} setTheme={setTheme} />

                {/* Main layout wrapper, indented on desktop to avoid sidebar collision */}
                <main className="md:pl-28 transition-all duration-300">
                  <AnimatedRoutes />
                  <Footer />
                </main>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </LangProvider>
  );
}

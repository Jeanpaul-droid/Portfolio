import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Instant scroll reset on every route change (overrides CSS smooth scroll). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

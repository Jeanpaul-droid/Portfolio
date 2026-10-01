import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLang } from '../context/LanguageContext';

interface PageMeta {
  titleEN: string;
  titleFR: string;
  descEN: string;
  descFR: string;
}

/** Production origin — keep in sync with index.html, public/sitemap.xml and public/robots.txt. */
const SITE_ORIGIN = 'https://portfolio-one-mocha-22.vercel.app';

const metaByPath: Record<string, PageMeta> = {
  '/': {
    titleEN: 'de-SOUZA Jeanpaul | Full-Stack Software Developer',
    titleFR: 'de-SOUZA Jeanpaul | Développeur Informatique Full-Stack',
    descEN: 'Professional portfolio of de-SOUZA Jeanpaul, full-stack software developer based in Cotonou, Benin. I design performant, scalable web applications tailored to your needs.',
    descFR: 'Portfolio de de-SOUZA Jeanpaul, développeur informatique full-stack basé à Cotonou, Bénin. Conception d\'applications web performantes, évolutives et adaptées à vos besoins.',
  },
  '/about': {
    titleEN: 'About | de-SOUZA Jeanpaul',
    titleFR: 'À propos | de-SOUZA Jeanpaul',
    descEN: 'Hybrid profile combining hardware engineering and software development, professional journey and testimonials.',
    descFR: 'Profil hybride combinant ingénierie matérielle et développement logiciel, parcours professionnel et témoignages.',
  },
  '/projects': {
    titleEN: 'Projects | de-SOUZA Jeanpaul',
    titleFR: 'Projets | de-SOUZA Jeanpaul',
    descEN: 'Selected work: backend architectures and modern frontend interfaces.',
    descFR: 'Sélection de travaux : architectures backend et interfaces frontend modernes.',
  },
  '/contact': {
    titleEN: 'Contact | de-SOUZA Jeanpaul',
    titleFR: 'Contact | de-SOUZA Jeanpaul',
    descEN: 'Have a project or a development opportunity? Send me a message.',
    descFR: 'Un projet ou une opportunité de développement ? Laissez-moi un message.',
  },
};

const fallbackMeta: PageMeta = {
  titleEN: 'de-SOUZA Jeanpaul | Full-Stack Software Developer',
  titleFR: 'de-SOUZA Jeanpaul | Développeur Informatique Full-Stack',
  descEN: 'Portfolio of de-SOUZA Jeanpaul, full-stack software developer.',
  descFR: 'Portfolio de de-SOUZA Jeanpaul, développeur informatique full-stack.',
};

function normalizePath(pathname: string): string {
  if (pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function removeCanonical() {
  document.head.querySelector('link[rel="canonical"]')?.remove();
}

/** Per-route <title>, meta description and canonical, following the global language. */
export function usePageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const path = normalizePath(pathname);
    const meta = metaByPath[path];
    const pageMeta = meta ?? fallbackMeta;

    document.title = lang === 'en' ? pageMeta.titleEN : pageMeta.titleFR;
    upsertMeta('name', 'description', lang === 'en' ? pageMeta.descEN : pageMeta.descFR);

    if (meta) {
      const url = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;
      upsertMeta('name', 'robots', 'index, follow');
      upsertMeta('property', 'og:url', url);
      setCanonical(url);
    } else {
      // Unknown route (client-side 404): keep it out of the index.
      upsertMeta('name', 'robots', 'noindex, follow');
      removeCanonical();
    }
  }, [pathname, lang]);
}

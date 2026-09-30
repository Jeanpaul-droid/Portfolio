import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLang } from '../context/LanguageContext';

interface PageMeta {
  titleEN: string;
  titleFR: string;
  descEN: string;
  descFR: string;
}

const metaByPath: Record<string, PageMeta> = {
  '/': {
    titleEN: 'de-SOUZA Jeanpaul | Full-Stack Software Developer',
    titleFR: 'de-SOUZA Jeanpaul | Développeur Informatique Full-Stack',
    descEN: 'Portfolio of de-SOUZA Jeanpaul, full-stack software developer. Performant, scalable web applications tailored to your needs.',
    descFR: 'Portfolio de de-SOUZA Jeanpaul, développeur informatique full-stack. Applications web performantes et évolutives, adaptées à vos besoins.',
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

/** Per-route <title> + meta description, following the global language. */
export function usePageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const meta = metaByPath[pathname] ?? fallbackMeta;
    document.title = lang === 'en' ? meta.titleEN : meta.titleFR;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', lang === 'en' ? meta.descEN : meta.descFR);
  }, [pathname, lang]);
}

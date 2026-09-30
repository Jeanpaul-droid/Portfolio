/**
 * Project catalogue — shared between the /projects page and the Home teaser.
 * Sources: GitHub API (https://github.com/Jeanpaul-droid?tab=repositories)
 * and each repository README — verified October 2026.
 */

export interface Project {
  id: number;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack';
  descriptionEN: string;
  descriptionFR: string;
  longDescriptionEN: string;
  longDescriptionFR: string;
  tech: string[];
  featuresEN: string[];
  featuresFR: string[];
  githubUrl: string;
  demoUrl: string;
}

export const projectCategoryColors: Record<string, string> = {
  fullstack: 'from-blue-600/90 to-indigo-700/85',
  frontend: 'from-sky-500/90 to-blue-700/85',
  backend: 'from-indigo-600/90 to-blue-800/85',
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'GitPilot',
    category: 'backend',
    descriptionEN: 'Git workflow CLI assistant: persistent sessions, crash-proof resume, bilingual FR/EN interface and a 79-test pytest suite.',
    descriptionFR: 'Assistant de workflow Git en CLI : sessions persistantes, reprise après erreur sans crash, interface bilingue FR/EN et 79 tests pytest.',
    longDescriptionEN: 'GitPilot tracks the real state of the repository through Git, remembers its own actions in persistent sessions stored outside the project, never exits abruptly on error and resumes exactly where it stopped. It provides push/clone workflows with before/after snapshots, branch switching (main/master), logs, history, diagnostics and a Rich terminal UI with automatic ASCII fallback on Windows consoles.',
    longDescriptionFR: "GitPilot suit l'état réel du dépôt via Git, mémorise ses propres actions dans des sessions persistantes stockées hors projet, ne ferme jamais brutalement sur erreur et reprend exactement là où il s'est arrêté. Il propose des workflows push/clone avec snapshots avant/après chaque action, le changement de branche (main/master), les journaux, l'historique, les diagnostics et une interface Rich avec repli ASCII automatique sur les consoles Windows.",
    featuresEN: [
      'Push / clone workflows with targeted resume after failure',
      'Persistent sessions stored outside the repository (~/.gitpilot)',
      'Fully bilingual interface (Français / English), persisted',
      'Git diagnostics, logs, history and 79 pytest tests',
    ],
    featuresFR: [
      'Workflows push / clone avec reprise ciblée après échec',
      'Sessions persistantes hors du dépôt (~/.gitpilot)',
      'Interface entièrement bilingue (Français / English), persistée',
      'Diagnostics Git, journaux, historique et 79 tests pytest',
    ],
    tech: ['Python', 'Typer', 'Rich', 'pytest', 'Git'],
    githubUrl: 'https://github.com/Jeanpaul-droid/gitpilot',
    demoUrl: 'https://github.com/Jeanpaul-droid/gitpilot',
  },
  {
    id: 2,
    title: 'Plateforme Étudiante',
    category: 'fullstack',
    descriptionEN: 'Student platform built with Next.js: registration with role selection (student, company, high school), authentication and a dedicated dashboard per role.',
    descriptionFR: 'Plateforme étudiante en Next.js : inscription avec choix de rôle (étudiant, entreprise, lycée), authentification et tableau de bord dédié par rôle.',
    longDescriptionEN: 'A Next.js platform connecting students, companies and high schools. Visitors land on a complete marketing page (FAQ, CTA, “how it works”), then sign up and choose a role. Each role gets its own dashboard: students track their profile, companies publish opportunities and high schools follow their students.',
    longDescriptionFR: "Une plateforme Next.js reliant les étudiants, les entreprises et les lycées. Le visiteur atterrit sur une page d'accueil complète (FAQ, CTA, « comment ça marche »), puis s'inscrit et choisit son rôle. Chaque rôle dispose de son propre tableau de bord : les étudiants suivent leur profil, les entreprises publient des opportunités, les lycées suivent leurs élèves.",
    featuresEN: [
      'Registration and login with session handling',
      'Role selection: student, company or high school',
      'Dedicated dashboard for each role',
      'Full landing page (FAQ, CTA, how-it-works)',
    ],
    featuresFR: [
      'Inscription et connexion avec gestion de sessions',
      'Choix de rôle : étudiant, entreprise ou lycée',
      'Tableau de bord dédié pour chaque rôle',
      'Landing page complète (FAQ, CTA, fonctionnement)',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/Jeanpaul-droid/Plateforme-etudiant',
    demoUrl: 'https://plateforme-etudiant-mauve.vercel.app',
  },
  {
    id: 3,
    title: 'Portfolio Personnel',
    category: 'frontend',
    descriptionEN: 'My personal portfolio in React/TypeScript: light & dark themes, GSAP and Framer Motion animations, bilingual FR/EN content.',
    descriptionFR: 'Mon portfolio personnel en React/TypeScript : thèmes clair & sombre, animations GSAP et Framer Motion, contenu bilingue FR/EN.',
    longDescriptionEN: 'This very site: a single-page portfolio with home, about (experience, skills, testimonials), projects and contact sections, a light/dark theme driven by CSS variables, GSAP SplitText title reveals, Framer Motion transitions and full French/English switching.',
    longDescriptionFR: "Ce site lui-même : un portfolio en page unique avec les sections accueil, à propos (expérience, compétences, témoignages), projets et contact, un thème clair/sombre piloté par des variables CSS, des titres animés avec GSAP SplitText, des transitions Framer Motion et un basculement complet français/anglais.",
    featuresEN: [
      'Light / dark theme driven by CSS variables',
      'Full French / English content switching',
      'GSAP SplitText title reveals and Framer Motion transitions',
      'Responsive layout with project cards and detail modals',
    ],
    featuresFR: [
      'Thème clair / sombre piloté par variables CSS',
      'Bascule complète du contenu français / anglais',
      'Titres animés GSAP SplitText et transitions Framer Motion',
      'Layout responsive avec cartes projets et modale de détails',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    githubUrl: 'https://github.com/Jeanpaul-droid/Portfolio',
    demoUrl: 'https://portfolio-one-mocha-22.vercel.app',
  },
  {
    id: 4,
    title: 'Gestion de Réservations',
    category: 'frontend',
    descriptionEN: 'Automated reservation management site: home, services, reservation form, confirmation and a tracking dashboard.',
    descriptionFR: 'Site de gestion de réservation automatisé : accueil, services, formulaire de réservation, confirmation et tableau de bord de suivi.',
    longDescriptionEN: 'A simple automated reservation management project built with vanilla HTML5, CSS3 and JavaScript: home, services, contact, a reservation form with confirmation page and a dashboard to follow reservations. Deployed on GitHub Pages.',
    longDescriptionFR: "Un projet simple de gestion de réservation automatisé construit en HTML5, CSS3 et JavaScript pur : accueil, services, contact, un formulaire de réservation avec page de confirmation et un tableau de bord pour suivre les réservations. Déployé sur GitHub Pages.",
    featuresEN: [
      'Reservation form with confirmation page',
      'Tracking dashboard for reservations',
      'Services and contact pages',
      'Deployed on GitHub Pages',
    ],
    featuresFR: [
      'Formulaire de réservation avec page de confirmation',
      'Tableau de bord de suivi des réservations',
      'Pages services et contact',
      'Déployé sur GitHub Pages',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/Jeanpaul-droid/Gestion-reservations',
    demoUrl: 'https://jeanpaul-droid.github.io/Gestion-reservations/',
  },
  {
    id: 5,
    title: 'Mini-Apps Suite',
    category: 'frontend',
    descriptionEN: 'Web app bundling mini-apps to automate everyday tasks, built with React + Vite and deployed on GitHub Pages.',
    descriptionFR: 'Application web regroupant des mini-apps pour exécuter automatiquement des tâches courantes, construite avec React + Vite et déployée sur GitHub Pages.',
    longDescriptionEN: 'A collection of small web apps gathered in a single interface to run recurring tasks automatically. The project runs on React + Vite with hot module replacement and is published on GitHub Pages.',
    longDescriptionFR: "Une collection de mini-apps web réunies dans une seule interface pour exécuter automatiquement des tâches courantes. Le projet repose sur React + Vite avec hot module replacement et est publié sur GitHub Pages.",
    featuresEN: [
      'Several mini-apps inside a single interface',
      'Automation of recurring everyday tasks',
      'React + Vite base with hot reload',
      'Deployed on GitHub Pages',
    ],
    featuresFR: [
      'Plusieurs mini-apps réunies en une seule interface',
      'Automatisation de tâches courantes',
      'Base React + Vite avec hot reload',
      'Déployé sur GitHub Pages',
    ],
    tech: ['JavaScript', 'React', 'Vite', 'GitHub Pages'],
    githubUrl: 'https://github.com/Jeanpaul-droid/new-test',
    demoUrl: 'https://jeanpaul-droid.github.io/new-test/',
  },
];

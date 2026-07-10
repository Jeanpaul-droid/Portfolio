import { useState } from 'react';
import { ExternalLink, ArrowUpRight, X } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps } from '../utils/animations';

interface Project {
  id: number;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack';
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
}

const filterLabels: Record<string, string> = {
  all: 'Tous',
  fullstack: 'Full-Stack',
  frontend: 'Front-End',
  backend: 'Back-End',
};

function getInitials(title: string): string {
  return title
    .split(/[-\s]/)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);
}

const categoryColors: Record<string, string> = {
  fullstack: 'from-blue-600/30 to-blue-800/20',
  frontend: 'from-sky-600/30 to-blue-700/20',
  backend: 'from-indigo-600/30 to-blue-800/20',
};

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // ==========================================
  // CONFIGURATION DES PROJETS (AVEC DETAILS)
  // ==========================================
  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Supa-Commerce',
      category: 'fullstack',
      description: "Une plateforme e-commerce moderne intégrant la gestion des paniers, l'authentification sécurisée des utilisateurs et les paiements Stripe.",
      longDescription: "Supa-Commerce est une application e-commerce complète conçue pour offrir une expérience d'achat rapide, fluide et sécurisée. Elle intègre un système d'authentification robuste avec gestion de sessions, une base de données relationnelle pour gérer les produits et commandes, et l'API Stripe pour la gestion des transactions financières.",
      features: [
        "Intégration complète et sécurisée des paiements Stripe",
        "Système d'authentification utilisateur (JWT & cookies sécurisés)",
        "Gestion d'état globale pour le panier d'achat",
        "Panneau d'administration pour la gestion des stocks et produits"
      ],
      tech: ['React js', 'Next js', 'Postgresql', 'Express js'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/supa-commerce',
      demoUrl: 'https://supa-commerce.demo.com',
    },
    {
      id: 2,
      title: 'Apex Task-Flow',
      category: 'frontend',
      description: "Un gestionnaire de tâches de style Kanban interactif avec gestion des états locaux et synchronisation Firebase pour le travail d'équipe.",
      longDescription: "Apex Task-Flow simplifie la gestion de projets et de tâches pour les équipes. Inspiré des tableaux Kanban, il permet de réorganiser visuellement ses tâches par glisser-déposer (Drag and Drop). Les données sont synchronisées instantanément avec Firebase Firestore, ce qui permet à plusieurs collaborateurs de travailler en temps réel.",
      features: [
        "Tableau Kanban avec système intuitif de glisser-déposer",
        "Synchronisation cloud en temps réel avec Firebase Firestore",
        "Filtres de recherche et de priorité des tâches",
        "Thème sombre natif et interface ultra-réactive"
      ],
      tech: ['React js', 'Firebase', 'CSS', 'HTML'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/apex-taskflow',
      demoUrl: 'https://apex-taskflow.demo.com',
    },
    {
      id: 3,
      title: 'Edu-Manage API',
      category: 'backend',
      description: 'API REST robuste de gestion académique avec authentification OAuth2, gestion de rôles complexes et génération de rapports automatiques.',
      longDescription: "Edu-Manage API est le moteur d'une plateforme scolaire. Elle permet de gérer les inscriptions, les cours, les notes et les présences. La sécurité est au cœur du système avec un contrôle d'accès basé sur les rôles (RBAC) et un mécanisme d'authentification OAuth2.",
      features: [
        "Authentification sécurisée avec OAuth2 & jetons d'accès",
        "Contrôle d'accès strict selon les rôles (Admin, Prof, Élève)",
        "Génération automatique de bulletins scolaires (PDF/CSV)",
        "Endpoints documentés de manière interactive avec Swagger"
      ],
      tech: ['Express js', 'SQL', 'Postman', 'Node js'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/edu-manage-api',
      demoUrl: 'https://edu-manage-api.demo.com',
    },
    {
      id: 4,
      title: 'Py-Data-Analyzer',
      category: 'backend',
      description: "Script Python complet permettant d'extraire, nettoyer et modéliser des volumes de données statistiques avec des graphiques interactifs.",
      longDescription: "Py-Data-Analyzer est un outil d'ingénierie et d'analyse de données. Il se connecte à des bases de données relationnelles pour extraire des volumes d'informations, applique des scripts de nettoyage (handling des valeurs nulles, doublons) et calcule des modélisations statistiques représentées sous forme graphique.",
      features: [
        "Nettoyage automatique et standardisation des données",
        "Analyses statistiques descriptives et prédictives",
        "Visualisations interactives exportables",
        "Connexion sécurisée aux bases de données SQL / PostgreSQL"
      ],
      tech: ['Python', 'SQL', 'Postgresql'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/py-data-analyzer',
      demoUrl: 'https://py-data-analyzer.demo.com',
    },
  ];

  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">

        {/* Section Title */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            Mes <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Projets Réalisés</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <p className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            Découvrez une sélection de mes travaux récents, incluant des architectures backend et des interfaces frontend modernes.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {(['all', 'fullstack', 'frontend', 'backend'] as const).map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-2xl font-body text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-transparent text-white shadow-lg shadow-blue-600/25'
                  : 'text-[var(--text-secondary)] border-[var(--border-color)] bg-[var(--bg-card)] hover:border-blue-500/40 hover:text-[var(--electric)]'
              }`}
            >
              {filterLabels[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group rounded-2xl glass-effect border border-[var(--border-color)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/20 flex flex-col cursor-pointer"
              >
                {/* Project Visual — initiales */}
                <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${categoryColors[project.category]} flex items-center justify-center`}>
                  <span className="text-5xl font-bold font-heading text-white/20 select-none tracking-widest">
                    {getInitials(project.title)}
                  </span>

                  {/* Hover overlay - Single CTA to open the modal */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-950/65 backdrop-blur-sm">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-body text-sm font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      Détails du projet
                      <ArrowUpRight size={15} />
                    </motion.button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-[var(--electric)] text-xs font-body font-semibold uppercase tracking-wide border border-blue-500/15">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-2 text-[var(--text-primary)]">{project.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-6 flex-grow font-body">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.92, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 15, opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 330 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-[var(--bg-app)] border border-[var(--border-color)] p-6 md:p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh] text-left cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-red-500/30 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>

                {/* Modal category badge */}
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-[var(--electric)] text-xs font-body font-semibold uppercase tracking-wide border border-blue-500/15 w-fit block mb-3">
                  {selectedProject.category}
                </span>

                {/* Modal title */}
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-[var(--text-primary)]">
                  {selectedProject.title}
                </h3>

                {/* Modal long description */}
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-6 font-body">
                  {selectedProject.longDescription}
                </p>

                {/* Key features */}
                {selectedProject.features && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-body mb-3">
                      Fonctionnalités Clés
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[var(--text-secondary)] font-body font-light">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[var(--electric)] mt-1 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-body mb-3">
                    Technologies Utilisées
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--border-color)]">
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl font-body text-sm font-semibold hover:shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    <Github size={16} />
                    Code Source (GitHub)
                  </motion.a>
                  <motion.a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3.5 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] rounded-2xl font-body text-sm font-semibold hover:border-blue-500/40 hover:text-[var(--electric)] transition-all cursor-pointer"
                  >
                    <ExternalLink size={16} />
                    Voir la Démo Live
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

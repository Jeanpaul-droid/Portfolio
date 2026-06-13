import { useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps } from '../utils/animations';

interface Project {
  id: number;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack';
  description: string;
  tech: string[];
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

  // ==========================================
  // CONFIGURATION DES PROJETS (MODIFIABLE)
  // Remplacez les liens et les textes ci-dessous par vos propres projets.
  // ==========================================
  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Supa-Commerce',
      category: 'fullstack',
      description: "Une plateforme e-commerce moderne intégrant la gestion des paniers, l'authentification sécurisée des utilisateurs et les paiements Stripe.",
      tech: ['React js', 'Next js', 'Postgresql', 'Express js'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/supa-commerce',
      demoUrl: 'https://supa-commerce.demo.com',
    },
    {
      id: 2,
      title: 'Apex Task-Flow',
      category: 'frontend',
      description: "Un gestionnaire de tâches de style Kanban interactif avec gestion des états locaux et synchronisation Firebase pour le travail d'équipe.",
      tech: ['React js', 'Firebase', 'CSS', 'HTML'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/apex-taskflow',
      demoUrl: 'https://apex-taskflow.demo.com',
    },
    {
      id: 3,
      title: 'Edu-Manage API',
      category: 'backend',
      description: 'API REST robuste de gestion académique avec authentification OAuth2, gestion de rôles complexes et génération de rapports automatiques.',
      tech: ['Express js', 'SQL', 'Postman', 'Node js'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/edu-manage-api',
      demoUrl: 'https://edu-manage-api.demo.com',
    },
    {
      id: 4,
      title: 'Py-Data-Analyzer',
      category: 'backend',
      description: "Script Python complet permettant d'extraire, nettoyer et modéliser des volumes de données statistiques avec des graphiques interactifs.",
      tech: ['Python', 'SQL', 'Postgresql'],
      githubUrl: 'https://github.com/de-souza-jeanpaul/py-data-analyzer',
      demoUrl: 'https://py-data-analyzer.demo.com',
    },
  ];

  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container max-w-5xl">

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
              className={`px-6 py-2.5 rounded-2xl font-body text-sm font-semibold transition-all duration-300 border ${
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
                className="group rounded-2xl glass-effect border border-[var(--border-color)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/20 flex flex-col"
              >
                {/* Project Visual — initiales */}
                <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${categoryColors[project.category]} flex items-center justify-center`}>
                  <span className="text-5xl font-bold font-heading text-white/20 select-none tracking-widest">
                    {getInitials(project.title)}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-950/60 backdrop-blur-sm">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-900 rounded-xl font-body text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
                    >
                      <Github size={16} />
                      GitHub
                      <ArrowUpRight size={14} />
                    </motion.a>
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-900 rounded-xl font-body text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-lg"
                    >
                      <ExternalLink size={16} />
                      Démo
                      <ArrowUpRight size={14} />
                    </motion.a>
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
      </div>
    </section>
  );
}

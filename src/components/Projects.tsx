import { useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight, X } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps, baseTransition } from '../utils/animations';
import { useLang } from '../context/LanguageContext';
import { useSplitTitles } from '../hooks/useSplitTitles';
import SectionBadge from './SectionBadge';
import TechBadges from './TechBadges';
import { projectsData, projectCategoryColors } from '../data/projects';
import type { Project } from '../data/projects';

const filterLabelsEN: Record<string, string> = {
  all: 'All',
  fullstack: 'Full-Stack',
  frontend: 'Front-End',
  backend: 'Back-End',
};

const filterLabelsFR: Record<string, string> = {
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

export default function Projects() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  useSplitTitles(sectionRef, [lang]);
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filterLabels = lang === 'en' ? filterLabelsEN : filterLabelsFR;

  // Project catalogue lives in src/data/projects.ts (shared with the Home teaser).
  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">

        {/* Section Title */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-14"
        >
          <SectionBadge index="03" labelEN="Projects" labelFR="Projets" color="emerald" />
          <h2 data-split-title className="text-4xl md:text-5xl font-medium font-heading mb-4 text-center">
            {lang === 'en' ? (
              <>My <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Completed Projects</span></>
            ) : (
              <>Mes <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Projets Réalisés</span></>
            )}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <p className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            {lang === 'en'
              ? 'Discover a selection of my recent work, including backend architectures and modern frontend interfaces.'
              : 'Découvrez une sélection de mes travaux récents, incluant des architectures backend et des interfaces frontend modernes.'}
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
                whileHover={{ y: -6, transition: baseTransition(0.3) }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group rounded-3xl glass-effect border border-[var(--border-color)] overflow-hidden transition-[box-shadow,border-color] duration-300 hover:shadow-xl hover:shadow-blue-600/15 hover:border-blue-500/25 flex flex-col cursor-pointer"
              >
                {/* Project Visual — initiales */}
                <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${projectCategoryColors[project.category]} flex items-center justify-center`}>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_35%,rgba(255,255,255,0.18),transparent_70%)]"
                  />
                  <span className="text-6xl font-bold font-heading text-white/30 select-none tracking-[0.2em] transition-transform duration-500 group-hover:scale-110">
                    {getInitials(project.title)}
                  </span>

                  {/* Hover overlay - Single CTA to open the modal */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-950/65 backdrop-blur-sm">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-body text-sm font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {lang === 'en' ? 'Project details' : 'Détails du projet'}
                      <ArrowUpRight size={15} />
                    </motion.button>
                  </div>

                  {/* GitHub quick link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} — GitHub`}
                    className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/25 border border-white/10 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5"
                  >
                    <Github size={16} />
                  </a>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[var(--electric)] text-[11px] font-body font-semibold uppercase tracking-wide border border-blue-500/15">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                      {project.category}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-[var(--text-muted)] transition-all duration-300 group-hover:text-[var(--electric)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold font-heading mb-2 text-[var(--text-primary)]">{project.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-5 flex-grow font-body line-clamp-3">
                    {lang === 'en' ? project.descriptionEN : project.descriptionFR}
                  </p>
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <TechBadges tech={project.tech} max={4} />
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
                  aria-label={lang === 'en' ? 'Close' : 'Fermer'}
                >
                  <X size={18} />
                </button>

                {/* Modal category badge */}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[var(--electric)] text-xs font-body font-semibold uppercase tracking-wide border border-blue-500/15 w-fit block mb-3">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                  {selectedProject.category}
                </span>

                {/* Modal title */}
                <h3 className="text-3xl md:text-4xl font-medium font-heading mb-4 text-[var(--text-primary)]">
                  {selectedProject.title}
                </h3>

                {/* Modal long description */}
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-6 font-body">
                  {lang === 'en' ? selectedProject.longDescriptionEN : selectedProject.longDescriptionFR}
                </p>

                {/* Key features */}
                {(lang === 'en' ? selectedProject.featuresEN : selectedProject.featuresFR) && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-body mb-3">
                      {lang === 'en' ? 'Key Features' : 'Fonctionnalités Clés'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[var(--text-secondary)] font-body font-light">
                      {(lang === 'en' ? selectedProject.featuresEN : selectedProject.featuresFR).map((feat, idx) => (
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
                    {lang === 'en' ? 'Technologies Used' : 'Technologies Utilisées'}
                  </h4>
                  <TechBadges tech={selectedProject.tech} max={selectedProject.tech.length} size="md" />
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
                    {lang === 'en' ? 'Source Code (GitHub)' : 'Code Source (GitHub)'}
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
                    {lang === 'en' ? 'View Live Demo' : 'Voir la Démo Live'}
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

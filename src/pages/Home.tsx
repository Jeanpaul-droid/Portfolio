import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import SectionBadge from '../components/SectionBadge';
import TechBadges from '../components/TechBadges';
import { projectsData, projectCategoryColors } from '../data/projects';
import { useLang } from '../context/LanguageContext';
import { fadeUpVariants, inViewProps } from '../utils/animations';

function getInitials(title: string): string {
  return title
    .split(/[-\s]/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);
}

/** Landing page: Hero + Skills + featured projects teaser + contact CTA. */
export default function Home() {
  const { lang } = useLang();
  const featured = projectsData.slice(0, 3);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Skills />

      {/* Featured projects teaser */}
      <section className="py-16 px-6 relative">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            {...inViewProps}
            variants={fadeUpVariants}
            className="flex flex-col items-center mb-12"
          >
            <SectionBadge index="03" labelEN="Projects" labelFR="Projets" color="emerald" />
            <h2 className="text-4xl md:text-5xl font-medium font-heading mb-4 text-center">
              {lang === 'en' ? (
                <>Featured <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Work</span></>
              ) : (
                <>Projets <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">à la une</span></>
              )}
            </h2>
            <p className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
              {lang === 'en'
                ? 'A glimpse of my recent work — explore the full catalogue.'
                : 'Un aperçu de mes travaux récents — explorez le catalogue complet.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featured.map((project, index) => (
              <motion.div
                key={project.id}
                {...inViewProps}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to="/projects"
                  className="group rounded-3xl glass-effect border border-[var(--border-color)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/15 hover:border-blue-500/25 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${projectCategoryColors[project.category]} flex items-center justify-center`}>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_35%,rgba(255,255,255,0.18),transparent_70%)]"
                    />
                    <span className="text-4xl font-bold font-heading text-white/30 select-none tracking-[0.2em] transition-transform duration-500 group-hover:scale-110">
                      {getInitials(project.title)}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow text-left">
                    <h3 className="text-lg font-semibold font-heading mb-1.5 text-[var(--text-primary)] group-hover:text-[var(--electric)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-4 flex-grow font-body line-clamp-3">
                      {lang === 'en' ? project.descriptionEN : project.descriptionFR}
                    </p>
                    <div className="pt-3.5 border-t border-[var(--border-color)] mb-4">
                      <TechBadges tech={project.tech} max={3} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[var(--electric)]">
                      {lang === 'en' ? 'View details' : 'Voir les détails'}
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-body font-semibold text-sm md:text-base transition-all duration-300 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              {lang === 'en' ? 'View all projects' : 'Voir tous les projets'}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA banner */}
      <section className="py-16 px-6 relative">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            {...inViewProps}
            variants={fadeUpVariants}
            className="rounded-3xl glass-effect border border-[var(--border-color)] px-6 py-10 md:py-14 text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-blue-500/15 blur-[80px] pointer-events-none" />
            <h2 className="font-heading font-medium text-3xl md:text-5xl text-[var(--text-primary)] leading-tight mb-4">
              {lang === 'en' ? (
                <>Have a project <span className="italic text-[var(--electric)]">in mind?</span></>
              ) : (
                <>Un projet <span className="italic text-[var(--electric)]">en tête ?</span></>
              )}
            </h2>
            <p className="font-body font-light text-sm md:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed mb-8">
              {lang === 'en'
                ? 'Tell me about your idea — I reply fast and build to last.'
                : 'Parlez-moi de votre idée — je réponds vite et je construis pour durer.'}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-body font-semibold text-sm md:text-base transition-all duration-300 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              {lang === 'en' ? "Let's talk" : 'Discutons-en'}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

import { useState } from 'react';
import { Briefcase, GraduationCap, Zap, Award, Coffee, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, slideLeft, slideRight, inViewProps } from '../utils/animations';

export default function About() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const stats = [
    { icon: <Zap size={20} className="text-[var(--electric)]" />, value: '3+', label: "Ans d'activité" },
    { icon: <Award size={20} className="text-[var(--electric)]" />, value: '25+', label: 'Projets livrés' },
    { icon: <Coffee size={20} className="text-amber-500" />, value: '999+', label: 'Cafés consommés' },
  ];

  const experiences = [
    {
      role: 'Développeur Full-Stack Freelance',
      company: 'Indépendant',
      period: '2024 - Présent',
      desc: 'Conception d\'architectures full-stack robustes, création d\'API performantes en Node.js et intégration d\'interfaces dynamiques avec React & Next.js.',
    },
    {
      role: 'Développeur Informatique Full-Stack',
      company: 'Solutions Numériques SA',
      period: '2022 - 2024',
      desc: 'Développement d\'outils d\'automatisation internes, gestion de bases de données relationnelles et maintenance d\'applications critiques.',
    },
    {
      role: 'Développeur JavaScript',
      company: 'Startup Lab',
      period: '2021 - 2022',
      desc: 'Développement front-end responsive et intégration d\'API tierces sous la supervision de développeurs seniors.',
    },
  ];

  const education = [
    {
      role: 'Master en Informatique & Systèmes',
      company: 'École Supérieure de Génie Informatique',
      period: '2019 - 2021',
      desc: 'Spécialisation en développement logiciel, algorithmes avancés et bases de données relationnelles / non-relationnelles.',
    },
    {
      role: 'Licence en Technologie Informatique',
      company: 'Université des Sciences',
      period: '2016 - 2019',
      desc: 'Bases théoriques solides : Algorithmique, Langage C/Java, SQL, et Administration Réseau.',
    },
  ];

  const timelineItems = activeTab === 'experience' ? experiences : education;

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="flex flex-col items-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            À Propos de <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Moi</span>
          </motion.h2>
          <motion.div variants={staggerItem} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <motion.p variants={staggerItem} className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            Découvrez mon profil de développeur informatique, mes statistiques clés et mon parcours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Bio + Stats */}
          <motion.div
            {...inViewProps}
            variants={slideLeft}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div className="p-7 rounded-2xl glass-effect border border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
                <Code2 size={22} />
                <h3 className="text-xl font-semibold font-heading text-[var(--text-primary)]">Mon Profil</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-sm md:text-base mb-4 font-light leading-relaxed font-body">
                Je suis un développeur informatique passionné par la résolution de problèmes complexes et la création d'architectures applicatives propres. Mon domaine d'expertise couvre le développement full-stack.
              </p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed font-body">
                J'apporte une attention particulière à l'écriture de code réutilisable, modifiable et évolutif. Mon objectif est de fournir des logiciels stables et performants.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="p-4 rounded-2xl glass-effect border border-[var(--border-color)] flex flex-col items-center text-center cursor-default"
                >
                  <div className="mb-2 p-2 rounded-xl bg-[var(--bg-app)]">{stat.icon}</div>
                  <div className="text-xl md:text-2xl font-bold font-heading text-[var(--text-primary)]">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-[var(--text-muted)] mt-1 font-medium font-body">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Panel */}
          <motion.div
            {...inViewProps}
            variants={slideRight}
            className="md:col-span-7 flex flex-col"
          >
            {/* Tab Selector */}
            <div className="flex gap-2 mb-7 bg-[var(--bg-card)] border border-[var(--border-color)] p-1.5 rounded-2xl w-fit">
              <button
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--electric)]'
                }`}
                onClick={() => setActiveTab('experience')}
              >
                <Briefcase size={16} />
                Expérience
              </button>
              <button
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--electric)]'
                }`}
                onClick={() => setActiveTab('education')}
              >
                <GraduationCap size={16} />
                Formation
              </button>
            </div>

            {/* Timeline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative pl-6 border-l-2 border-[var(--border-color)] flex flex-col gap-6 text-left"
              >
                {timelineItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-[var(--bg-app)] border-2 border-[var(--electric)] group-hover:bg-[var(--electric)] transition-colors duration-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 rounded-2xl glass-effect border border-[var(--border-color)] hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/5">
                      <span className="text-xs font-semibold text-[var(--electric)] font-mono">{item.period}</span>
                      <h4 className="text-base md:text-lg font-bold font-heading mt-1 text-[var(--text-primary)]">{item.role}</h4>
                      <h5 className="text-sm text-[var(--text-muted)] font-medium mt-0.5 font-body">{item.company}</h5>
                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-2 font-light leading-relaxed font-body">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

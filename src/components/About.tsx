import { useState } from 'react';
import { Briefcase, GraduationCap, Zap, Award, BookOpen, Code2, Sparkles, Laptop, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, inViewProps } from '../utils/animations';

interface Hobby {
  icon: React.ReactNode;
  name: string;
  desc: string;
}

export default function About() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const stats = [
    { icon: <Zap size={20} className="text-[var(--electric)]" />, value: '3+', label: "Ans d'activité" },
    { icon: <Award size={20} className="text-[var(--electric)]" />, value: '25+', label: 'Projets livrés' },
    { icon: <BookOpen size={20} className="text-[var(--electric)]" />, value: 'L2 ➔ L3', label: 'SIL Spé. Dev Logiciel' },
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
      role: 'Licence en Systèmes Informatiques et Logiciels (SIL)',
      company: 'Université (Spécialisation : Développement Logiciel)',
      period: '2024 - Présent (Passage en Licence 3 cette année)',
      desc: 'Conception de systèmes informatiques, génie logiciel, développement d\'applications, structures de données, bases de données et modélisation logicielle.',
    },
    {
      role: 'Baccalauréat & DTI (Diplôme de Technicien Industriel)',
      company: 'Série Électrotechnique',
      period: '2023 - 2024',
      desc: 'Obtention conjointe du Baccalauréat technique et du DTI, axée sur l\'automatisme, la distribution d\'énergie et les systèmes industriels.',
    },
    {
      role: 'CAP (Certificat d\'Aptitude Professionnelle)',
      company: 'Série Électrotechnique',
      period: '2022 - 2023',
      desc: 'Diplôme professionnel technique axé sur les bases de l\'électricité industrielle et de l\'électrotechnique.',
    },
  ];

  const hobbies: Hobby[] = [
    { icon: <Laptop size={16} className="text-[var(--electric)]" />, name: 'Électronique DIY & Robotique', desc: 'Création d\'objets connectés et programmation de microcontrôleurs (Arduino/ESP32).' },
    { icon: <Code2 size={16} className="text-[var(--electric)]" />, name: 'Algorithmique', desc: 'Résolution de problèmes complexes et optimisation de scripts.' },
    { icon: <Sparkles size={16} className="text-[var(--electric)]" />, name: 'Domotique & Smart Home', desc: 'Automatisation d\'environnements résidentiels connectés.' },
  ];

  const timelineItems = activeTab === 'experience' ? experiences : education;

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="flex flex-col items-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-5xl md:text-6xl font-bold font-heading mb-4 text-center tracking-wider uppercase">
            À Propos de <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Moi</span>
          </motion.h2>
          <motion.div variants={staggerItem} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <motion.p variants={staggerItem} className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            Découvrez mon profil hybride, combinant ingénierie matérielle et développement logiciel.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout (12 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Bio & Rigueur (md:col-span-8) */}
          <motion.div
            {...inViewProps}
            variants={staggerItem}
            className="md:col-span-8 p-7 md:p-8 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
                <Code2 size={22} />
                <h3 className="text-lg font-bold font-body text-[var(--text-primary)]">Mon Profil</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-sm md:text-base mb-4 font-light leading-relaxed font-body">
                Je suis un développeur informatique passionné par la résolution de problèmes complexes et la création d'architectures applicatives propres. Mon parcours est unique : après de solides bases techniques et industrielles en <strong>Électrotechnique</strong>, je me suis orienté vers le <strong>génie logiciel et les systèmes informatiques (SIL)</strong>.
              </p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed font-body">
                Cette double compétence me permet d'aborder le développement avec une rigueur industrielle, tout en étant capable de faire le pont entre le monde matériel (systèmes embarqués, IoT) et logiciel (applications web full-stack, APIs et bases de données).
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-[var(--electric)] text-xs font-semibold uppercase tracking-wide border border-blue-500/15">
                Rigueur Industrielle
              </span>
              <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-[var(--electric)] text-xs font-semibold uppercase tracking-wide border border-blue-500/15">
                Clean Code
              </span>
            </div>
          </motion.div>

          {/* Card 2: Stats (md:col-span-4) */}
          <motion.div
            {...inViewProps}
            variants={staggerItem}
            className="md:col-span-4 grid grid-rows-3 gap-4"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-3xl glass-effect border border-[var(--border-color)] flex items-center gap-4 transition-all duration-300 hover:border-blue-500/20 hover:shadow-lg"
              >
                <div className="p-3 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl md:text-2xl font-bold font-body text-[var(--text-primary)] leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium font-body mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card 3: Profil Hybride / Passerelle IoT (md:col-span-4) */}
          <motion.div
            {...inViewProps}
            variants={staggerItem}
            className="md:col-span-4 p-7 md:p-8 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
                <ShieldCheck size={22} />
                <h3 className="text-lg font-bold font-body text-[var(--text-primary)]">Profil Hybride</h3>
              </div>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed font-body">
                Ma formation en Électrotechnique (CAP ➔ DTI ➔ Bac) combinée à mes études universitaires en SIL (Développement Logiciel) me donne des compétences uniques pour l'IoT et les applications interconnectées.
              </p>
              
              {/* Micro-scheme illustration */}
              <div className="mt-6 p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col gap-3 font-mono text-[10px] text-[var(--text-secondary)]">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <span className="text-teal-500">Matériel (DTI)</span>
                  <span className="text-xs">⚡</span>
                </div>
                <div className="h-1 w-full bg-[var(--border-color)] rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--electric)]">Logiciel (SIL)</span>
                  <span className="text-xs">💻</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Timeline Panel (md:col-span-8 md:row-span-2) */}
          <motion.div
            {...inViewProps}
            variants={staggerItem}
            className="md:col-span-8 md:row-span-2 p-7 md:p-8 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col justify-between text-left"
          >
            <div className="w-full">
              {/* Tab Selector */}
              <div className="flex gap-2 mb-7 bg-[var(--bg-card)] border border-[var(--border-color)] p-1.5 rounded-2xl w-fit">
                <button
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 cursor-pointer ${
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 cursor-pointer ${
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

              {/* Timeline Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative pl-6 border-l-2 border-[var(--border-color)] flex flex-col gap-6"
                >
                  {timelineItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="relative group"
                    >
                      {/* Timeline dot marker */}
                      <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-[var(--bg-app)] border-2 border-[var(--electric)] group-hover:bg-[var(--electric)] transition-colors duration-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg">
                        <span className="text-xs font-semibold text-[var(--electric)] font-mono">{item.period}</span>
                        <h4 className="text-base font-bold font-body mt-1 text-[var(--text-primary)]">{item.role}</h4>
                        <h5 className="text-xs text-[var(--text-muted)] font-medium mt-0.5 font-body">{item.company}</h5>
                        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-2 font-light leading-relaxed font-body">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 5: Hobbies / Passions (md:col-span-4) */}
          <motion.div
            {...inViewProps}
            variants={staggerItem}
            className="md:col-span-4 p-7 md:p-8 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col text-left hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
              <Sparkles size={22} />
              <h3 className="text-lg font-bold font-body text-[var(--text-primary)]">Intérêts</h3>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              {hobbies.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {h.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--text-primary)] font-body leading-snug">
                      {h.name}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-body leading-relaxed mt-0.5">
                      {h.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

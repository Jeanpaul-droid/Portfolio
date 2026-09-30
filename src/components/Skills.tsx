import { useRef, useState } from 'react';
import { Layout, Server, Settings, Cpu, Database, Code2, Zap, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps } from '../utils/animations';
import { useLang } from '../context/LanguageContext';
import { useSplitTitles } from '../hooks/useSplitTitles';
import SectionBadge from './SectionBadge';

interface Skill {
  name: string;
}

// Logo helper component using Simple Icons CDN and Lucide fallbacks
const SkillIcon = ({ name, className = "w-8 h-8" }: { name: string; className?: string }) => {
  const normName = name.toLowerCase().trim();

  // Mapping to Simple Icons slug
  let slug = '';
  if (normName.includes('react')) slug = 'react';
  else if (normName.includes('next')) slug = 'nextdotjs';
  else if (normName === 'html') slug = 'html5';
  else if (normName === 'css') slug = 'css3';
  else if (normName === 'javascript') slug = 'javascript';
  else if (normName.includes('python')) slug = 'python';
  else if (normName.includes('firebase')) slug = 'firebase';
  else if (normName.includes('postgres')) slug = 'postgresql';
  else if (normName === 'docker') slug = 'docker';
  else if (normName.includes('git')) slug = 'git';
  else if (normName.includes('arduino')) slug = 'arduino';
  else if (normName === 'java') slug = 'java';
  else if (normName === 'php') slug = 'php';
  else if (normName === 'postman') slug = 'postman';
  else if (normName === 'vs code') slug = 'visualstudiocode';
  else if (normName.includes('laravel')) slug = 'laravel';
  else if (normName.includes('express')) slug = 'express';

  if (slug) {
    const isDarkInverted = slug === 'nextdotjs';
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        className={`${className} object-contain ${isDarkInverted ? 'dark:invert' : ''}`}
        loading="lazy"
      />
    );
  }

  // Fallbacks using Lucide Icons for electrotechnical and generic concepts
  switch (normName) {
    case 'express js':
      return <Server className={`${className} text-emerald-500`} />;
    case 'sql':
      return <Database className={`${className} text-blue-500`} />;
    case 'électrotechnique / câblage':
      return <Zap className={`${className} text-yellow-500 fill-current`} />;
    case 'automates programmables (api)':
      return <Cpu className={`${className} text-red-400`} />;
    case 'conception de circuits (proteus)':
      return <Sliders className={`${className} text-purple-400`} />;
    default:
      return <Code2 className={`${className} text-[var(--electric)]`} />;
  }
};

export default function Skills() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'embedded' | 'tools'>('frontend');
  const sectionRef = useRef<HTMLElement>(null);
  useSplitTitles(sectionRef, [lang]);

  const frontendSkills: Skill[] = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'React js' },
    { name: 'Next js' },
  ];

  const backendSkills: Skill[] = [
    { name: 'Laravel' },
    { name: 'PHP' },
    { name: 'Express js' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'SQL' },
    { name: 'Postgresql' },
    { name: 'Firebase' },
  ];

  const embeddedSkills: Skill[] = [
    { name: 'Électrotechnique / Câblage' },
    { name: 'Automates programmables (API)' },
    { name: 'Systèmes embarqués (Arduino/ESP32)' },
    { name: 'Conception de circuits (Proteus)' },
  ];

  const toolsSkills: Skill[] = [
    { name: 'Git / GitHub' },
    { name: 'VS Code' },
    { name: 'Postman' },
    { name: 'Docker' },
  ];

  const getTabSkills = () => {
    switch (activeTab) {
      case 'frontend': return frontendSkills;
      case 'backend': return backendSkills;
      case 'embedded': return embeddedSkills;
      case 'tools': return toolsSkills;
      default: return [];
    }
  };

  const tabs = [
    { id: 'frontend' as const, nameEN: 'Front-End', nameFR: 'Front-End', icon: <Layout size={17} /> },
    { id: 'backend' as const, nameEN: 'Back-End & Databases', nameFR: 'Back-End & BDD', icon: <Server size={17} /> },
    { id: 'embedded' as const, nameEN: 'Electronics & IoT', nameFR: 'Électronique & IoT', icon: <Cpu size={17} /> },
    { id: 'tools' as const, nameEN: 'Tools', nameFR: 'Outils', icon: <Settings size={17} /> },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-14"
        >
          <SectionBadge index="02" labelEN="Skills" labelFR="Compétences" color="violet" />
          <h2 data-split-title className="text-4xl md:text-5xl font-medium font-heading mb-4 text-center">
            {lang === 'en' ? (
              <>My <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Skills</span></>
            ) : (
              <>Mes <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Compétences</span></>
            )}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <p className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            {lang === 'en'
              ? 'A detailed view of the software and hardware technologies I use every day.'
              : 'Une vue détaillée des technologies logicielles et matérielles que je maîtrise au quotidien.'}
          </p>
        </motion.div>

        {/* Tab Controls */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-body text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border-transparent shadow-lg shadow-blue-600/20'
                  : 'text-[var(--text-secondary)] border-[var(--border-color)] hover:border-blue-500/30 bg-[var(--bg-card)]'
              }`}
            >
              {tab.icon}
              {lang === 'en' ? tab.nameEN : tab.nameFR}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Modern Technology Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {getTabSkills().map((skill, index) => {
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl glass-effect border border-[var(--border-color)] hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-default text-center group"
                >
                  {/* Technology Icon wrapper */}
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] group-hover:border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-inner mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <SkillIcon name={skill.name} className="w-9 h-9 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Name */}
                  <span className="text-sm font-semibold text-[var(--text-primary)] font-body text-center group-hover:text-[var(--electric)] transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

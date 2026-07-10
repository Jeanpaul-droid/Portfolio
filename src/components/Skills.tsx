import { useState } from 'react';
import { Layout, Server, Settings, Cpu, Database, Code2, Zap, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps } from '../utils/animations';

interface Skill {
  name: string;
  percentage: number;
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
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'embedded' | 'tools'>('frontend');

  const frontendSkills: Skill[] = [
    { name: 'HTML', percentage: 95 },
    { name: 'CSS', percentage: 80 },
    { name: 'JavaScript', percentage: 85 },
    { name: 'React js', percentage: 65 },
    { name: 'Next js', percentage: 70 },
  ];

  const backendSkills: Skill[] = [
    { name: 'Express js', percentage: 50 },
    { name: 'Python', percentage: 50 },
    { name: 'Java', percentage: 45 },
    { name: 'PHP', percentage: 50 },
    { name: 'SQL', percentage: 70 },
    { name: 'Postgresql', percentage: 40 },
    { name: 'Firebase', percentage: 30 },
  ];

  const embeddedSkills: Skill[] = [
    { name: 'Électrotechnique / Câblage', percentage: 90 },
    { name: 'Automates programmables (API)', percentage: 80 },
    { name: 'Systèmes embarqués (Arduino/ESP32)', percentage: 85 },
    { name: 'Conception de circuits (Proteus)', percentage: 75 },
  ];

  const toolsSkills: Skill[] = [
    { name: 'Git / GitHub', percentage: 85 },
    { name: 'VS Code', percentage: 90 },
    { name: 'Postman', percentage: 70 },
    { name: 'Docker', percentage: 45 },
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
    { id: 'frontend' as const, name: 'Front-End', icon: <Layout size={17} /> },
    { id: 'backend' as const, name: 'Back-End & BDD', icon: <Server size={17} /> },
    { id: 'embedded' as const, name: 'Électronique & IoT', icon: <Cpu size={17} /> },
    { id: 'tools' as const, name: 'Outils', icon: <Settings size={17} /> },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            Mes <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Compétences</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <p className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            Une vue détaillée des technologies logicielles et matérielles que je maîtrise, représentées par niveau d'expertise.
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
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Horizontal Premium Progress Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {getTabSkills().map((skill, index) => {
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-center gap-5 p-5 rounded-2xl glass-effect border border-[var(--border-color)] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300 cursor-default text-left"
                >
                  {/* Technology Icon wrapper */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 shadow-inner">
                    <SkillIcon name={skill.name} className="w-8 h-8" />
                  </div>

                  {/* Progress Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)] font-body truncate">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-[var(--electric)] font-mono">
                        {skill.percentage}%
                      </span>
                    </div>

                    {/* Horizontal bar track */}
                    <div className="w-full h-2 rounded-full bg-[var(--border-color)] overflow-hidden relative">
                      {/* Animated Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

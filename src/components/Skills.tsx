import { useState } from 'react';
import { Layout, Server, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, inViewProps } from '../utils/animations';

interface Skill {
  name: string;
  percentage: number;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'tools'>('frontend');

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

  const toolsSkills: Skill[] = [
    { name: 'Postman', percentage: 60 },
  ];

  const getTabSkills = () => {
    switch (activeTab) {
      case 'frontend': return frontendSkills;
      case 'backend': return backendSkills;
      case 'tools': return toolsSkills;
      default: return [];
    }
  };

  const tabs = [
    { id: 'frontend' as const, name: 'Front-End', icon: <Layout size={17} /> },
    { id: 'backend' as const, name: 'Back-End & BDD', icon: <Server size={17} /> },
    { id: 'tools' as const, name: 'Outils', icon: <Settings size={17} /> },
  ];

  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container max-w-5xl">

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
            Une vue détaillée des technologies et langages de programmation que je maîtrise, représentés par niveau de compétence.
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
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-body text-sm font-semibold transition-all duration-300 border ${
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

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center"
          >
            {getTabSkills().map((skill, index) => {
              const strokeOffset = circumference - (skill.percentage / 100) * circumference;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.07, y: -4 }}
                  className="group p-5 rounded-2xl glass-effect border border-[var(--border-color)] flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r={radius} className="stroke-[var(--border-color)] fill-none stroke-[6px]" />
                      <circle
                        cx="48" cy="48" r={radius}
                        className="fill-none stroke-[6px] transition-all duration-1000 ease-out"
                        stroke="var(--electric)"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute font-body text-sm font-medium text-[var(--text-primary)] tracking-tight">
                      {skill.percentage}%
                    </div>
                  </div>
                  <span className="font-body text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--electric)] transition-colors text-center">
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

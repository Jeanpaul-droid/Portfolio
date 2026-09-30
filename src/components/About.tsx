import { useRef, useState } from 'react';
import { GraduationCap, Zap, Award, BookOpen, Code2, Sparkles, Laptop, ShieldCheck, Server, Database, Cpu, GitBranch, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, inViewProps } from '../utils/animations';
import profilPhoto from '../assets/Profil photo.jpeg';
import Experience from './Experience';
import CountUp from './CountUp';
import SectionBadge from './SectionBadge';
import { useLang } from '../context/LanguageContext';
import { useSplitTitles } from '../hooks/useSplitTitles';

/**
 * About — narrative 3-act structure:
 *   Act 1 "Who I am"  : photo anchor + bio + hybrid DTI→SIL scheme + stats band
 *   Act 2 "What I did": full-width timeline, Experience first then Education (no tabs)
 *   Act 3 "What drives me": closing strip — interests + stack, light and airy
 */
export default function About() {
  const { lang } = useLang();
  const [bioOpen, setBioOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useSplitTitles(sectionRef, [lang]);

  const stats = [
    { icon: <Zap size={20} className="text-[var(--electric)]" />, countEnd: 3, value: '3+', labelEN: 'Years of activity', labelFR: "Ans d'activité" },
    { icon: <Award size={20} className="text-[var(--electric)]" />, countEnd: 25, value: '25+', labelEN: 'Projects delivered', labelFR: 'Projets livrés' },
    { icon: <BookOpen size={20} className="text-[var(--electric)]" />, countEnd: null as number | null, value: 'L2 ➔ L3', labelEN: 'SIL – Software Development', labelFR: 'SIL Spé. Dev Logiciel' },
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

  const hobbies = [
    { icon: <Laptop size={16} className="text-[var(--electric)]" />, nameEN: 'DIY Electronics & Robotics', nameFR: 'Électronique DIY & Robotique', descEN: 'Building connected objects and programming microcontrollers (Arduino/ESP32).', descFR: 'Création d\'objets connectés et programmation de microcontrôleurs (Arduino/ESP32).' },
    { icon: <Code2 size={16} className="text-[var(--electric)]" />, nameEN: 'Algorithms', nameFR: 'Algorithmique', descEN: 'Solving complex problems and optimizing scripts.', descFR: 'Résolution de problèmes complexes et optimisation de scripts.' },
    { icon: <Sparkles size={16} className="text-[var(--electric)]" />, nameEN: 'Smart Home & Automation', nameFR: 'Domotique & Smart Home', descEN: 'Automating connected home environments.', descFR: 'Automatisation d\'environnements résidentiels connectés.' },
  ];

  const stack = [
    { icon: <Code2 size={20} />, labelEN: 'React / Frontend', labelFR: 'React / Frontend' },
    { icon: <Server size={20} />, labelEN: 'Node / Backend', labelFR: 'Node / Backend' },
    { icon: <Database size={20} />, labelEN: 'Databases', labelFR: 'Bases de données' },
    { icon: <Cpu size={20} />, labelEN: 'IoT / Embedded', labelFR: 'IoT / Embarqué' },
    { icon: <GitBranch size={20} />, labelEN: 'Git / Versioning', labelFR: 'Git / Versioning' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="container max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="flex flex-col items-center mb-12"
        >
          <SectionBadge index="01" labelEN="About" labelFR="À propos" color="blue" />
          <h2 data-split-title className="text-4xl md:text-5xl font-medium font-heading mb-4 text-center">
            {lang === 'en' ? (
              <>About <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Me</span></>
            ) : (
              <>À Propos de <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Moi</span></>
            )}
          </h2>
          <motion.div variants={staggerItem} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <motion.p variants={staggerItem} className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            {lang === 'en'
              ? 'Discover my hybrid profile, combining hardware engineering and software development.'
              : 'Découvrez mon profil hybride, combinant ingénierie matérielle et développement logiciel.'}
          </motion.p>
        </motion.div>

        {/* ── ACT 1 — WHO I AM : photo anchor + bio card, stats band below ── */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-6"
        >
          {/* Visuel principal (2/3) */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-2 relative overflow-hidden rounded-3xl glass-effect border border-[var(--border-color)] min-h-[280px] md:min-h-[380px] group"
          >
            <img
              src={profilPhoto}
              alt={lang === 'en' ? 'de-SOUZA Jeanpaul at work' : 'de-SOUZA Jeanpaul en situation de travail'}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex items-end justify-between gap-4">
              <div className="text-left">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300 mb-2">
                  {lang === 'en' ? 'Available — Freelance & Full-time' : 'Disponible — Freelance & CDI'}
                </p>
                <p className="font-heading font-medium text-2xl md:text-3xl text-white leading-tight">
                  {lang === 'en' ? (
                    <>Industrial rigor,<br />software excellence.</>
                  ) : (
                    <>Rigueur industrielle,<br />exigence logicielle.</>
                  )}
                </p>
              </div>
              <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center flex-shrink-0">
                <Code2 size={20} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Colonne droite (1/3) : bio + schéma hybride (fusion de l'ancienne carte Profil Hybride) */}
          <motion.div variants={staggerItem} className="flex flex-col gap-5 md:gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent p-6 md:p-7 text-left flex-1">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-500/20 blur-[60px] pointer-events-none" />
              <h3 className="font-heading font-medium text-2xl md:text-[1.7rem] leading-[1.15] text-[var(--text-primary)] mb-3">
                {lang === 'en'
                  ? 'I turn your ideas into high-performing applications.'
                  : 'Je transforme vos idées en applications performantes.'}
              </h3>
              <p className="font-body font-light text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {lang === 'en'
                  ? 'Less time wasted, the essentials delivered: clean APIs, fast interfaces, healthy databases.'
                  : 'Moins de temps perdu, l\'essentiel livré : APIs propres, interfaces rapides, bases saines.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-[var(--electric)] text-xs font-semibold uppercase tracking-wide border border-blue-500/15">
                  {lang === 'en' ? 'Industrial Rigor' : 'Rigueur Industrielle'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-[var(--electric)] text-xs font-semibold uppercase tracking-wide border border-blue-500/15">
                  Clean Code
                </span>
              </div>
            </div>

            {/* Micro-scheme — DTI → SIL bridge (moved from the deleted Hybrid card) */}
            <div className="rounded-3xl glass-effect border border-[var(--border-color)] p-5">
              <div className="flex items-center gap-3 mb-4 text-[var(--electric)]">
                <ShieldCheck size={18} />
                <h4 className="font-body text-sm font-bold text-[var(--text-primary)]">
                  {lang === 'en' ? 'Hybrid Profile' : 'Profil Hybride'}
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col gap-3 font-mono text-[10px] text-[var(--text-secondary)]">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <span className="text-teal-500">{lang === 'en' ? 'Hardware (DTI)' : 'Matériel (DTI)'}</span>
                  <Zap size={12} className="text-teal-500" />
                </div>
                <div className="h-1.5 w-full bg-[var(--border-color)] rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '66%' }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--electric)]">{lang === 'en' ? 'Software (SIL)' : 'Logiciel (SIL)'}</span>
                  <Laptop size={12} className="text-[var(--electric)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bio développeur — courte version dépliante + stats band */}
        <motion.div {...inViewProps} variants={staggerContainer} className="mb-10">
          <motion.div
            variants={staggerItem}
            className="rounded-3xl glass-effect border border-[var(--border-color)] p-5 md:p-7 text-left"
          >
            <div className="flex items-center gap-3 mb-4 text-[var(--electric)]">
              <Code2 size={20} />
              <h3 className="text-base md:text-lg font-bold font-body text-[var(--text-primary)]">
                {lang === 'en' ? 'My Profile' : 'Mon Profil'}
              </h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed font-body">
              {lang === 'en' ? (
                <>I am a software developer driven by complex problem-solving and clean application architectures. After solid technical foundations in <strong>Electrotechnics</strong>, I moved into <strong>software engineering and information systems (SIL)</strong>.</>
              ) : (
                <>Je suis un développeur informatique passionné par la résolution de problèmes complexes et la création d'architectures applicatives propres. Après de solides bases techniques en <strong>Électrotechnique</strong>, je me suis orienté vers le <strong>génie logiciel et les systèmes informatiques (SIL)</strong>.</>
              )}
            </p>
            <AnimatePresence initial={false}>
              {bioOpen && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed font-body overflow-hidden"
                >
                  {lang === 'en'
                    ? 'This dual expertise lets me approach development with industrial rigor, bridging the physical world (embedded systems, IoT) and software (full-stack web applications, APIs and databases).'
                    : 'Cette double compétence me permet d\'aborder le développement avec une rigueur industrielle, tout en étant capable de faire le pont entre le monde matériel (systèmes embarqués, IoT) et logiciel (applications web full-stack, APIs et bases de données).'}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              onClick={() => setBioOpen((v) => !v)}
              aria-expanded={bioOpen}
              className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-[var(--electric)] hover:opacity-80 transition-opacity cursor-pointer"
            >
              {bioOpen
                ? (lang === 'en' ? 'Show less' : 'Lire moins')
                : (lang === 'en' ? 'Read more' : 'Lire plus')}
              <ChevronDown size={14} className={`transition-transform duration-300 ${bioOpen ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Stats band — 3 credibilities chips in one calm row */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5"
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
                    {stat.countEnd !== null ? <CountUp end={stat.countEnd} suffix="+" /> : stat.value}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium font-body mt-0.5">
                    {lang === 'en' ? stat.labelEN : stat.labelFR}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider — breathing room before the journey */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--border-color)]" />
          <span className="px-4 py-1.5 rounded-full glass-effect border border-[var(--border-color)] font-body text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] whitespace-nowrap">
            {lang === 'en' ? 'My journey' : 'Mon parcours'}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--border-color)]" />
        </div>

        {/* ── ACT 2 — WHAT I DID : full-width timeline, no tabs ── */}
        <motion.div {...inViewProps} variants={staggerContainer} className="mb-14">
          <Experience />

          {/* Education sub-block — visually distinct from experience */}
          <motion.div variants={staggerItem} className="mt-12">
            <div className="flex items-center gap-3 mb-6 text-[var(--electric)]">
              <GraduationCap size={22} />
              <h3 className="font-heading font-medium text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">
                {lang === 'en' ? 'Education' : 'Formation'}
              </h3>
            </div>
            <div className="relative pl-6 border-l-2 border-[var(--border-color)] flex flex-col gap-6">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
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
            </div>
          </motion.div>
        </motion.div>

        {/* ── ACT 3 — WHAT DRIVES ME : light closing strip ── */}
        <motion.div {...inViewProps} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Interests */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-7 p-5 md:p-7 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col text-left hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
              <Sparkles size={20} />
              <h3 className="text-base md:text-lg font-bold font-body text-[var(--text-primary)]">
                {lang === 'en' ? 'Interests' : 'Intérêts'}
              </h3>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              {hobbies.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {h.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--text-primary)] font-body leading-snug">
                      {lang === 'en' ? h.nameEN : h.nameFR}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-body leading-relaxed mt-0.5">
                      {lang === 'en' ? h.descEN : h.descFR}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stack */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-5 p-5 md:p-7 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col text-left hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5 text-[var(--electric)]">
              <Cpu size={20} />
              <h3 className="text-base md:text-lg font-bold font-body text-[var(--text-primary)]">
                {lang === 'en' ? 'Toolkit' : 'Boîte à outils'}
              </h3>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2.5 flex-grow content-start">
              {stack.map((item, i) => (
                <div
                  key={i}
                  title={lang === 'en' ? item.labelEN : item.labelFR}
                  className="aspect-square w-full rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--electric)] transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-0.5 cursor-default"
                >
                  {item.icon}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-body leading-relaxed mt-4">
              {lang === 'en'
                ? 'From sensor to screen — one toolchain, end to end.'
                : 'Du capteur à l\'écran — une seule chaîne d\'outils, de bout en bout.'}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

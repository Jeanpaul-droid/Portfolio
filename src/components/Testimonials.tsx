import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, inViewProps } from '../utils/animations';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarInitials: string;
}

export default function Testimonials() {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: 'Alexandre G.',
      role: 'Lead Developer & Mentor',
      company: 'Solutions Numériques SA',
      text: "Jeanpaul est un développeur rigoureux, autonome et investi. Sa capacité à comprendre rapidement les architectures complexes (API Express, base PostgreSQL) et à intégrer des interfaces dynamiques en React a été un réel atout lors de son passage parmi nous.",
      avatarInitials: 'AG',
    },
    {
      id: 2,
      name: 'Dr. Marc L.',
      role: 'Enseignant en Systèmes Embarqués',
      company: 'Département SIL / Université',
      text: "Le double profil de Jeanpaul — solide formation en électrotechnique associée à d'excellentes compétences en développement logiciel — est particulièrement remarquable. Son projet de supervision d'automates connectés a démontré toute sa maîtrise des architectures hybrides matériel/logiciel.",
      avatarInitials: 'ML',
    },
    {
      id: 3,
      name: 'Sophie K.',
      role: 'Product Owner',
      company: 'Startup Lab',
      text: "Nous avons travaillé avec Jeanpaul sur l'intégration d'API tierces et la création d'interfaces utilisateur modernes. Sa rigueur, son attention portée à la propreté du code et son respect des délais ont grandement facilité la réussite de notre projet.",
      avatarInitials: 'SK',
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none z-0" />

      <div className="container max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="flex flex-col items-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            Recommandations & <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Témoignages</span>
          </motion.h2>
          <motion.div variants={staggerItem} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <motion.p variants={staggerItem} className="text-center text-[var(--text-muted)] max-w-xl font-light font-body">
            Ce que mes mentors professionnels, enseignants universitaires et collaborateurs disent de mon travail et de ma rigueur technique.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          {...inViewProps}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonialsData.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-8 rounded-3xl glass-effect border border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-600/5"
            >
              {/* Quote Icon overlay */}
              <div className="absolute top-6 right-6 text-[var(--border-color)] group-hover:text-blue-500/20 transition-colors duration-300">
                <Quote size={36} className="rotate-180 transform fill-current opacity-20" />
              </div>

              {/* Card Body */}
              <div className="flex-grow mb-6 relative">
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-body font-light leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Card Footer (Author) */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)] mt-auto">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-700/10 flex items-center justify-center border border-blue-500/10 text-[var(--electric)] font-heading font-bold text-sm select-none">
                  {item.avatarInitials}
                </div>
                {/* Info */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-[var(--text-primary)] font-heading">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--text-muted)] font-body tracking-wider uppercase leading-none mt-1">
                    {item.role}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--electric)] font-mono mt-1">
                    {item.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

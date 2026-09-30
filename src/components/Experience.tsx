import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { experiences } from '../data/experience';
import { useLang } from '../context/LanguageContext';
import { staggerContainer, staggerItem, inViewProps } from '../utils/animations';

/**
 * My Journey — verified HODD Global internships only.
 * Language comes from the global navbar switch (LangProvider).
 * All headings use Cormorant Garamond (font-heading), body uses Newblack (font-body).
 */
export default function Experience() {
  const { lang } = useLang();

  return (
    <motion.div
      {...inViewProps}
      variants={staggerContainer}
      className="relative pl-6"
    >
      {/* Timeline rail — reveals on scroll */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-0 top-1 bottom-1 w-[2px] origin-top rounded-full bg-[var(--border-color)]"
      />

      {/* Header */}
      <motion.div variants={staggerItem} className="text-left mb-7">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--electric)] mb-1">
          {lang === 'en' ? 'My Journey' : 'Mon parcours'}
        </p>
        <h3 className="font-heading font-medium text-2xl md:text-3xl text-[var(--text-primary)] leading-tight">
          {lang === 'en' ? 'Experience' : 'Expérience'}
        </h3>
      </motion.div>

      {/* Timeline cards */}
      <div className="flex flex-col gap-6">
        {experiences.map((item, idx) => (
          <motion.div key={item.id} variants={staggerItem} className="relative group">
            <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-[var(--bg-app)] border-2 border-[var(--electric)] group-hover:bg-[var(--electric)] transition-colors duration-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg text-left">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {idx + 1 === 1
                    ? lang === 'en'
                      ? 'Step 01'
                      : 'Étape 01'
                    : lang === 'en'
                      ? 'Step 02'
                      : 'Étape 02'}
                </span>
                {item.confidential && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[var(--electric)] font-body text-[10px] font-bold uppercase tracking-wider">
                    <Lock size={11} />
                    {lang === 'en' ? 'Confidential / NDA' : 'Confidentiel / NDA'}
                  </span>
                )}
              </div>

              <h4 className="font-heading font-semibold text-xl md:text-2xl text-[var(--text-primary)] leading-snug">
                {item.company} — {lang === 'en' ? item.titleEN : item.titleFR}
              </h4>
              <p className="font-body text-xs text-[var(--text-muted)] font-medium mt-0.5">
                {lang === 'en' ? item.periodEN : item.periodFR}
              </p>
              <p className="font-body font-light text-xs md:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {lang === 'en' ? item.descriptionEN : item.descriptionFR}
              </p>

              {item.confidentialProject && (
                <div className="mt-4 p-4 rounded-xl bg-[var(--bg-app)] border border-dashed border-[var(--border-color)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-body text-sm font-bold text-[var(--text-primary)]">
                      {item.confidentialProject.name}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--electric)] font-body text-[10px] font-bold uppercase tracking-wider">
                      {lang === 'en'
                        ? item.confidentialProject.labelEN
                        : item.confidentialProject.labelFR}
                    </span>
                  </div>
                  <p className="font-body font-light text-xs text-[var(--text-muted)] leading-relaxed">
                    {lang === 'en'
                      ? item.confidentialProject.noteEN
                      : item.confidentialProject.noteFR}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Honest progression footnote — stages only, no invented milestones */}
      <motion.p
        variants={staggerItem}
        className="font-body font-light text-xs text-[var(--text-muted)] leading-relaxed mt-6 text-left"
      >
        {lang === 'en'
          ? 'Academic learning → first professional exposure → more practical development.'
          : 'Apprentissage académique → première exposition professionnelle → développement plus pratique.'}
      </motion.p>
    </motion.div>
  );
}

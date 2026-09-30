/**
 * VERIFIED EXPERIENCE DATA — HODD Global only.
 *
 * Every field below comes from the verified brief or was already
 * explicitly present in the project. Nothing is invented.
 *
 * Rules respected:
 * - No invented job title (labels "First/Second Internship" come from the brief).
 * - No invented dates/years (2025/2026 NOT confirmed in project → omitted).
 * - No technologies, responsibilities, results, clients, or figures.
 * - PGP is named only as a confidential/private project. No details exposed.
 */

export interface ConfidentialProject {
  /** Public name only. Never add repo links, screenshots, or internals. */
  name: string;
  labelEN: string;
  labelFR: string;
  noteEN: string;
  noteFR: string;
}

export interface ExperienceItem {
  id: string;
  company: 'HODD Global';
  /** Descriptive label from the brief — exact job title unknown. */
  titleEN: string;
  titleFR: string;
  /** Academic-year context from the brief — exact dates unknown. */
  periodEN: string;
  periodFR: string;
  descriptionEN: string;
  descriptionFR: string;
  confidential: boolean;
  confidentialProject?: ConfidentialProject;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'hodd-internship-1',
    company: 'HODD Global',
    titleEN: 'First Internship',
    titleFR: 'Premier stage',
    periodEN: 'First year',
    periodFR: 'Première année',
    descriptionEN:
      'First internship at HODD Global, focused on discovering the professional technology environment and making the transition from academic learning to real-world development.',
    descriptionFR:
      'Premier stage chez HODD Global, consacré à la découverte de l’environnement technologique professionnel et à la transition de l’apprentissage académique vers le développement réel.',
    confidential: false,
  },
  {
    id: 'hodd-internship-2',
    company: 'HODD Global',
    titleEN: 'Second Internship',
    titleFR: 'Deuxième stage',
    periodEN: 'Second year',
    periodFR: 'Deuxième année',
    descriptionEN:
      'Second internship at HODD Global, with a stronger focus on practical development and participation in real-world projects. Some of the work completed during this experience remains confidential.',
    descriptionFR:
      'Deuxième stage chez HODD Global, davantage orienté vers la pratique du développement et la participation à des projets réels. Une partie du travail réalisé dans ce cadre reste confidentielle.',
    confidential: true,
    confidentialProject: {
      name: 'PGP',
      labelEN: 'PRIVATE PROJECT',
      labelFR: 'PROJET PRIVÉ',
      noteEN:
        'Selected project details are protected by confidentiality agreements. Further information is available upon request.',
      noteFR:
        'Certains détails du projet sont protégés par des accords de confidentialité. Plus d’informations disponibles sur demande.',
    },
  },
];

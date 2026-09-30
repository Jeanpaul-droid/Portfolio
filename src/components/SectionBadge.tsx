import { useLang } from '../context/LanguageContext';

export type BadgeColor = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose';

const colorStyles: Record<BadgeColor, { pill: string; dot: string; text: string }> = {
  blue: {
    pill: 'bg-blue-500/10 border-blue-500/25',
    dot: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
  },
  violet: {
    pill: 'bg-violet-500/10 border-violet-500/25',
    dot: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
  },
  emerald: {
    pill: 'bg-emerald-500/10 border-emerald-500/25',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    pill: 'bg-amber-500/10 border-amber-500/25',
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  rose: {
    pill: 'bg-rose-500/10 border-rose-500/25',
    dot: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
  },
};

interface SectionBadgeProps {
  index: string;
  labelEN: string;
  labelFR: string;
  color: BadgeColor;
}

/** Arrival marker for each page section — numbered pill, one color per section. */
export default function SectionBadge({ index, labelEN, labelFR, color }: SectionBadgeProps) {
  const { lang } = useLang();
  const s = colorStyles[color];
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border ${s.pill} mb-5`}>
      <span className="relative flex w-2 h-2">
        <span className={`absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping ${s.dot}`} />
        <span className={`relative inline-flex w-2 h-2 rounded-full ${s.dot}`} />
      </span>
      <span className={`font-body text-[11px] font-bold uppercase tracking-[0.22em] ${s.text}`}>
        {index} · {lang === 'en' ? labelEN : labelFR}
      </span>
    </div>
  );
}

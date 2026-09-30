interface TechBadgesProps {
  tech: string[];
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

const dotPalette = [
  'bg-blue-400',
  'bg-sky-400',
  'bg-indigo-400',
  'bg-teal-400',
  'bg-violet-400',
  'bg-emerald-400',
];

function dotColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return dotPalette[hash % dotPalette.length];
}

export default function TechBadges({
  tech,
  max = 4,
  size = 'sm',
  className = '',
}: TechBadgesProps) {
  const visible = tech.slice(0, max);
  const extra = tech.length - visible.length;
  const sizeCls = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((t) => (
        <span
          key={t}
          className={`inline-flex items-center gap-1.5 rounded-full border border-blue-500/15 bg-blue-500/[0.07] font-body font-medium text-[var(--text-secondary)] backdrop-blur-sm transition-colors duration-300 hover:border-blue-400/40 hover:text-[var(--electric)] ${sizeCls}`}
        >
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dotColor(t)}`} />
          {t}
        </span>
      ))}
      {extra > 0 && (
        <span
          className={`inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] font-body font-semibold text-[var(--text-muted)] ${sizeCls}`}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

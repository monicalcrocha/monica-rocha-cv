import { motion } from 'framer-motion';

export const fade = (i = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay: i * 0.04 },
});

export function Card({ title, action, children, className = '', i = 0 }) {
  return (
    <motion.section {...fade(i)} className={`bg-white border border-line rounded-xl ${className}`}>
      {title && (
        <header className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

export function PageHeading({ children }) {
  return <h1 className="text-lg font-semibold text-ink mb-4">{children}</h1>;
}

export function Chip({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-side text-muted border-line',
    accent: 'bg-accentSoft text-accentHover border-transparent',
    ok: 'bg-okSoft text-ok border-transparent',
  };
  return <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md border ${tones[tone]}`}>{children}</span>;
}

export function Bullets({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2 text-sm text-muted leading-relaxed">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Briefcase } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { PageHeading, Chip, Bullets } from '@/components/ui';

export default function Activity() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl">
      <PageHeading>{t.crm.activity.title}</PageHeading>
      <ol className="relative border-l border-line ml-3 space-y-3">
        {t.timeline.items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="pl-6 relative">
              <span className={`absolute -left-[13px] top-4 w-6 h-6 rounded-full flex items-center justify-center border ${i === 0 ? 'bg-accent border-accent text-white' : 'bg-white border-line text-faint'}`}>
                <Briefcase className="w-3 h-3" aria-hidden="true" />
              </span>
              <div className="bg-white border border-line rounded-xl">
                <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="w-full text-left p-4 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink">{it.role}</p>
                      {i === 0 && <Chip tone="ok">{t.crm.activity.current}</Chip>}
                    </div>
                    <p className="text-sm text-accent mt-0.5">{it.company}</p>
                    <p className="font-mono text-[11px] text-faint mt-1">{it.period}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-faint mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && it.bullets && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 pt-1 border-t border-line"><div className="pt-3"><Bullets items={it.bullets} /></div></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-faint italic mt-4">{t.crm.activity.note} <Link to="/notas" className="text-accent not-italic hover:underline">{t.crm.nav.notes}</Link>.</p>
    </div>
  );
}

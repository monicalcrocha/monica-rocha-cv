import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { projectsData, projectsDataEN } from '@/data/pages';
import { PageHeading, Chip } from '@/components/ui';

function Block({ label, text }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-faint font-medium mb-1">{label}</p>
      {text.split('\n').map((line, i) => <p key={i} className="text-sm text-muted leading-relaxed">{line}</p>)}
    </div>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(null);
  const data = language === 'pt' ? projectsData : projectsDataEN;
  const c = t.crm.projects;
  return (
    <div>
      <PageHeading>{c.title}</PageHeading>
      <div className="bg-white border border-line rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_180px_24px] gap-3 px-4 py-2.5 border-b border-line bg-panel text-[11px] uppercase tracking-wider text-faint font-medium">
          <span>{c.colProject}</span><span>{c.colType}</span><span />
        </div>
        {data.map((p, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-line last:border-0">
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                className="w-full grid grid-cols-[1fr_24px] sm:grid-cols-[1fr_180px_24px] gap-3 items-center px-4 py-3 text-left hover:bg-panel">
                <span className="text-sm font-medium text-ink">{p.title}<span className="block sm:hidden mt-1"><Chip tone="accent">{p.tag}</Chip></span></span>
                <span className="hidden sm:block"><Chip tone="accent">{p.tag}</Chip></span>
                <ChevronRight className={`w-4 h-4 text-faint transition-transform ${isOpen ? 'rotate-90' : ''}`} aria-label={c.open} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-5 pt-1 grid gap-4 md:grid-cols-3">
                      <Block label={t.projects.contextLabel} text={p.context} />
                      <Block label={t.projects.actionsLabel} text={p.did} />
                      <Block label={t.projects.resultLabel} text={p.result} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

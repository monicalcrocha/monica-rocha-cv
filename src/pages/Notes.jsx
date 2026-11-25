import { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { translations } from '@/data/translations';
import { PageHeading } from '@/components/ui';
import DocModal from '@/components/DocModal';

const initials = n => n.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

export default function Notes() {
  const { t, language } = useLanguage();
  const c = t.crm.notes;
  const [open, setOpen] = useState(null);
  const [doc, setDoc] = useState(null);
  return (
    <div className="max-w-3xl">
      <PageHeading>{c.title}</PageHeading>
      <p className="text-sm text-muted -mt-2 mb-5">{t.cv.recommendationsDescription}</p>
      <div className="space-y-4">
        {t.cv.recommendations.map((rec, i) => {
          const lines = rec.text.split('\n');
          const long = lines.length > 8;
          const isOpen = open === i;
          return (
            <article key={i} className="bg-white border border-line rounded-xl p-5">
              <header className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-full bg-accentSoft text-accentHover text-xs font-semibold flex items-center justify-center">{initials(rec.name)}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{rec.name}</p>
                  <p className="text-xs text-muted">{rec.role} · {rec.company} · {rec.relation}</p>
                </div>
              </header>
              <div className="text-sm text-muted leading-relaxed whitespace-pre-line">{isOpen || !long ? rec.text : lines.slice(0, 8).join('\n')}</div>
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-line">
                {long && (
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="text-xs text-accent inline-flex items-center gap-1 hover:underline">
                    {isOpen ? t.cv.readLess : t.cv.readMore}
                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                )}
                <button onClick={() => setDoc({ url: rec.documentUrl, title: `${c.letterFrom} ${rec.name}` })} className="text-xs text-muted hover:text-ink inline-flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />{c.viewDoc}
                </button>
              </div>
              {rec.company === 'Houst' && <p className="text-xs text-faint italic mt-2">{t.cv.houstNote}</p>}
              {language === 'pt' && translations.en.cv.recommendations[i]?.text === rec.text && <p className="text-xs text-faint italic mt-2">{t.crm.originalEnglish}</p>}
            </article>
          );
        })}
      </div>
      <DocModal doc={doc} onClose={() => setDoc(null)} />
    </div>
  );
}

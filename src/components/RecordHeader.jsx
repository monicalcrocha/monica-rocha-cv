import { Link } from 'react-router-dom';
import { MapPin, CalendarClock, Download, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { CV_PDF } from '@/lib/config';
import { Chip } from '@/components/ui';

export default function RecordHeader({ compact = false }) {
  const { t } = useLanguage();
  const r = t.crm.record;
  return (
    <section className="bg-white border border-line rounded-xl">
      <div className={`flex flex-col md:flex-row md:items-center ${compact ? 'p-4 gap-4' : 'p-5 gap-5'}`}>
        <img src="/files/avatar.jpg" alt="Mónica Rocha" width="104" height="104"
          className={`${compact ? 'w-16 h-16' : 'w-[104px] h-[104px]'} rounded-xl object-cover border border-line`} />
        <div className="flex-1 min-w-0">
          {compact
            ? <p className="font-serif leading-tight text-ink text-2xl">Mónica Rocha<span className="text-accent">.</span></p>
            : <h1 className="font-serif leading-tight text-ink text-3xl">Mónica Rocha<span className="text-accent">.</span></h1>}
          <p className="text-sm text-muted mt-0.5">{r.title}</p>
          <div className={`flex flex-wrap items-center gap-2 mt-2 ${compact ? 'hidden sm:flex' : ''}`}>
            <span className="inline-flex items-center gap-1 text-xs text-muted"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />{r.location}</span>
            {r.tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/contacto" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentHover">
            <CalendarClock className="w-4 h-4" aria-hidden="true" />{r.bookMeeting}
          </Link>
          <a href={CV_PDF} download="Monica_Rocha_CV.pdf" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-line text-ink hover:bg-side">
            <Download className="w-4 h-4" aria-hidden="true" />{r.downloadCv}
          </a>
        </div>
      </div>

      {!compact && <div className="border-t border-line px-5 py-4">
        <p className="text-[11px] uppercase tracking-wider text-faint font-medium mb-2">{r.stageLabel}</p>
        <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${r.stages.length}, minmax(0, 1fr))` }}>
          {r.stages.map((s, i) => {
            const done = i < r.currentStage, cur = i === r.currentStage;
            return (
              <li key={s} aria-current={cur ? 'step' : undefined}
                className={`relative text-center text-xs font-medium py-1.5 sm:py-2 px-1 truncate
                  ${done ? 'bg-accent text-white' : cur ? 'bg-accentSoft text-accentHover ring-1 ring-accent' : 'bg-side text-faint'}
                  ${i === 0 ? 'rounded-l-lg' : ''} ${i === r.stages.length - 1 ? 'rounded-r-lg' : ''}`}>
                {done && <Check className="hidden sm:inline w-3 h-3 mr-0.5 -mt-0.5" aria-hidden="true" />}
                <span className="sr-only sm:not-sr-only">{s}</span>
                {done && <span className="sr-only"> {r.completed}</span>}
              </li>
            );
          })}
        </ol>
        <p className="text-xs text-ink font-medium mt-2 sm:hidden">{r.stageOf.replace('{n}', r.currentStage + 1).replace('{total}', r.stages.length)}: {r.stages[r.currentStage]}</p>
        <p className="text-xs text-muted mt-1 sm:mt-2">{r.currentHint}</p>
      </div>}
    </section>
  );
}

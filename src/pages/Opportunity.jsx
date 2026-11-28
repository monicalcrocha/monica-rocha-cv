import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Bot, Workflow, LayoutDashboard, CalendarRange, FileText, Wallet, Github } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { highlights, highlightsEN } from '@/data/pages';
import { Card, Chip, Bullets } from '@/components/ui';

const builtIcons = [Bot, Workflow, LayoutDashboard, CalendarRange, FileText, Wallet];

function Field({ label, children }) {
  return (
    <div className="py-2.5 border-b border-line last:border-0">
      <dt className="text-[11px] uppercase tracking-wider text-faint font-medium">{label}</dt>
      <dd className="text-sm text-ink mt-0.5">{children}</dd>
    </div>
  );
}

export default function Opportunity() {
  const { t, language } = useLanguage();
  const o = t.crm.overview;
  const recent = t.timeline.items.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        {/* KPIs */}
        <section aria-label={o.kpis} className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {t.ui.metrics.map((m, i) => (
            <div key={i} className="bg-white border border-line rounded-xl p-4">
              <p className="font-mono text-2xl font-medium text-accent">{m.value}</p>
              <p className="text-xs text-ink mt-1 leading-snug">{m.label}</p>
              <p className="font-mono text-[11px] text-faint mt-1.5">{m.source}</p>
            </div>
          ))}
        </section>

        {/* MEDDICC */}
        <Card title={o.meddTitle} action={<span className="text-xs text-muted">{o.meddSub}</span>} i={1}>
          <ul className="divide-y divide-line -my-2">
            {o.medd.map((row, i) => (
              <li key={i} className="flex gap-3 py-2.5">
                <span className="w-7 h-7 rounded-md bg-accentSoft text-accentHover font-mono text-sm font-medium flex items-center justify-center flex-shrink-0">{row.k}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink">{row.name}</p>
                  <p className="text-sm text-muted leading-snug">{row.text}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-ok flex-shrink-0 mt-1" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </Card>

        <Card title={o.summary} i={2}>
          <div className="space-y-3">
            {t.profile.introduction.map((p, i) => <p key={i} className="text-sm text-muted leading-relaxed">{p}</p>)}
          </div>
        </Card>

        <Card title={o.achievements} i={3}>
          <Bullets items={language === 'pt' ? highlights : highlightsEN} />
        </Card>

        <Card title={t.ui.builtTitle} action={<a href="https://github.com/monicalcrocha" target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline inline-flex items-center gap-1"><Github className="w-3.5 h-3.5" aria-hidden="true" />{t.crm.overview.seeCode}</a>} i={4}>
          <p className="text-sm text-muted mb-4">{t.ui.builtIntro}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {t.ui.built.map(({ label, where }, i) => {
              const Icon = builtIcons[i] || Bot;
              return (
                <div key={i} className="rounded-lg border border-line bg-panel p-3">
                  <Icon className="w-4 h-4 text-accent mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-ink leading-snug">{label}</p>
                  <p className="font-mono text-[11px] text-faint mt-1">{where}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <Card title={o.fields} i={1}>
          <dl className="-my-2.5">
            <Field label={o.experience}>+10 {t.ui.yearsExperience}</Field>
            <Field label={o.portfolio}>{o.portfolioValue}</Field>
            <Field label={o.sectors}>{o.sectorsValue}</Field>
            <Field label={o.languages}>
              {t.profile.languages.map(l => <span key={l.name} className="block">{l.name} <span className="text-faint">· {l.level}</span></span>)}
            </Field>
            <Field label={t.profile.drivingLicenseTitle}>{t.profile.drivingLicense}</Field>
          </dl>
        </Card>

        <Card title={o.recent} action={<Link to="/atividade" className="text-xs text-accent hover:underline inline-flex items-center gap-1">{o.seeAll}<ArrowRight className="w-3 h-3" aria-hidden="true" /></Link>} i={2}>
          <ol className="relative border-l border-line ml-1.5 space-y-4">
            {recent.map((it, i) => (
              <li key={i} className="pl-4 relative">
                <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-accent' : 'bg-line'}`} />
                <p className="text-sm font-medium text-ink leading-snug">{it.role}</p>
                <p className="text-xs text-muted">{it.company}</p>
                <p className="font-mono text-[11px] text-faint mt-0.5">{it.period}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card title={o.skills} i={3}>
          <div className="flex flex-wrap gap-1.5">
            {t.profile.skills.map(s => <Chip key={s}>{s}</Chip>)}
          </div>
        </Card>

        <Card title={o.describedAs} i={4}>
          <div className="flex flex-wrap gap-1.5">
            {t.profile.wordCloudWords.map(w => <Chip key={w.text} tone={w.weight >= 3 ? 'accent' : 'neutral'}>{w.text}</Chip>)}
          </div>
          <p className="text-xs text-faint italic mt-3">{o.describedNote} <Link to="/notas" className="text-accent not-italic hover:underline">{t.crm.nav.notes}</Link>.</p>
        </Card>
      </div>
    </div>
  );
}

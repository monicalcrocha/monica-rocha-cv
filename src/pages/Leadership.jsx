import { useLanguage } from '@/lib/i18n';
import { stylesData, stepsData, valuesData, valuesDataEN, rolePoints, forceData, forceDataEN } from '@/data/pages';
import { Card, PageHeading, Chip, Bullets } from '@/components/ui';

export default function Leadership() {
  const { t, language } = useLanguage();
  const pt = language === 'pt';
  const c = t.crm.leadership;
  return (
    <div className="space-y-5">
      <PageHeading>{c.title}</PageHeading>
      <Card title={c.role}>
        <p className="text-sm font-medium text-ink mb-3">Business Development Manager · DIG-IN · {t.ui.since}</p>
        <Bullets items={rolePoints.map(p => (pt ? p.pt : p.en))} />
      </Card>
      <Card title={c.strengths}>
        <div className="grid sm:grid-cols-2 gap-4">
          {(pt ? forceData : forceDataEN).map(f => (
            <div key={f.title} className="rounded-lg border border-line bg-panel p-4">
              <p className="text-sm font-semibold text-ink mb-2">{f.title}</p>
              <Bullets items={f.bullets} />
            </div>
          ))}
        </div>
      </Card>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card title={c.styles}>
          <div className="space-y-4">
            {stylesData.map(s => (
              <div key={s.title}>
                <p className="text-sm font-semibold text-ink">{pt ? s.title : s.titleEN}</p>
                <div className="mt-1.5"><Bullets items={pt ? s.bullets : s.bulletsEN} /></div>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <Card title={c.steps}>
            <ol className="space-y-2">
              {stepsData.map((s, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-ink">
                  <span className="font-mono text-xs w-6 h-6 rounded-md bg-accentSoft text-accentHover flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="pt-0.5">{pt ? s.pt : s.en}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card title={c.values}>
            <div className="flex flex-wrap gap-1.5">{(pt ? valuesData : valuesDataEN).map(v => <Chip key={v}>{v}</Chip>)}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

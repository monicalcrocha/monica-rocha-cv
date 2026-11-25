import { useState } from 'react';
import { Award } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Card, PageHeading, Bullets } from '@/components/ui';
import DocModal from '@/components/DocModal';

export default function Training() {
  const { t } = useLanguage();
  const c = t.crm.training;
  const [doc, setDoc] = useState(null);
  return (
    <div>
      <PageHeading>{c.title}</PageHeading>
      <p className="text-sm text-muted -mt-2 mb-5 max-w-2xl">{t.ui.trainingSubtitle}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title={c.certs} className="lg:col-span-2">
          <div className="-m-5 divide-y divide-line">
            {t.training.additionalItems.map((g, i) => (
              <div key={i} className="px-5 py-3">
                <p className="text-sm font-semibold text-ink">{g.title}</p>
                {g.subItems && (
                  <ul className="mt-2 space-y-1.5">
                    {g.subItems.map((s, j) => (
                      <li key={j} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted">{s.title}</span>
                        {s.certificateUrl && (
                          <button onClick={() => setDoc({ url: s.certificateUrl, title: `${c.certificate}: ${s.title}` })}
                            className="inline-flex items-center gap-1 text-xs text-accent hover:underline flex-shrink-0">
                            <Award className="w-3.5 h-3.5" aria-hidden="true" />{c.view}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <Card title={c.academic}>
            <div className="space-y-3">
              {t.training.academicItems.map((item, i) => {
                const [title, ...rest] = item.split(' — ');
                return (
                  <div key={i}>
                    <p className="text-sm font-medium text-ink">{title}</p>
                    {rest.length > 0 && <p className="text-xs text-muted">{rest.join(' — ')}</p>}
                  </div>
                );
              })}
            </div>
          </Card>
          <Card title={c.professional}><Bullets items={t.training.professionalItems} /></Card>
        </div>
      </div>
      <DocModal doc={doc} onClose={() => setDoc(null)} />
    </div>
  );
}

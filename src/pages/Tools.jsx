import { useLanguage } from '@/lib/i18n';
import { toolsData } from '@/data/pages';
import { Card, PageHeading, Bullets } from '@/components/ui';

export default function Tools() {
  const { t, language } = useLanguage();
  const pt = language === 'pt';
  return (
    <div>
      <PageHeading>{t.crm.tools.title}</PageHeading>
      <div className="grid md:grid-cols-2 gap-5">
        {toolsData.map((cat, i) => (
          <Card key={cat.labelPT} title={pt ? cat.labelPT : cat.labelEN} i={i}>
            <Bullets items={pt ? cat.items : (cat.itemsEN || cat.items)} />
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted italic mt-5">{t.ui.toolsClosing}</p>
    </div>
  );
}

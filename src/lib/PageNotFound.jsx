import { Link } from 'react-router-dom';
import { useLanguage } from '@/components/i18n/LanguageContext';
import PageTitle from '@/components/cv/PageTitle';

export default function PageNotFound() {
  const { t } = useLanguage();
  return (
    <div className="py-16 text-center space-y-6">
      <p className="font-spectral text-7xl" style={{ color: '#E4DCCD' }}>404</p>
      <PageTitle title={t.ui.notFoundTitle} />
      <p className="font-hanken text-base" style={{ color: '#5C544A' }}>{t.ui.notFoundText}</p>
      <Link
        to="/"
        className="inline-block font-hanken text-sm px-5 py-2.5 rounded-lg"
        style={{ backgroundColor: '#A84E2A', color: '#fff' }}
      >
        {t.ui.notFoundBack}
      </Link>
    </div>
  );
}

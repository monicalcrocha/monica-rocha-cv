import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-line rounded-xl p-10 text-center">
      <p className="font-mono text-4xl text-line mb-2">404</p>
      <p className="text-sm font-semibold text-ink mb-4">{t.crm.notFound.title}</p>
      <Link to="/" className="inline-block text-sm px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentHover">{t.crm.notFound.back}</Link>
    </div>
  );
}

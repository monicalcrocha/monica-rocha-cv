import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '@/data/translations';
import { crm } from '@/data/crm';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('crm-language') || 'pt'; } catch { return 'pt'; }
  });
  useEffect(() => {
    try { localStorage.setItem('crm-language', language); } catch { /* storage unavailable */ }
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en-GB';
  }, [language]);
  const t = useMemo(() => ({ ...translations[language], crm: crm[language] }), [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

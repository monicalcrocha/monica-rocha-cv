import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      try { return localStorage.getItem('cv-language') || 'pt'; } catch { return 'pt'; }
    }
    return 'pt';
  });

  useEffect(() => {
    try { localStorage.setItem('cv-language', language); } catch { /* storage unavailable */ }
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en-GB';
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
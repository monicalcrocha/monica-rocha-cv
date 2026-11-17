import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/hooks/useModal';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    let seen = null;
    try { seen = localStorage.getItem('cv-welcome-seen'); } catch { /* storage unavailable */ }
    if (!seen) setShow(true);
  }, []);

  // Close and stay on the page the visitor opened (e.g. a direct link to /CV)
  const handleStart = () => {
    try { localStorage.setItem('cv-welcome-seen', '1'); } catch { /* storage unavailable */ }
    setShow(false);
  };
  const dialogRef = useModal(show, handleStart);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(40,36,31,0.55)' }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="max-w-lg w-full rounded-2xl p-8"
            style={{ backgroundColor: '#F7F4ED', border: '1px solid #E4DCCD', boxShadow: '0 24px 60px rgba(40,36,31,0.2)' }}
          >
            {/* Language toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#E4DCCD' }} role="group" aria-label="Language">
                {['pt', 'en'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    aria-pressed={language === lang}
                    aria-label={t.ui.switchTo[lang]}
                    lang={lang}
                    className="px-3 py-1 rounded-full font-jetbrains text-xs font-medium transition-all"
                    style={{
                      backgroundColor: language === lang ? '#A84E2A' : 'transparent',
                      color: language === lang ? '#fff' : '#6F6656'
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <p id="welcome-title" className="font-spectral text-4xl font-medium mb-2 leading-tight" style={{ color: '#28241F' }}>
              Mónica<br />Rocha.
            </p>
            <p className="font-jetbrains text-xs uppercase tracking-widest mb-6" style={{ color: '#A84E2A' }}>
              Business Development Manager
            </p>

            <div className="space-y-3 mb-8">
              <p className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{t.welcome.text1}</p>
              <p className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{t.welcome.text2}</p>
            </div>

            <button
              onClick={handleStart}
              className="w-full font-hanken text-sm py-3 rounded-xl transition-all"
              style={{ backgroundColor: '#A84E2A', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8F4223'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#A84E2A'}
            >
              {t.welcome.button} →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
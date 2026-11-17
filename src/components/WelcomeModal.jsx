import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem('cv-welcome-seen');
    if (!seen) setShow(true);
  }, []);

  const handleStart = () => {
    localStorage.setItem('cv-welcome-seen', '1');
    setShow(false);
    navigate('/Profile');
  };

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="max-w-lg w-full rounded-2xl p-8"
            style={{ backgroundColor: '#F7F4ED', border: '1px solid #E4DCCD', boxShadow: '0 24px 60px rgba(40,36,31,0.2)' }}
          >
            {/* Language toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#E4DCCD' }}>
                {['pt', 'en'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="px-3 py-1 rounded-full font-jetbrains text-xs font-medium transition-all"
                    style={{
                      backgroundColor: language === lang ? '#C15F36' : 'transparent',
                      color: language === lang ? '#fff' : '#8C8270'
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-spectral text-4xl font-medium mb-2 leading-tight" style={{ color: '#28241F' }}>
              Mónica<br />Rocha.
            </p>
            <p className="font-jetbrains text-xs uppercase tracking-widest mb-6" style={{ color: '#C15F36' }}>
              Business Development Manager
            </p>

            <div className="space-y-3 mb-8">
              <p className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{t.welcome.text1}</p>
              <p className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{t.welcome.text2}</p>
            </div>

            <button
              onClick={handleStart}
              className="w-full font-hanken text-sm py-3 rounded-xl transition-all"
              style={{ backgroundColor: '#C15F36', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a84e2a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C15F36'}
            >
              {t.welcome.button} →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
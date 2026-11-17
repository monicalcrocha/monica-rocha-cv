import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu } from 'lucide-react';

export default function Topbar({ onMenuClick, menuOpen }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-50 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(247, 244, 237, 0.88)', borderBottom: '1px solid #E4DCCD' }}
    >
      <div className="h-full flex items-center justify-between px-5 sm:px-8">
        {/* Left: hamburger + MENU */}
        <button
          onClick={onMenuClick}
          aria-label={t.ui.openMenu}
          aria-expanded={!!menuOpen}
          aria-controls="site-menu"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: '#5C544A' }}
        >
          <Menu className="w-4 h-4" />
          <span className="font-spectral text-sm font-medium tracking-widest uppercase" style={{ color: '#28241F' }}>
            {t.ui.menu}
          </span>
        </button>

        {/* Right: wordmark + language toggle */}
        <div className="flex items-center gap-4">
          <span className="font-spectral text-base font-medium hidden sm:block" style={{ color: '#28241F' }}>
            CV | Mónica Rocha
          </span>
          <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#E4DCCD' }} role="group" aria-label="Language">
            {['pt', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                aria-label={t.ui.switchTo[lang]}
                lang={lang}
                className="px-3 py-1 rounded-full font-spectral text-xs font-medium uppercase transition-all duration-200"
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
      </div>
    </header>
  );
}
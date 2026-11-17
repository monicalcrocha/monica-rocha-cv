import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
  const { language, setLanguage } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-50 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(247, 244, 237, 0.88)', borderBottom: '1px solid #E4DCCD' }}
    >
      <div className="h-full flex items-center justify-between px-5 sm:px-8">
        {/* Left: hamburger + MENU */}
        <button
          onClick={onMenuClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: '#5C544A' }}
        >
          <Menu className="w-4 h-4" />
          <span className="font-spectral text-sm font-medium tracking-widest uppercase" style={{ color: '#28241F' }}>
            Menu
          </span>
        </button>

        {/* Right: wordmark + language toggle */}
        <div className="flex items-center gap-4">
          <span className="font-spectral text-base font-medium hidden sm:block" style={{ color: '#28241F' }}>
            CV | Mónica Rocha
          </span>
          <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#E4DCCD' }}>
            {['pt', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="px-3 py-1 rounded-full font-spectral text-xs font-medium uppercase transition-all duration-200"
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
      </div>
    </header>
  );
}
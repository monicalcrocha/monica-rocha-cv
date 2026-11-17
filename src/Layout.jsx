import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from './components/i18n/LanguageContext';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import WelcomeModal from './components/WelcomeModal';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();
  const { pathname } = useLocation();

  // Per-page document title
  useEffect(() => {
    const key = pathname === '/' ? 'profile' : pathname.slice(1).toLowerCase();
    const page = t.nav[key];
    document.title = page ? `${page} — Mónica Rocha` : 'Mónica Rocha — CV';
  }, [pathname, t]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F4ED' }}>
      <Topbar onMenuClick={() => setSidebarOpen(true)} menuOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <WelcomeModal />

      <main className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Outlet />
        </div>
      </main>

      <footer style={{ backgroundColor: '#F1ECE0', borderTop: '1px solid #E4DCCD' }} className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-spectral text-3xl" style={{ color: '#28241F' }}>Mónica Rocha.</p>
          <p className="font-jetbrains text-xs" style={{ color: '#6F6656' }}>© {new Date().getFullYear()} · {t.ui.footer}</p>
        </div>
      </footer>
    </div>
  );
}

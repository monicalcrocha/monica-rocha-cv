import React, { useState } from 'react';
import { LanguageProvider } from './components/i18n/LanguageContext';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import WelcomeModal from './components/WelcomeModal';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#F7F4ED' }}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar
          currentPage={currentPageName}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <WelcomeModal />

        <main className="pt-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: '#F1ECE0', borderTop: '1px solid #E4DCCD' }} className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-spectral text-3xl" style={{ color: '#28241F' }}>Mónica Rocha.</p>
            <p className="font-jetbrains text-xs" style={{ color: '#8C8270' }}>© 2026 · CV Interativo</p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Download, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { NAV } from '@/lib/nav';
import { useModal } from '@/lib/useModal';
import { CV_PDF } from '@/lib/config';
import RecordHeader from '@/components/RecordHeader';

function LangToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="inline-flex rounded-md border border-line bg-white p-0.5" role="group" aria-label={t.crm.language}>
      {['pt', 'en'].map(l => (
        <button key={l} onClick={() => setLanguage(l)} aria-pressed={language === l} aria-label={t.ui.switchTo[l]} lang={l}
          className={`px-2.5 py-1 text-xs font-medium rounded ${language === l ? 'bg-accent text-white' : 'text-muted hover:text-ink'}`}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SideNav({ onNavigate }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-line">
        <p className="font-serif text-lg leading-tight text-ink">{t.crm.brandOwner}</p>
        <p className="text-xs text-muted">{t.crm.brandTagline}<span className="text-accent">.</span></p>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label={t.crm.menu}>
        <p className="px-2 pb-2 text-[11px] uppercase tracking-wider text-faint font-medium">{t.crm.navSection}</p>
        {NAV.map(({ key, path, icon: Icon }) => (
          <NavLink key={key} to={path} end={path === '/'} onClick={onNavigate}
            className={({ isActive }) => `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm mb-0.5 ${isActive ? 'bg-white border border-line text-ink font-medium' : 'text-muted hover:bg-white/70 hover:text-ink border border-transparent'}`}>
            {({ isActive }) => (<>
              <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : ''}`} aria-hidden="true" />
              {t.crm.nav[key]}
            </>)}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-line space-y-2">
        <a href={CV_PDF} download="Monica_Rocha_CV.pdf" className="flex items-center gap-2 text-sm text-muted hover:text-ink px-1.5">
          <Download className="w-4 h-4" aria-hidden="true" /> {t.crm.record.downloadCv} <span className="text-faint">{t.ui.downloadLang}</span>
        </a>
        <div className="pt-1 px-1.5"><LangToggle /></div>
      </div>
    </div>
  );
}

export default function Layout() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useModal(open, () => setOpen(false));
  const current = NAV.find(n => n.path === pathname);

  useEffect(() => {
    document.title = !current ? `${t.crm.notFound.title} · ${t.crm.brand}`
      : current.path !== '/' ? `${t.crm.nav[current.key]} · ${t.crm.brand}` : t.crm.brand;
  }, [current, t]);

  return (
    <div className="min-h-screen bg-panel">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-3 focus:py-2 focus:rounded-md focus:border focus:border-line text-sm">{t.crm.skip}</a>
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-60 bg-side border-r border-line">
        <SideNav />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div className="lg:hidden fixed inset-0 z-50 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside ref={drawerRef} role="dialog" aria-modal="true" aria-label={t.crm.menu}
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-72 bg-side border-r border-line" onClick={e => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} aria-label={t.crm.close} className="absolute right-3 top-4 p-1.5 rounded-md text-muted hover:bg-white">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
              <SideNav onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-40 h-14 bg-panel/90 backdrop-blur border-b border-line flex items-center gap-3 px-4 sm:px-6">
          <button className="lg:hidden p-1.5 -ml-1.5 rounded-md text-muted hover:bg-side" onClick={() => setOpen(true)} aria-label={t.crm.menu} aria-expanded={open}>
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <nav aria-label={t.crm.breadcrumb} className="flex items-center gap-1.5 text-sm text-muted min-w-0">
            <span className="hidden sm:inline">{t.crm.breadcrumbRoot}</span>
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline text-faint" aria-hidden="true" />
            {current && current.path !== '/' ? (<>
              <span className="hidden sm:inline text-ink font-medium truncate">Mónica Rocha</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline text-faint" aria-hidden="true" />
              <span className="truncate text-ink sm:text-muted font-medium sm:font-normal" aria-current="page">{t.crm.nav[current.key]}</span>
            </>) : (
              <span className="text-ink font-medium truncate" aria-current="page">Mónica Rocha</span>
            )}
          </nav>
          <div className="ml-auto lg:hidden"><LangToggle /></div>
        </header>

        <main id="main" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 py-6 outline-none">
          <RecordHeader compact={pathname !== '/'} />
          <div className="mt-6"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}

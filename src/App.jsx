import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/components/i18n/LanguageContext';
import { pagesConfig } from './pages.config';
import PageNotFound from './lib/PageNotFound';

const { Pages, Layout, mainPage } = pagesConfig;
const MainPage = Pages[mainPage];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              {Object.entries(Pages).map(([path, Page]) => (
                <Route key={path} path={`/${path}`} element={<Page />} />
              ))}
              {/* Old Base44 pages */}
              {['Home', 'Dashboard', 'HowIWork'].map(p => (
                <Route key={p} path={`/${p}`} element={<Navigate to="/" replace />} />
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;

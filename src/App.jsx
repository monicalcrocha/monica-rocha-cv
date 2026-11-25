import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/lib/i18n';
import Layout from '@/components/Layout';
import Opportunity from '@/pages/Opportunity';
import Activity from '@/pages/Activity';
import Projects from '@/pages/Projects';
import Training from '@/pages/Training';
import Leadership from '@/pages/Leadership';
import Tools from '@/pages/Tools';
import Notes from '@/pages/Notes';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Opportunity />} />
              <Route path="/atividade" element={<Activity />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/formacao" element={<Training />} />
              <Route path="/lideranca" element={<Leadership />} />
              <Route path="/ferramentas" element={<Tools />} />
              <Route path="/notas" element={<Notes />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  );
}

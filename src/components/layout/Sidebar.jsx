import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { User, GraduationCap, Clock, TrendingUp, Briefcase, Users, Wrench, FileText, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { key: 'profile', icon: User, path: '/Profile' },
  { key: 'training', icon: GraduationCap, path: '/Training' },
  { key: 'timeline', icon: Clock, path: '/Timeline' },
  { key: 'impact', icon: TrendingUp, path: '/Impact' },
  { key: 'projects', icon: Briefcase, path: '/Projects' },
  { key: 'leadership', icon: Users, path: '/Leadership' },
  { key: 'tools', icon: Wrench, path: '/Tools' },
  { key: 'cv', icon: FileText, path: '/CV' },
  { key: 'contact', icon: Phone, path: '/Contact' },
];

export default function Sidebar({ currentPage, isOpen, onClose }) {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/Profile' && (location.pathname === '/' || location.pathname === '/Profile')) return true;
    return location.pathname === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(40,36,31,0.4)' }}
          />
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col"
            style={{ backgroundColor: '#F1ECE0', borderRight: '1px solid #E4DCCD' }}
          >
            <div className="flex items-center justify-between p-6 pb-4" style={{ borderBottom: '1px solid #E4DCCD' }}>
              <div>
                <p className="font-spectral text-xl font-medium" style={{ color: '#28241F' }}>Mónica Rocha.</p>
                <p className="font-spectral text-xs mt-0.5 uppercase tracking-widest" style={{ color: '#8C8270' }}>Business Development Manager</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#8C8270' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E4DCCD'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {navItems.map(({ key, icon: Icon, path }) => {
                const active = isActive(path);
                return (
                  <Link
                    key={key}
                    to={path}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-150"
                    style={{
                      backgroundColor: active ? '#E7DAC1' : 'transparent',
                      color: active ? '#C15F36' : '#5C544A',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = '#E4DCCD'; e.currentTarget.style.color = '#28241F'; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#5C544A'; } }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-spectral text-sm font-medium">{t.nav[key]}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C15F36' }} />}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4" style={{ borderTop: '1px solid #E4DCCD' }}>
              <p className="font-spectral text-xs text-center uppercase tracking-widest" style={{ color: '#8C8270' }}>
                monica.lc.rocha@gmail.com
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
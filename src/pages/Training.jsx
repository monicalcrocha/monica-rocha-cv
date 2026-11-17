import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import PageTitle from '@/components/cv/PageTitle';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import { Plus, Minus, X, Award } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

function CertModal({ url, onClose }) {
  const isImage = url && !url.endsWith('.pdf');
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(40,36,31,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        className="rounded-2xl overflow-hidden max-w-3xl w-full max-h-[88vh] flex flex-col"
        style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #E4DCCD' }}>
          <p className="font-spectral text-sm font-medium" style={{ color: '#28241F' }}>Certificado</p>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: '#8C8270' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F1ECE0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {isImage
            ? <img src={url} alt="Certificado" className="w-full h-auto" />
            : <iframe src={url} className="w-full" style={{ height: '75vh' }} title="Certificado" />
          }
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Training() {
  const { t, language } = useLanguage();
  const isPT = language === 'pt';
  const [expanded, setExpanded] = useState(null);
  const [cert, setCert] = useState(null);

  const subtitle = isPT
    ? 'Base académica em gestão hoteleira, complementada por formação contínua em liderança, dados e inteligência artificial.'
    : 'Academic background in hotel management, complemented by continuous training in leadership, data and artificial intelligence.';

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.training.title} subtitle={subtitle} />
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

        {/* LEFT: Formações Complementares (accordion) */}
        <motion.section {...fadeUp(0.1)}>
          <SectionEyebrow label={t.training.additional} />
          <div className="space-y-0">
            {t.training.additionalItems.map((group, i) => {
              const isExp = expanded === i;
              return (
                <div
                  key={i}
                  style={{ borderBottom: '1px solid #E4DCCD' }}
                >
                  <button
                    onClick={() => group.expandable ? setExpanded(isExp ? null : i) : null}
                    className="w-full flex items-center justify-between py-4 text-left transition-opacity hover:opacity-75"
                    style={{ cursor: group.expandable ? 'pointer' : 'default' }}
                  >
                    <span className="font-spectral text-xl font-medium" style={{ color: '#28241F' }}>{group.title}</span>
                    {group.expandable && (
                      <div
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0 rounded-full transition-all"
                        style={{ color: isExp ? '#C15F36' : '#8C8270' }}
                      >
                        {isExp ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {isExp && group.subItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-4 space-y-2">
                          {group.subItems.map((sub, j) => (
                            <li key={j} className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#C15F36' }} />
                                <span className="font-hanken text-sm" style={{ color: '#5C544A' }}>{sub.title}</span>
                              </div>
                              {sub.certificateUrl && (
                                <button
                                  onClick={() => setCert(sub.certificateUrl)}
                                  title="Ver certificado"
                                  className="flex-shrink-0 transition-all"
                                  style={{ color: '#C15F36' }}
                                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                  <Award className="w-4 h-4" />
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* RIGHT: Académica + Profissional */}
        <motion.section {...fadeUp(0.15)} className="space-y-10">
          {/* Académica */}
          <div>
            <SectionEyebrow label={t.training.academic} />
            <div className="space-y-5">
              {t.training.academicItems.map((item, i) => {
                const parts = item.split(' — ');
                const title = parts[0];
                const institution = parts[1];
                return (
                  <div key={i}>
                    <p className="font-spectral text-base font-medium" style={{ color: '#28241F' }}>{title}</p>
                    {institution && (
                      <p className="font-hanken text-sm mt-0.5" style={{ color: '#8C8270' }}>{institution}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profissional */}
          <div>
            <SectionEyebrow label={t.training.professional} />
            <ul className="space-y-2">
              {t.training.professionalItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#C15F36' }} />
                  <span className="font-hanken text-sm" style={{ color: '#5C544A' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>

      {/* Cert modal */}
      <AnimatePresence>
        {cert && <CertModal url={cert} onClose={() => setCert(null)} />}
      </AnimatePresence>
    </div>
  );
}
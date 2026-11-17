import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/hooks/useModal';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import PageTitle from '@/components/cv/PageTitle';
import { Download, FileText, ChevronDown, X } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function CV() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [documentModal, setDocumentModal] = useState(null); // { url, name }
  const closeModal = () => setDocumentModal(null);
  const modalRef = useModal(!!documentModal, closeModal);

  const truncateText = (text, lines = 10) => {
    const allLines = text.split('\n');
    if (allLines.length <= lines) return { preview: text, hasMore: false };
    return { preview: allLines.slice(0, lines).join('\n'), hasMore: true };
  };

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.cv.title} />
        <SectionEyebrow label="CV" />
      </motion.div>

      {/* CV Download */}
      <motion.section {...fadeUp(0.1)}>
        <div
          className="rounded-xl p-6 flex items-center gap-5 transition-shadow duration-200 hover:shadow-md"
          style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#F1ECE0' }}>
            <Download className="w-5 h-5" style={{ color: '#A84E2A' }} />
          </div>
          <div className="flex-1">
            <p className="font-spectral text-lg font-medium mb-1" style={{ color: '#28241F' }}>{t.ui.cvCardTitle}</p>
            <p className="font-hanken text-sm mb-4" style={{ color: '#6F6656' }}>{t.cv.cvDescription}</p>
            <a
              href="/files/CV-MonicaRocha.pdf"
              download="Monica_Rocha_CV.pdf"
              className="inline-flex font-hanken text-sm px-4 py-2 rounded-lg transition-all duration-150 items-center gap-2"
              style={{ backgroundColor: '#A84E2A', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8F4223'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#A84E2A'}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t.cv.downloadButton} <span className="opacity-80">{t.ui.downloadLang}</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Recommendations */}
      <motion.section {...fadeUp(0.15)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-2" style={{ color: '#A84E2A' }}>
          {t.cv.recommendationsSectionTitle}
        </p>
        <p className="font-hanken text-sm mb-6" style={{ color: '#6F6656' }}>{t.cv.recommendationsDescription}</p>

        <div className="space-y-4">
          {t.cv.recommendations.map((rec, index) => {
            const { preview, hasMore } = truncateText(rec.text);
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                {...fadeUp(0.2 + index * 0.07)}
                className="rounded-xl p-6 transition-shadow duration-200 hover:shadow-md"
                style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
              >
                <div className="mb-4">
                  <p className="font-spectral text-lg font-medium" style={{ color: '#28241F' }}>{rec.name}</p>
                  <p className="font-hanken text-sm" style={{ color: '#A84E2A' }}>{rec.role}</p>
                  <p className="font-jetbrains text-xs mt-0.5" style={{ color: '#6F6656' }}>{rec.company} · {rec.relation}</p>
                </div>

                <div className="font-hanken text-sm leading-relaxed whitespace-pre-line" style={{ color: '#5C544A' }}>
                  {isExpanded ? rec.text : preview}
                </div>

                {hasMore && (
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    aria-expanded={isExpanded}
                    className="font-hanken text-xs mt-3 flex items-center gap-1 transition-colors"
                    style={{ color: '#A84E2A' }}
                  >
                    {isExpanded ? t.cv.readLess : t.cv.readMore}
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  </button>
                )}

                <button
                  onClick={() => setDocumentModal({ url: rec.documentUrl, name: rec.name })}
                  className="flex items-center gap-2 text-xs mt-4 pt-4 font-hanken transition-colors"
                  style={{ borderTop: '1px solid #E4DCCD', color: '#6F6656' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5C544A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6F6656'}
                >
                  <FileText className="w-3.5 h-3.5" />
                  {t.cv.viewDocument}
                </button>

                {rec.company === 'Houst' && (
                  <p className="font-hanken text-xs italic mt-2" style={{ color: '#6F6656' }}>{t.cv.houstNote}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Image Modal */}
      <AnimatePresence>
        {documentModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(40,36,31,0.6)' }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="doc-modal-title"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #E4DCCD' }}>
                <p id="doc-modal-title" className="font-hanken text-sm font-medium" style={{ color: '#28241F' }}>{t.ui.letterFrom} {documentModal.name}</p>
                <button onClick={closeModal} aria-label={t.ui.close} className="p-1.5 rounded-lg" style={{ color: '#6F6656' }}>
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <div className="overflow-auto flex-1">
                {documentModal.url.endsWith('.pdf')
                  ? <iframe src={documentModal.url} className="w-full" style={{ height: 'calc(90vh - 60px)' }} title={`${t.ui.letterFrom} ${documentModal.name}`} />
                  : <img src={documentModal.url} alt={`${t.ui.letterFrom} ${documentModal.name}`} className="w-full h-auto" />
                }
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
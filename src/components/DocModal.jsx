import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useModal } from '@/lib/useModal';
import { useLanguage } from '@/lib/i18n';

// Shows a PDF or image inside the page. doc = { url, title } | null
export default function DocModal({ doc, onClose }) {
  const { t } = useLanguage();
  const ref = useModal(!!doc, onClose);
  return (
    <AnimatePresence>
      {doc && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50" onClick={onClose}>
          <motion.div ref={ref} role="dialog" aria-modal="true" aria-labelledby="doc-title"
            initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
            className="bg-white rounded-xl border border-line w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <p id="doc-title" className="text-sm font-medium">{doc.title}</p>
              <div className="flex items-center gap-1">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink px-2 py-1 rounded-md hover:bg-side">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />{t.crm.openNewTab}
                </a>
                <button onClick={onClose} aria-label={t.crm.close} className="p-1.5 rounded-md hover:bg-side text-muted">
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {doc.url.endsWith('.pdf')
                ? <iframe src={doc.url} title={doc.title} className="w-full" style={{ height: 'calc(90vh - 56px)' }} />
                : <img src={doc.url} alt={doc.title} className="w-full h-auto" />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

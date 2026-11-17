import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import PageTitle from '@/components/cv/PageTitle';
import { ChevronDown } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function Timeline() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(0);
  const items = t.timeline.items;

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.timeline.title} />
        <SectionEyebrow label="Percurso" />
      </motion.div>

      <div className="relative">
        {/* vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ backgroundColor: '#E4DCCD' }}
        />

        <div className="space-y-2">
          {items.map((item, i) => {
            const isFirst = i === 0;
            const isExp = expanded === i;
            return (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className="relative pl-16"
              >
                {/* dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full flex-shrink-0 border-2"
                  style={{
                    backgroundColor: isFirst ? '#C15F36' : '#F7F4ED',
                    borderColor: isFirst ? '#C15F36' : '#E4DCCD',
                    transform: 'translateX(-50%)',
                    left: '1.5rem'
                  }}
                />

                <div
                  className="rounded-xl overflow-hidden transition-shadow duration-200"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #E4DCCD',
                    boxShadow: isExp ? '0 4px 16px rgba(40,36,31,0.08)' : 'none'
                  }}
                >
                  {/* header */}
                  <button
                    onClick={() => setExpanded(isExp ? -1 : i)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-spectral text-lg font-medium" style={{ color: '#28241F' }}>{item.role}</span>
                        {isFirst && (
                          <span
                            className="font-jetbrains text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#C15F36', color: '#fff' }}
                          >
                            atual
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-hanken font-medium text-sm" style={{ color: '#C15F36' }}>{item.company}</span>
                        <span
                          className="font-jetbrains text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#F1ECE0', color: '#8C8270' }}
                        >
                          {item.period}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExp ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown className="w-4 h-4" style={{ color: '#8C8270' }} />
                    </motion.div>
                  </button>

                  {/* bullets */}
                  {isExp && item.bullets && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5"
                      style={{ borderTop: '1px solid #E4DCCD' }}
                    >
                      <ul className="mt-4 space-y-2">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: '#C15F36' }} />
                            <span className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.p {...fadeUp(0.3)} className="font-hanken text-sm italic" style={{ color: '#8C8270' }}>
        {t.timeline.note}
      </motion.p>
    </div>
  );
}
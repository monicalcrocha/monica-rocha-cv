import React from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import SectionCard from '@/components/ui/SectionCard';
import Badge from '@/components/ui/Badge';
import { Heart } from 'lucide-react';

export default function HowIWork() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          {t.howIWork.title}
        </h1>
      </motion.div>

      {/* Process Steps */}
      <div className="grid gap-4">
        {t.howIWork.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
              {step.number}
            </div>
            <p className="text-slate-700 font-medium">{step.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <SectionCard>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-semibold text-slate-800">{t.howIWork.valuesTitle}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.howIWork.values.map((value, index) => (
              <Badge key={index} variant="primary">{value}</Badge>
            ))}
          </div>
        </SectionCard>
      </motion.div>
    </div>
  );
}
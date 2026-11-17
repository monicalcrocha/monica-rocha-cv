import React from 'react';
import { motion } from 'framer-motion';

export default function SectionCard({ title, children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 ${className}`}>
      
      {title &&
      <h3 className="text-[#a6521e] mb-4 text-lg font-semibold">{title}</h3>
      }
      {children}
    </motion.div>);

}
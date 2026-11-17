import React from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-white to-blue-50/20 rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
      
      <div className="text-[#a6521e] mb-2 text-3xl font-bold">{value}</div>
      <div className="text-sm text-slate-600 leading-relaxed">{label}</div>
    </motion.div>);

}
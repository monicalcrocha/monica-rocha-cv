import React from 'react';
import { motion } from 'framer-motion';

export default function WordCloud({ words }) {
  const getSize = (weight) => {
    switch(weight) {
      case 3: return 'text-4xl md:text-5xl';
      case 2: return 'text-2xl md:text-3xl';
      default: return 'text-lg md:text-xl';
    }
  };

  const getColor = (weight) => {
    switch(weight) {
      case 3: return 'text-[#a6521e]';
      case 2: return 'text-[#a59a88]';
      default: return 'text-[#a59a88]';
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 p-6 md:p-8 min-h-[300px]">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={`font-bold ${getSize(word.weight)} ${getColor(word.weight)} hover:scale-105 transition-transform cursor-default whitespace-nowrap`}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  );
}
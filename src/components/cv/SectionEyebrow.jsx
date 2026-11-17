import React from 'react';

export default function SectionEyebrow({ label }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        className="font-spectral text-xs font-medium uppercase tracking-widest whitespace-nowrap"
        style={{ color: '#C15F36', letterSpacing: '0.15em' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: '#E4DCCD' }} />
    </div>
  );
}
import React from 'react';

export default function PageTitle({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h1 className="font-spectral font-medium leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', color: '#28241F' }}>
        {title}<span style={{ color: '#C15F36' }}>.</span>
      </h1>
      {subtitle && (
        <p className="font-hanken text-sm mt-3 max-w-lg leading-relaxed" style={{ color: '#8C8270' }}>{subtitle}</p>
      )}
    </div>
  );
}
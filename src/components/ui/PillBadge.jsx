import React from 'react';

export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-blue-50 text-blue-700 border border-blue-100",
    primary: "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100"
  };

  return (
    <span className="bg-[#e6dac7] text-slate-800 px-3 py-1.5 text-sm font-medium rounded-full inline-flex items-center border border-blue-200">
      {children}
    </span>);

}
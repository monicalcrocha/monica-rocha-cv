/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1F1D1A', muted: '#6B655C', faint: '#736C62', line: '#E7E3DC',
        panel: '#FAF9F6', side: '#F3F1EC', accent: '#A84E2A', accentHover: '#8F4223',
        accentSoft: '#F4E6DE', ok: '#2A7048', okSoft: '#E3F1E8',
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

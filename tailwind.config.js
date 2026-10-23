/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        surface: {
          DEFAULT: '#020617', // پس‌زمینه کل سایت
          raised: '#0f172a',  // کارت/پنل/دراور
          overlay: '#1e293b', // hover/لایه بالاتر
        },
        content: {
          DEFAULT: '#e2e8f0', // متن اصلی
          muted: '#94a3b8',   // متن کم‌رنگ
          faint: '#64748b',   // متن خیلی کم‌رنگ
        },
        line: {
          DEFAULT: '#1e293b', // حاشیه/خط
          soft: '#334155',
        },
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
        pop: 'pop 0.3s ease-out',
        spin: 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
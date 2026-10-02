import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FFFFFF',
          DEFAULT: '#002E5D',
        },
        brand: {
          navy: '#002E5D',
          navyDark: '#071D35',
          navyDeep: '#0C223F',
          blue: '#5D7FBA',
          maroon: '#800020',
          dark: '#111111',
        },
        accent: {
          vibrant: '#1D4ED8',
          primary: '#2563EB',
          bright: '#3B82F6',
          light: '#60A5FA',
          pale: '#93C5FD',
          soft: '#EBF3FA',
          border: '#D0E1F3',
        },
        text: {
          dark: '#303030',
          slate: '#0F172A',
          body: '#1E293B',
          light: '#707070',
          muted: '#64748B',
        },
        surface: {
          light: '#F4F4F4',
          warm: '#FAF8F5',
          card: '#FFFFFF',
          secondary: '#F8FAFC',
        },
        border: {
          light: '#E2E8F0',
          card: '#E5E7EB',
          subtle: 'rgba(0, 0, 0, 0.08)',
        },
      },
      fontFamily: {
        primary: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        dancing: ["'Dancing Script'", 'cursive'],
        satisfy: ["'Satisfy'", 'cursive'],
        mono: ["'JetBrains Mono'", 'monospace', 'Consolas', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        pill: '9999px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
        md: '0 8px 30px rgba(0, 0, 0, 0.08)',
        lg: '0 15px 50px rgba(0, 0, 0, 0.12)',
        navbar: '0 6px 18px rgba(0, 0, 0, 0.28)',
        gallery: '0 10px 30px -8px rgba(0, 46, 93, 0.12)',
        galleryHover: '0 20px 40px -10px rgba(0, 46, 93, 0.22)',
        stackCard: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 10px 24px -3px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        stackHover: '0 20px 36px -6px rgba(0, 46, 93, 0.22), 0 8px 16px -2px rgba(0, 46, 93, 0.1), 0 0 0 1.5px #002E5D',
      },
      screens: {
        'sm-mobile': '480px',
        mobile: '768px',
        nav: '900px',
        tablet: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [typography],
};

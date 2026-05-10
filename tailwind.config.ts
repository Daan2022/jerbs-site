/**
 * tailwind.config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Configuração do Tailwind CSS com os tokens de design da Escola JERBS.
 * Extende o tema padrão com as cores, fontes e bordas customizadas do projeto.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  // Caminhos onde o Tailwind deve procurar classes CSS para otimizar o bundle
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Fontes personalizadas ─────────────────────────────────────────────
      fontFamily: {
        poppins:   ['var(--font-poppins)', 'sans-serif'],
        quicksand: ['var(--font-quicksand)', 'sans-serif'],
      },

      // ── Paleta de cores customizada ───────────────────────────────────────
      colors: {
        cream: {
          DEFAULT: '#FDFAF6',
          50:  '#FFFFFF',
          100: '#FDFAF6',
          200: '#F9F3EC',
        },
        blue: {
          DEFAULT: '#008FC7',
          50:  '#E0F4FF',
          100: '#B8E4FA',
          200: '#008FC7',
          300: '#1C75BC',
          400: '#19194D',
        },
        red: {
          DEFAULT: '#C1272D',
          50:  '#FFE8E4',
          100: '#FFB5A7',
          200: '#C1272D',
        },
        sunshine: {
          DEFAULT: '#FBB03B',
          50:  '#FFF3CC',
          100: '#FFE699',
          200: '#FFD166',
        },
        mint: {
          DEFAULT: '#95D5B2',
          50:  '#D8F3DC',
          100: '#B7E4C7',
          200: '#95D5B2',
          300: '#52B788',
        },
        lavender: {
          DEFAULT: '#C77DFF',
          50:  '#EDD9FF',
          100: '#D9ACFF',
          200: '#C77DFF',
        },
      },

      // ── Border Radius customizado ─────────────────────────────────────────
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Animações customizadas ────────────────────────────────────────────
      animation: {
        'float':     'float 4s ease-in-out infinite',
        'morph':     'morphBlob 8s ease-in-out infinite',
        'fade-up':   'fadeInUp 0.7s ease-out forwards',
      },

      // ── Box shadows estilo Claymorphism ───────────────────────────────────
      boxShadow: {
        'clay-sm': '4px 4px 0px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.06)',
        'clay-md': '6px 6px 0px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)',
        'clay-lg': '8px 8px 0px rgba(0,0,0,0.12), 0 8px 40px rgba(0,0,0,0.10)',
      },

      // ── Backdrop blur ─────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },
    },
  },

  plugins: [],
};

export default config;

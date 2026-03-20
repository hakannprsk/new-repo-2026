import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050511',
          900: '#0b0b1f',
          800: '#111127',
          700: '#18183a',
          600: '#21214d',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-violet': 'radial-gradient(at 40% 20%, hsla(260,80%,30%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200,80%,30%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,60%,20%,0.2) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(124, 58, 237, 0.25)',
        'glow-cyan': '0 0 30px rgba(8, 145, 178, 0.25)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px rgba(124, 58, 237, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;

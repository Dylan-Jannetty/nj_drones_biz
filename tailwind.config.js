/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f5',
          100: '#ccefeb',
          200: '#99dfd7',
          300: '#66cfc3',
          400: '#33bfaf',
          500: '#00887A',
          600: '#006d62',
          700: '#005249',
          800: '#003631',
          900: '#001b18',
        },
        accent: {
          50: '#f0f6fe',
          100: '#e1edfd',
          200: '#d3e3fc',
          300: '#b8d2fa',
          400: '#9dc1f8',
          500: '#a3c3f9',
          600: '#7ba6f7',
          700: '#5389f5',
          800: '#2b6cf3',
          900: '#1e4ff1',
        },
        stone: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        }
      },
      fontFamily: {
        'sans': ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
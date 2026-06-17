/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Outsider Surf Academy — coastal "ocean ink" palette
        sand: {
          DEFAULT: '#F7F2EA',
          deep: '#EFE6D5',
        },
        ink: {
          DEFAULT: '#06322E',
          soft: '#5E6F66',
        },
        teal: {
          DEFAULT: '#00B4A2',
          deep: '#00897C',
          light: '#5FD3C6',
        },
        sun: {
          DEFAULT: '#FF6B3D',
          soft: '#FFE9E0',
          light: '#FF8A63',
        },
        foam: '#E8F4F2',
        gold: '#FFC95C',
      },
      fontFamily: {
        display: ['Fraunces Variable', 'Fraunces', 'Georgia', 'serif'],
        sans: ['Hanken Grotesk Variable', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        brand: '18px',
      },
      boxShadow: {
        brand: '0 18px 40px -18px rgba(13,59,67,.25)',
      },
    },
  },
  plugins: [],
}

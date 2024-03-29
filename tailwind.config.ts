import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'getting-started': '1fr 1fr 1fr 100px',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 80px',
      },
      boxShadow: {
        base: '0px 1px 8px -2px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: '#802E00',
        'primary-dark': '#571F00',
        border: '#E4E4E4',
        'gray-1': '#6A6A6A',
        'surface-2': '#FFC9AD',
        'surface-1': '#FFEDE4',
        'surface-0': '#FDF6F6',
      },
    },
  },
  plugins: [],
};
export default config;

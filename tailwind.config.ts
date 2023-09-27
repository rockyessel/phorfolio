import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        max_screen: { max: '674px' },
      },
      fontFamily: {
        noe: ['Noe Display'],
        pink: ['Pink Yellow Black'],
        astroz: ['Astroz Trial'],
        moldyen: ['Moldyen'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

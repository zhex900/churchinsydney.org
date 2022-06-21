/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['SortsMillGoudy', ...fontFamily.sans],
        secondary: ['Karla', 'SortsMillGoudy', ...fontFamily.sans],
      },
      fontSize: {
        sm: ['0.875rem', '2rem'],
        base: ['1rem', '2rem'],
        lg: ['1.125rem', '2rem'],
        xl: ['1.25rem', '2rem'],
        '5xl': ['3rem', '4rem'],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          200: withOpacity('--tw-clr-primary-200'),
          300: withOpacity('--tw-clr-primary-300'),
          400: withOpacity('--tw-clr-primary-400'),
          500: withOpacity('--tw-clr-primary-500'),
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        tilt: 'tilt 10s infinite linear',
      },
      lineHeight: {
        h: '4rem',
        p: '2rem',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

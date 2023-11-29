/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    colors: {
      transparent: "transparent",
      white: '#FFFFFF',
			black: '#000000',
			primary: {
        50: 'hsl(221.2 83.2% 75%)',
        100: 'hsl(221.2 83.2% 70%)',
        200: 'hsl(221.2 83.2% 65%)',
        300: 'hsl(221.2 83.2% 60%)',
        400: 'hsl(221.2 83.2% 55%)',
        500: 'hsl(221.2 83.2% 50%)',
        600: 'hsl(221.2 83.2% 45%)',
        700: 'hsl(221.2 83.2% 40%)',
        800: 'hsl(221.2 83.2% 35%)',
        900: 'hsl(221.2 83.2% 30%)',
        950: 'hsl(221.2 83.2% 25%)'
      },
      secondary: {
        400: 'hsl(217.2 32.6% 20%)',
        500: 'hsl(217.2 32.6% 19%)',
        600: 'hsl(217.2 32.6% 18%)',
        700: 'hsl(217.2 32.6% 17%)',
        800: 'hsl(217.2 32.6% 16%)',
        900: 'hsl(217.2 32.6% 15%)',
        },
      destructive: {
        50: 'hsl(0 84.2% 75%)',
        100: 'hsl(0 84.2% 70%)',
        200: 'hsl(0 84.2% 65%)',
        300: 'hsl(0 84.2% 60%)',
        400: 'hsl(0 84.2% 55%)',
        500: 'hsl(0 84.2% 50%)',
        600: 'hsl(0 84.2% 45%)',
        700: 'hsl(0 84.2% 40%)',
        800: 'hsl(0 84.2% 35%)',
        900: 'hsl(0 84.2% 30%)',
        950: 'hsl(0 84.2% 25%)'
      },
      grey: {
        50: 'hsl(0 0% 98%)',
        100: 'hsl(0 0% 96%)',
        200: 'hsl(0 0% 94%)',
        300: 'hsl(0 0% 92%)',
        400: 'hsl(0 0% 89%)',
        500: 'hsl(0 0% 86%)',
        600: 'hsl(0 0% 80%)',
        700: 'hsl(0 0% 74%)',
        800: 'hsl(0 0% 68%)',
        900: 'hsl(0 0% 60%)',
      },
      dark: {
        50: 'hsl(222.2 84% 10%)',
        100: 'hsl(222.2 84% 9%)',
        200: 'hsl(222.2 84% 8%)',
        300: 'hsl(222.2 84% 7%)',
        400: 'hsl(222.2 84% 6%)',
        500: 'hsl(222.2 84% 5%)',
        600: 'hsl(222.2 84% 4%)',
        700: 'hsl(222.2 84% 3%)',
        800: 'hsl(222.2 84% 2%)',
        900: 'hsl(222.2 84% 1%)',
      },
    }
  },
  plugins: [],
}


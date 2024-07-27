import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          900: '#121212',
          800: '#1f1f1f',
        },
        purple: {
          400: '#c084fc',
          600: '#9333ea',
          700: '#7e22ce',
        },
        pink: {
          600: '#db2777',
        },
      },
    },
  },
  plugins: [],
};
export default config;

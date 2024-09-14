/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'homeCard': '0 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'spin-outline' : 'pulse 3s linear infinite',
        'spin-pulse' : ' backgroundMovement 3s ease-in-out infinite',
        'wiggle' : 'wiggleB 8s  infinite',
        'wiggleReverse' : 'wiggleBReverse 8s infinite',
      },
      keyframes: {
        backgroundMovement: {
          '0%, 100%': { transform: 'rotate(-180deg)' },
          '20%' : {scale: '1.1'},
          '50%': { transform: 'rotate(80deg)' },
          '60%' : {scale: '0.9'},
          '80%' : {scale: '1.1'},
        },
        wiggleB: {
          0: { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-180deg)" },
          "50%": { transform: "rotate(200deg)" },
          "75%": { transform: "rotate(-100deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        wiggleBReverse: {
          0: { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(180deg)" },
          "50%": { transform: "rotate(-200deg)" },
          "75%": { transform: "rotate(100deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      }
    },
    fontFamily: {
      'unbound': ['"Unbounded Variable"', "sans-serif"],
    },
  },
  plugins: [],
};

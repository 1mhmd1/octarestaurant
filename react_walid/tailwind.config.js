/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
          accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",

        muted: {
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
}

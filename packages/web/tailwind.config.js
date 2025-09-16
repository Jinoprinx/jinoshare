/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e9edff",
          500: "#4f46e5",
          600: "#4338ca",
          900: "#1e1b4b"
        },
        dark: {
          background: '#1a1a1a',
          card: '#2a2a2a',
          accent: '#3b82f6',
          text: '#e5e5e5',
        }
      }
    }
  },
  plugins: []
};

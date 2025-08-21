/** @type {import('tailwindcss').Config} */
module.exports = {
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
        }
      }
    }
  },
  plugins: []
};

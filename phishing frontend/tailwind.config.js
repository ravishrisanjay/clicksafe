/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        // Our Premium Cyber Security Palette
        colors: {
          cyber: {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
            100: '#f1f5f9',
          },
          brand: {
            500: '#3b82f6',
            600: '#2563eb',
          },
          safe: '#10b981',
          danger: '#ef4444',
        },
        boxShadow: {
          'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        }
      },
    },
    plugins: [],
  }
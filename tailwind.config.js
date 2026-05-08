/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        master: {
          primary: '#0050FF', // Azul Elétrico
          tech: '#00D264',    // Verde Neon/Técnico
          amber: '#FFB800',   // Âmbar
          ice: '#F0F4FF',     // Branco Gelo
          slate: '#4A6A9A',   // Azul Acinzado
          dark: '#03060F',    // Azul Escuro (Fundo Oficial)
          darker: '#060E1C',  // Azul Marinho
          darkest: '#020409', // Azul Noite
          card: '#0A1428',    // Fundo Cards
          light: '#E8EEF8',   // Azul Clínico Claro
          outline: '#0D1F3C', // Azul Escuro Discreto
          brand: '#1A3060',   // Azul Marca
          navy: '#0D2B55',    // Azul Escuro (Neutro)
          orange: '#F97316',  // Laranja (Impacto)
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        merriweather: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
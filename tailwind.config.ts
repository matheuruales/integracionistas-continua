import type { Config } from 'tailwindcss'

const config: Config = {
  // Estrategia por clase para el modo oscuro
  darkMode: 'class',
  
  // Contenido que Tailwind debe escanear
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  
  // Preflight para resetear estilos (opcional desactivar si usas otro reset)

  theme: {
    extend: {
      // Colores personalizados inspirados en Vercel
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        // Colores de acento inspirados en Vercel
        accent: {
          purple: '#7928ca',
          pink: '#ff0080',
          blue: '#0070f3',
        }
      },
      
      // Tipografía
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      
      // Espaciado y tamaños
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Bordes y sombras
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
      },
      
      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      
      // Gradientes
      backgroundImage: {
        'gradient-vercel': 'linear-gradient(135deg, #0070f3, #7928ca)',
        'gradient-subtle': 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a, #1e293b)',
      },
      
      // Z-index utilities
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Tamaños de pantalla personalizados
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  
  plugins: [
    // Plugin para mejoras de formularios (opcional)
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    
    // Plugin para tipografía (opcional)
    require('@tailwindcss/typography'),
    
    // Plugin personalizado para utilidades adicionales
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        },
        '.backdrop-blur-sm': {
          backdropFilter: 'blur(4px)',
        },
        '.scroll-smooth': {
          scrollBehavior: 'smooth',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

export default config
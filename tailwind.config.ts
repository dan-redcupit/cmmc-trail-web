import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00ff00',
          darkgreen: '#008800',
          red: '#ff4444',
          yellow: '#ffff00',
          cyan: '#00ffff',
          bg: '#0a0a0a',
        },
      },
      fontFamily: {
        mono: ['VT323', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config

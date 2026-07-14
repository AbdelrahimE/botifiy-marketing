import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-the-year-of-handicrafts)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#63dd32',
          dark: '#0B3404',
          light: '#E7FBD9',
        },
        surface: {
          alt: '#F5FFF1',
        },
        text: {
          primary: '#0B3404',
          secondary: '#325327',
        },
        border: '#DDEED4',
        success: '#28B446',
        warning: '#F7B51B',
        danger: '#E04F4F',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        card: '12px',
        button: '8px',
        chip: '9999px'
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',
        elevation1: '0 1px 3px rgba(0,0,0,0.08)'
      },
      maxWidth: {
        container: '1200px'
      },
      spacing: {
        section: '96px',
        grid: '48px'
      },
    }
  },
  plugins: [],
}

export default config 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Apple-like text sizes
        'xs': ['0.75rem', { lineHeight: '1.41667', letterSpacing: '-0.003em' }],
        'sm': ['0.875rem', { lineHeight: '1.42857', letterSpacing: '-0.006em' }],
        'base': ['1rem', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.47059', letterSpacing: '-0.012em' }],
        'xl': ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.019em' }],
        '2xl': ['1.5rem', { lineHeight: '1.16667', letterSpacing: '-0.02em' }],
        '3xl': ['2rem', { lineHeight: '1.125', letterSpacing: '-0.022em' }],
        '4xl': ['2.5rem', { lineHeight: '1.08333', letterSpacing: '-0.024em' }],
        '5xl': ['3rem', { lineHeight: '1.08333', letterSpacing: '-0.026em' }],
        '6xl': ['3.5rem', { lineHeight: '1.07143', letterSpacing: '-0.028em' }],
        '7xl': ['4rem', { lineHeight: '1.0625', letterSpacing: '-0.03em' }],
        '8xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.032em' }],
        '9xl': ['6rem', { lineHeight: '1.04167', letterSpacing: '-0.035em' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.021em',
        normal: '-0.011em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand: original maroon/oxblood + gold accent
        primary: {
          DEFAULT: "#832625",
          50:  "#FBF1F0",
          100: "#F2D9D8",
          200: "#E5CBCB",
          500: "#A03A3C",
          600: "#832625",
          700: "#6B1F1D",
          800: "#561917",
        },
        secondary: "#A03A3C",
        accent: {
          DEFAULT: "#C9A227",
          dark: "#A8881D",
          light: "#E3C457",
          50: "#FBF6E6",
          100: "#F5EAC2",
        },
        light: "#E5CBCB",   // pale maroon/pink tint
        dark: "#6B1F1D",    // deep maroon (hover/pressed)
        ink: "#1F2937",     // near-black body text
        surface: "#FAF5F5", // app background (subtle warm)
        success: "#059669",
        danger: "#DC2626",
        warning: "#D97706",
        info: "#0284C7",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl: "0.875rem",
        '2xl': "1.125rem",
      },
      boxShadow: {
        'card': '0 1px 2px rgba(131, 38, 37, 0.04), 0 4px 16px -6px rgba(131, 38, 37, 0.10)',
        'card-hover': '0 2px 4px rgba(131, 38, 37, 0.06), 0 12px 28px -8px rgba(131, 38, 37, 0.20)',
        'brand': '0 10px 30px -8px rgba(131, 38, 37, 0.45)',
        'gold': '0 8px 24px -8px rgba(201, 162, 39, 0.45)',
      },
      backgroundImage: {
        // Gold radial highlight over the maroon brand gradient (single image stack)
        'brand-gradient': 'radial-gradient(1100px 520px at 85% -20%, rgba(201,162,39,0.20), transparent 55%), linear-gradient(135deg, #832625 0%, #561917 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.2s infinite',
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1100',
        modal: '1300',
        toast: '1400',
      },
    },
  },
  plugins: [],
}

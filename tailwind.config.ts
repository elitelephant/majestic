/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Fallback, brand.background will be primary
        foreground: "hsl(var(--foreground))", // Fallback, brand.text will be primary
        primary: {
          // shadcn primary, can align with brand.primary
          DEFAULT: "#9B50B9", // hsl(283, 49%, 52%)
          foreground: "#FFFFFF", // White text on primary
        },
        secondary: {
          // shadcn secondary, can align with brand.secondary
          DEFAULT: "#4A148C", // hsl(279, 70%, 31%)
          foreground: "#FFFFFF", // White text on secondary
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Standard destructive
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          // shadcn muted, can align with brand.muted
          DEFAULT: "#6A1B9A", // hsl(283, 69%, 35%)
          foreground: "#E1BEE7", // Lighter purple text on muted
        },
        accent: {
          // shadcn accent, can align with brand.accent
          DEFAULT: "#C77DFF", // hsl(277, 100%, 74%)
          foreground: "#1A0F2B", // Dark text on accent
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          // shadcn card, can align with brand.secondary
          DEFAULT: "#4A148C", // hsl(279, 70%, 31%)
          foreground: "#FFFFFF", // White text on card
        },
        brand: {
          backgroundGradientFrom: "#311B92", // Darker purple for gradient start
          backgroundGradientTo: "#1A0F2B", // Very dark purple/black for gradient end
          text: "#FFFFFF", // White for primary text
          textNeutral: "#E1BEE7", // Light lavender for neutral/secondary text (like placeholder)
          primary: "#9B50B9", // Main purple
          secondary: "#4A148C", // Darker purple for card backgrounds, headers
          accent: "#C77DFF", // Lighter, vibrant purple for interactive elements
          accentText: "#1A0F2B", // Dark text for on accent elements for contrast
          muted: "#6A1B9A", // Mid-dark purple for borders, less important elements
          inputBackground: "#311B92", // Dark purple for input backgrounds
          danger: "#EF5350", // A slightly softer red
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"], // Para títulos y encabezados
        mono: ["Roboto Mono", "var(--font-mono)", "monospace"], // Para datos numéricos
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

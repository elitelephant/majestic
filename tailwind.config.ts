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
        border: "#E5E7EB", // light gray
        input: "#F3F4F6", // very light gray
        ring: "#6366F1", // blue ring for focus
        background: "#F9FAFB", // light neutral background
        foreground: "#1F2937", // dark neutral text
        primary: {
          DEFAULT: "#6366F1", // Indigo 500
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E5E7EB", // Gray 200
          foreground: "#1F2937",
        },
        destructive: {
          DEFAULT: "#EF4444", // Red 500
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6", // Gray 100
          foreground: "#6B7280", // Gray 500
        },
        accent: {
          DEFAULT: "#6366F1", // Indigo 500
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        brand: {
          backgroundGradientFrom: "#F3F4F6", // light gray
          backgroundGradientTo: "#E5E7EB", // slightly darker gray
          text: "#1F2937", // dark neutral
          textNeutral: "#6B7280", // gray for secondary text
          primary: "#6366F1", // Indigo 500
          secondary: "#E5E7EB", // Gray 200
          accent: "#6366F1", // Indigo 500
          accentText: "#FFFFFF",
          muted: "#F3F4F6", // Gray 100
          inputBackground: "#F3F4F6", // Gray 100
          danger: "#EF4444", // Red 500
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
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

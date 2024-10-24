import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "35px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        primary: "#F1B4B4",
        secondary: "#FFDCDC",
        accent: "#1F417F",
        background: "#E2E7EF",
        text: "#132043",
        brown: "#271300",
        orange: "#FC7B54",
        lightYellow: "#FFF8F3",
      },
      fontFamily: {
        body: ["var(--font-montserrat)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
        montez: ["var(--font-montez)", "cursive"],
        title: ["var(--font-outfit)", "cursive"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

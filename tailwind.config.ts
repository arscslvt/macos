import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
      },

      colors: {
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        "accent-foreground": "var(--accent-foreground)",

        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",

        background: "var(--background)",
        "background-muted": "var(--background-muted)",
      },
    },
  },
  plugins: [],
};
export default config;

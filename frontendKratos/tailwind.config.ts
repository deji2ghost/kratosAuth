import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkolivegreen: {
          100: "#316541",
          200: "rgba(49, 101, 65, 0.25)",
          300: "#ADDF8833"
       },
       redolive: {
          100: "#C00000",
       },
      },
    },
  },
  plugins: [],
} satisfies Config;


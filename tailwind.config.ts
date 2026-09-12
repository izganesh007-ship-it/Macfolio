import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Segoe UI", "sans-serif"] } } },
  plugins: [],
} satisfies Config;
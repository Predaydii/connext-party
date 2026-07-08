import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "connext-primary": "#11308a",
        "connext-primary-contrast": "#ffffff",
        "connext-secondary": "#2b66ce",
        "connext-light": "#54b8f6",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-thai)"],
      },
    },
  },
  plugins: [],
};

export default config;

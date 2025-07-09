import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-neon-blue",
    "text-neon-purple",
    "text-neon-green",
    "bg-neon-blue",
    "bg-neon-purple",
    "bg-neon-green",
    "animate-pulse-neon",
    "animate-float",
    "font-orbitron",
    "font-space-mono",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        "space-mono": ["var(--font-space-mono)"],
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
        "neon-blue": "#00f5ff",
        "neon-purple": "#bf00ff",
        "neon-green": "#39ff14",
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-neon": {
          "0%": {
            boxShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 60px #00f5ff",
          },
          "100%": {
            boxShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff",
          },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config

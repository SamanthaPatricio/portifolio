// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // garante que os caminhos gerados sejam absolutos a partir da raiz
  base: "/",
  // garante que a saída vá para "dist" (o que a Vercel vai servir)
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  // opcional (dev local)
  server: {
    host: true,
    port: 5173,
  },
});

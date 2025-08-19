// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",          // caminhos absolutos, evita 404
  build: {
    outDir: "dist",   // pasta que a Vercel vai servir
    assetsDir: "assets",
    sourcemap: false,
  },
  server: { host: true, port: 5173 }
});

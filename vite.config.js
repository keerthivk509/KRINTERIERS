import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, /api calls are proxied to DreamSpaceCMS so you avoid CORS.
// Leave VITE_CMS_URL empty in .env to use this proxy.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": process.env.CMS_PROXY_TARGET || "http://localhost:5000" } },
});

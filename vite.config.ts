import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "My Tasks",
        short_name: "My Tasks",
        description: "A simple task manager app",

        start_url: "/",
        display: "standalone",

        theme_color: "#2563EB",
        background_color: "#F8FAFC",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],

        // ==========================================
        // PWA SCREENSHOTS
        // ==========================================
        screenshots: [
          {
            src: "/pwa-desktop.png",
            sizes: "1440x900",
            type: "image/png",
            form_factor: "wide",
            label: "My Tasks desktop application",
          },
          {
            src: "/pwa-mobile.png",
            sizes: "390x844",
            type: "image/png",
            label: "My Tasks mobile application",
          },
        ],
      },
    }),
  ],

  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      open: true, // Tự mở trình duyệt sau khi build
      gzipSize: true, // Hiển thị kích thước gzip
      brotliSize: true, // Hiển thị kích thước brotli
      filename: "dist/stats.html", // File output
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          router: ["react-router"],
          forms: ["react-hook-form"],
          animation: ["framer-motion"],
          tanstack: ["@tanstack/react-query"],
          notistack: ["notistack"],
          axios: ["axios"],
          dateFns: ["date-fns"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});

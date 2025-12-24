import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@reducers": path.resolve(__dirname, "./src/reducers"),
      "@actions": path.resolve(__dirname, "./src/actions"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});

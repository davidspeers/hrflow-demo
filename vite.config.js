import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@tests": path.resolve(__dirname, "./__tests__"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./__tests__/setupTests.js"],
  },
});

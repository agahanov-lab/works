import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 8080,
    host: true
  },
  build: {
    sourcemap: true
  },
  define: {
    __PROD__: mode === 'production',
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}));

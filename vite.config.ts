import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Set BASE_PATH env var to "/repo-name/" for GitHub project-page deploys.
// Leave unset (defaults to "/") for user-page deploys (priyansh-x.github.io).
const base = process.env.BASE_PATH ?? "/";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

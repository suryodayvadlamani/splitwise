import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "../../packages/types/src"),
      "@db": path.resolve(__dirname, "../../packages/db/src")
    }
  }
});

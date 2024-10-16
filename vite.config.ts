import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

/// <reference types="vitest" />

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    environment: 'jsdom',
  }
});

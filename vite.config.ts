import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

/// <reference types="vitest" />

export default defineConfig({
  plugins: [
    solidPlugin(),
    tailwindcss()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    environment: 'jsdom',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});

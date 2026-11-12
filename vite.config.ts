import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The `@/` alias is needed by shadcn/ui. It must match `paths` in tsconfig.json.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // Bootstrap 5.3 still uses @import and global Sass functions; hide those warnings.
        quietDeps: true,
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});

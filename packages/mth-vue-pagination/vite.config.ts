import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
  },
  build: {
    minify: "esbuild",
    lib: {
      entry: "./lib/index.ts",
      formats: ["cjs", "es"],
      fileName: (format) => `${pkg.name.split("/")[1]}-${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

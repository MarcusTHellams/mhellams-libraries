/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

// @ts-ignore
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: './lib/index.ts',
      formats: ['cjs', 'es', 'umd'],
      fileName: (filename) => `${pkg.name.split('/')[1]}-${filename}.js`,
      name: 'mthAutosize',
    },
    rollupOptions: {
      // external: [...Object.keys(pkg.peerDependencies) || []],
      output: {
        sourcemap: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.ts'],
  },
});

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

// @ts-ignore
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    minify: 'esbuild',
    lib: {
      entry: './lib/index.ts',
      formats: ['cjs', 'es', 'umd'],
      fileName: (moduleFormat) => `${pkg.name.split('/')[1]}-${moduleFormat}.js`,
      name: 'mthLog',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
      output: {
        sourcemap: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.ts'],
    passWithNoTests: true,
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works from any sub-path
// (GitHub Pages project sites, a file:// copy, or a plain static host).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    // Verovio's WASM build is ~8 MB in one chunk by design; it is loaded
    // lazily, so the app shell is not waiting on it.
    chunkSizeWarningLimit: 9000,
  },
  optimizeDeps: {
    exclude: ['verovio'],
  },
});

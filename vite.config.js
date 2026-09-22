/* global process */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site under /BG/, while Appwrite serves it at /.
// VITE_BASE_PATH can override this for another hosting path.
const base = process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/BG/' : '/');

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

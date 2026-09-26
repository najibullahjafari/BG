/* global process */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const base = process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/BG/' : '/');
export default defineConfig({plugins:[react()],base,esbuild:{jsxDev:false},server:{host:'0.0.0.0',port:Number(process.env.PORT||8443)},build:{chunkSizeWarningLimit:1600}});

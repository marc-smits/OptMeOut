import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: true,
    terserOptions: {
      compress: false,
      mangle: false,
    },
  },
  define: {
    __DEBUG__: true,
    'process.env.DEBUG': JSON.stringify(true),
    'import.meta.env.DEBUG': JSON.stringify(true),
  },
});

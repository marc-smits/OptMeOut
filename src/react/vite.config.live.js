import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    minify: true,
    sourcemap: false,
    terserOptions: {
      compress: true,
      mangle: true,
    },
  },
  define: {
    __DEBUG__: false,
    'process.env.DEBUG': JSON.stringify(false),
    'import.meta.env.DEBUG': JSON.stringify(false),
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // Translate all local /api calls to http://phpApi only locally in dev mode
    proxy: {
      '/api': {
        target: 'http://phpApi',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  build: {
    minify: false,
    sourcemap: true,
    terserOptions: {
      compress: false,
      mangle: false,
    },
  },
})

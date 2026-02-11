import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3001,  // Using a different port to avoid conflicts with the main app
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Assuming the Django API is running on port 8000
        changeOrigin: true,
        secure: false
      }
    }
  }
})
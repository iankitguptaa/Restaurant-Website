import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  // base: "./" removed — causes blank page with React Router (BrowserRouter)
  // Use "/" (default) for dev; set via env only if deploying to subpath
})
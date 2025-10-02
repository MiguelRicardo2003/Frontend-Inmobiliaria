import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    host: true,     
    port: 5173,
    proxy: {
      '/service': {
        target: 'https://backend-inmobiliaria.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  plugins: [react()],
})

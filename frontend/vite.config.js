import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://43.205.221.29:5000',
        changeOrigin: true 
      }
    }
  },
  node: {
    global: false
 },
 watch: {
  usePolling: true,
},
})



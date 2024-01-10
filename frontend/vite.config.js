import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://3.111.205.174:5000',
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



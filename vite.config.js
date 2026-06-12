import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/fila_reactpro/',
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, 'src/image')
    }
  }
})

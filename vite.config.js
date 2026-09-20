import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/components/store.js'),
    },
  },
})

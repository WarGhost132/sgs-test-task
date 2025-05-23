import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@stores': path.resolve(__dirname, './src/app/providers/store')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/vars.scss" as *;`
      }
    }
  }
})

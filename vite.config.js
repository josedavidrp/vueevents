import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi super app',
        short_name: 'Mi app',
        description: 'Descripcion',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/img/icons/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'SloApp — Esloveno fácil',
        short_name: 'SloApp',
        description: 'Aprendé lo básico de esloveno en español.',
        lang: 'es',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
})

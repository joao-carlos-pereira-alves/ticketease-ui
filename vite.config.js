// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
  ],
  server: {
    proxy: process.env.APP_VUE_BACK_SERVER || "http://localhost:8080",
    port: process.env.FRONTEND_PORT || 8080,
    host: true,
  },
})

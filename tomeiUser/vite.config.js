// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: {
    // 'process.env': {
    //   'BASE_API': 'http://192.168.169.182:8080'
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
    // proxy: {
    //   // 接口地址代理
    //   '/tomei-api': {
    //     target: 'http://tomei.lanyanye.com', // 接口的域名
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     rewrite: path => path.replace(/^\/tomei-api/, '')
    //   },
    //   'dev-api': {
    //     target: 'http://192.168.169.182:8080', // 接口的域名
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     rewrite: path => path.replace(/^\/dev-api/, '')
    //   }
    // }
  },
})




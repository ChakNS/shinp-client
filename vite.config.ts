/* eslint-disable camelcase */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import myTest from './plugins/myTest.js'
import { join } from 'path'

// element-plus 按需引入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = (path: string) => join(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    https: false,
    proxy: {},
  },
  build: {
    target: 'modules',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    sourcemap: false,
    manifest: false,
    minify: 'terser',
    write: true,
    emptyOutDir: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    myTest([
      {
        extract: ['#102058'],
        transform: code => code.replace(new RegExp('#102058', 'ig'), 'blue'),
        output: 'myThemes/test1.css',
        injectTo: {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
          },
          children: `
            window.onload = function () {
              var link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = './myThemes/test1.css'
              document.head.appendChild(link)
            }
          `,
          injectTo: 'head',
        },
      },
      {
        extract: ['#409EFF'],
        transform: code => code.replace(new RegExp('#409EFF', 'ig'), 'red !important'),
        output: 'myThemes/test2.css',
      },
    ]),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      _c: resolve('src/components'),
      _u: resolve('src/utils'),
      _a: resolve('src/service/api'),
      _p: resolve('src/store'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/main.scss";',
      },
    },
  },
})

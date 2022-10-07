import { defineConfig } from "vite";
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import ViteRadar from 'vite-plugin-radar';
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize';
import minifyHTMLLiterals from 'rollup-plugin-minify-html-literals';
import imagemin from "rollup-plugin-imagemin";
import brotli from "rollup-plugin-brotli";
import buildStatistics from 'rollup-plugin-build-statistics';
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      manifest: 'auto',
      workbox: {
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,png,webp,jpg,mp4,webm,glb}'
        ],
      },
      devOptions: {
        enabled: true
      }
    }),
    buildStatistics({
      projectName: 'schnauze-fabrik',
    }),
    brotli(),
    visualizer(),
    htmlMinimize({
      filter: /\.x?html?$/,
      minifierOptions: {
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    minifyHTMLLiterals(),
    imagemin(),
    vitePluginFaviconsInject('./src/img/logo.svg',
      {
        appName: 'Schnauze Fabrik',
        appDescription: 'Design your SPACE with DIY 3D paper Skulpture',
        developerName: 'MrDevin',
        developerURL: null,
        lang: 'de',
        display: "minimal-ui",
        background: '#ffd400',
        theme_color: '#fff'
      }
    ),
    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-WKRSREQMZ0',
      },
    }),

  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      manualChunks: {
        SfModel: ['src/components/sf-model.ts'],
      }
    },
    manifest: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    port: 8080,
    host: '0.0.0.0'
  }
})



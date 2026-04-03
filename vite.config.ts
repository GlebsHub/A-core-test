import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/A-core-test/' : '/',
  resolve: {
    alias: {
      'react-window': path.resolve(__dirname, 'node_modules/react-window'),
      // ui-kit не экспортирует theme в package.json — только прямой путь к файлу
      'alphacore-ui-kit-theme.css': path.resolve(
        __dirname,
        'node_modules/@alphacore/ui-kit/dist/styles/index.css',
      ),
    },
  },
  optimizeDeps: {
    include: ['react-window'],
    exclude: ['@alphacore/ui-kit'],
  },
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://185.207.66.100:8080',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/graphql': {
        target: 'http://185.207.66.100:8080',
        changeOrigin: true,
      },
    },
  },
}))
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_URL?.trim() || '/'

  return {
  base,
  resolve: {
    alias: {
      // Иначе в кэше optimizeDeps мог оказаться react-window v2 без FixedSizeList
      'react-window': path.resolve(__dirname, 'node_modules/react-window'),
    },
  },
  optimizeDeps: {
    include: ['react-window'],
    /** Иначе Vite кладёт ui-kit в `.vite/deps` и игнорирует правки в `node_modules/.../Tree.es.js`. */
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
  }
})

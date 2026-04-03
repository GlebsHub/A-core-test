/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Подпуть для GitHub Pages, например `/repo-name/`. Локально не задавать. */
  readonly VITE_BASE_URL?: string
  readonly VITE_GRAPHQL_URL?: string

  readonly VITE_GRAPHQL_EMAIL?: string
  readonly VITE_GRAPHQL_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

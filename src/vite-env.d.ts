/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL?: string

  readonly VITE_GRAPHQL_EMAIL?: string
  readonly VITE_GRAPHQL_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

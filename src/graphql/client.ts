import { GraphQLClient } from 'graphql-request'

const DEFAULT_URL = 'http://185.207.66.100:8080/graphql'


export function getGraphQLUrl(): string {
  const env = import.meta.env.VITE_GRAPHQL_URL
  if (env && String(env).trim().length > 0) {
    return env.trim()
  }
  const onLocalHost =
    typeof window !== 'undefined' &&
    /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)
  if (import.meta.env.DEV || onLocalHost) {
    if (typeof window !== 'undefined') {
      return new URL('/graphql', window.location.origin).href
    }
    return DEFAULT_URL
  }
  return DEFAULT_URL
}

export function createGraphQLClient(token?: string | null): GraphQLClient {
  return new GraphQLClient(getGraphQLUrl(), {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}

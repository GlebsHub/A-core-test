const KEY = 'alphacore-jwt'

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function setStoredToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function clearStoredToken() {
  localStorage.removeItem(KEY)
}

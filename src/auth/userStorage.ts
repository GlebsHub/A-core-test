const KEY = 'alphacore-user'

export type StoredUser = {
  /** Поле `name` с API (часто «Имя Фамилия» в одной строке) */
  name: string
  email?: string
}

export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredUser
    if (typeof parsed?.name !== 'string') return null
    return parsed
  } catch {
    return null
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(KEY)
}

/** Для подписи в UI: если в `name` два слова — показываем как имя · фамилия */
export function formatUserDisplayName(user: StoredUser): string {
  const n = user.name.trim()
  if (!n) return user.email ?? 'Пользователь'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]} ${parts.slice(1).join(' ')}`
  }
  return n
}

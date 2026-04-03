import { create } from 'zustand'
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from './tokenStorage'
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
  type StoredUser,
} from './userStorage'

function readToken(): string | null {
  if (typeof window === 'undefined') return null
  return getStoredToken()
}

function readUser(): StoredUser | null {
  if (typeof window === 'undefined') return null
  return getStoredUser()
}

export type AuthValue = {
  token: string | null
  user: StoredUser | null
  setToken: (token: string) => void
  setUser: (user: StoredUser | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthValue>((set) => ({
  token: readToken(),
  user: readUser(),
  setToken: (t) => {
    setStoredToken(t)
    set({ token: t })
  },
  setUser: (u) => {
    if (u === null) {
      clearStoredUser()
      set({ user: null })
    } else {
      setStoredUser(u)
      set({ user: u })
    }
  },
  logout: () => {
    clearStoredToken()
    clearStoredUser()
    set({ token: null, user: null })
  },
}))

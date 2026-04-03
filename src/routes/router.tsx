import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { getStoredToken } from '../auth/tokenStorage'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    if (!getStoredToken()) {
      throw redirect({ to: '/login' })
    }
  },
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    if (getStoredToken()) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

const routeTree = rootRoute.addChildren([indexRoute, loginRoute])

export const router = createRouter({
  routeTree,
  // GitHub Pages: app lives under /A-core-test/ (see vite.config base); must match or routes never match.
  basepath: import.meta.env.BASE_URL,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

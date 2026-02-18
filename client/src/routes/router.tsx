import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme/theme-providers";
import { LandingPage } from "../components/landing-page/LandingPage";
import { AuthPage } from "../components/auth/AuthPage";
import { PublicRoute } from "../components/auth/PublicRoute";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="light">
      <Outlet />
    </ThemeProvider>
  ),
});

// Public layout - redirects authenticated users to dashboard
const publicLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicRoute,
});

// Public routes (children of publicLayout)
const indexRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/",
  component: LandingPage,
});

const authRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/auth",
  component: AuthPage,
});

// Protected layout - redirects unauthenticated users to auth
const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

// Protected routes (children of protectedLayout)
const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/dashboard",
  component: () => <div>Dashboard (protected)</div>,
});

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([indexRoute, authRoute]),
  protectedLayout.addChildren([dashboardRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

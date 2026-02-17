import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme/theme-providers";
import { LandingPage } from "../components/landing-page/LandingPage";
import { AuthPage } from "../components/auth/AuthPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="light">
      <Outlet />
    </ThemeProvider>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

// Protected layout - all children require authentication
const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

// Add protected child routes here
const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/dashboard",
  component: () => <div>Dashboard (protected)</div>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  protectedLayout.addChildren([dashboardRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

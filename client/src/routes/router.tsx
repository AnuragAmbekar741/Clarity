import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme/theme-providers";
import { Landing } from "../views/landing/Landing";
import { Auth } from "../views/auth/Auth";
import { PublicRoute } from "../components/auth/PublicRoute";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { DashboardLayout } from "../views/dashboard/layout/DashboardLayout";
import { DashboardHome } from "../views/dashboard/pages/home/DashboardHome";

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
  component: Landing,
});

const authRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/auth",
  component: Auth,
});

// Protected layout - redirects unauthenticated users to auth
const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

// Dashboard layout - wraps all dashboard pages with sidebar
const dashboardLayout = createRoute({
  getParentRoute: () => protectedLayout,
  id: "dashboard-layout",
  component: DashboardLayout,
});

// Dashboard routes (children of dashboardLayout)
const dashboardHomeRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard",
  component: DashboardHome,
});

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([indexRoute, authRoute]),
  protectedLayout.addChildren([dashboardLayout.addChildren([dashboardHomeRoute])]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

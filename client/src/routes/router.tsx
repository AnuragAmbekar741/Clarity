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
import { DashboardStarred } from "../views/dashboard/pages/mail/Starred";
import { DashboardSent } from "../views/dashboard/pages/mail/Sent";
import { DashboardDrafts } from "../views/dashboard/pages/mail/Drafts";
import { DashboardArchive } from "../views/dashboard/pages/mail/Archive";
import { DashboardSettings } from "../views/dashboard/pages/settings/DashboardSettings";
import { GmailSuccess } from "../views/dashboard/pages/gmail/GmailSuccess";
import { GmailError } from "../views/dashboard/pages/gmail/GmailError";

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

const gmailSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gmail/success",
  component: GmailSuccess,
});

const gmailErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gmail/error",
  component: GmailError,
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

const dashboardStarredRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard/starred",
  component: DashboardStarred,
});

const dashboardSentRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard/sent",
  component: DashboardSent,
});

const dashboardDraftsRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard/drafts",
  component: DashboardDrafts,
});

const dashboardArchiveRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard/archive",
  component: DashboardArchive,
});

const dashboardSettingsRoute = createRoute({
  getParentRoute: () => dashboardLayout,
  path: "/dashboard/settings",
  component: DashboardSettings,
});

const routeTree = rootRoute.addChildren([
  publicLayout.addChildren([indexRoute, authRoute]),
  protectedLayout.addChildren([
    dashboardLayout.addChildren([
      dashboardHomeRoute,
      dashboardStarredRoute,
      dashboardSentRoute,
      dashboardDraftsRoute,
      dashboardArchiveRoute,
      dashboardSettingsRoute,
    ]),
  ]),
  gmailSuccessRoute,
  gmailErrorRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

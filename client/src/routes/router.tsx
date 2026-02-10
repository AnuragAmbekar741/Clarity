import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme/theme-providers";
import { LandingPage } from "../components/landing-page/LandingPage";
import { AuthPage } from "../components/auth/AuthPage";

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="light">
      <Outlet />
    </ThemeProvider>
  ),
});

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

const routeTree = rootRoute.addChildren([indexRoute, authRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

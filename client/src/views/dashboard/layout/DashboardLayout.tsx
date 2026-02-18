import { Outlet, useRouterState } from "@tanstack/react-router";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "./AppSidebar";

// Map routes to breadcrumb labels
const routeLabels: Record<
  string,
  { label: string; parent?: { label: string; href: string } }
> = {
  "/dashboard": { label: "Inbox" },
  "/dashboard/starred": {
    label: "Starred",
    parent: { label: "Mail", href: "/dashboard" },
  },
  "/dashboard/sent": {
    label: "Sent",
    parent: { label: "Mail", href: "/dashboard" },
  },
  "/dashboard/drafts": {
    label: "Drafts",
    parent: { label: "Mail", href: "/dashboard" },
  },
  "/dashboard/archive": {
    label: "Archive",
    parent: { label: "Mail", href: "/dashboard" },
  },
  "/dashboard/settings": { label: "Settings" },
};

function Breadcrumbs() {
  const { pathname } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname }),
  });
  const route = routeLabels[pathname];

  if (!route) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {route.parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={route.parent.href}
                className="text-foreground/60 hover:text-foreground"
              >
                {route.parent.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        <BreadcrumbItem>
          <span className="text-foreground font-medium">{route.label}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 border-b bg-muted/2 px-8 py-4 h-16 sticky top-0 z-40">
          <SidebarTrigger className="h-8 w-8 -ml-2 md:hidden" />
          <div className="hidden md:flex">
            <SidebarTrigger className="h-8 w-8" />
          </div>
          <Separator
            orientation="vertical"
            className="h-6 hidden md:block bg-muted/20"
          />
          <Breadcrumbs />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="h-full px-8 py-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

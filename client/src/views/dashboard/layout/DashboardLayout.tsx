import { Outlet, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
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
const routeLabels: Record<string, { label: string; parent?: { label: string; href: string } }> = {
  "/dashboard": { label: "Inbox" },
  "/dashboard/starred": { label: "Starred", parent: { label: "Mail", href: "/dashboard" } },
  "/dashboard/sent": { label: "Sent", parent: { label: "Mail", href: "/dashboard" } },
  "/dashboard/drafts": { label: "Drafts", parent: { label: "Mail", href: "/dashboard" } },
  "/dashboard/archive": { label: "Archive", parent: { label: "Mail", href: "/dashboard" } },
  "/dashboard/settings": { label: "Settings" },
};

function Breadcrumbs() {
  const { pathname } = useRouterState({ select: (s) => ({ pathname: s.location.pathname }) });
  const route = routeLabels[pathname];

  if (!route) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {route.parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={route.parent.href} className="text-foreground/60 hover:text-foreground">
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
        <header className="flex items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 h-16 sticky top-0 z-40">
          <SidebarTrigger className="h-9 w-9 -ml-2" asChild>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 px-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </button>
          </SidebarTrigger>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <Breadcrumbs />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

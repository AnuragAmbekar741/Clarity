import { useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Mail,
  Star,
  Send,
  FileText,
  Archive,
  Settings,
  LogOut,
  MoreVertical,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";

const mailItems = [
  { label: "Inbox", icon: Mail, to: "/dashboard", badge: 12 },
  { label: "Starred", icon: Star, to: "/dashboard/starred" },
  { label: "Sent", icon: Send, to: "/dashboard/sent" },
  { label: "Drafts", icon: FileText, to: "/dashboard/drafts" },
  { label: "Archive", icon: Archive, to: "/dashboard/archive" },
];

const otherItems = [
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

export function AppSidebar() {
  const { pathname } = useRouterState({ select: (s) => ({ pathname: s.location.pathname }) });
  const { user } = useAuth();
  const { logout } = useGoogleAuth();
  const navigate = useNavigate();

  const getInitials = (email?: string) => {
    if (!email) return "?";
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar variant="inset" collapsible="icon" className="bg-muted/3">
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-7 bg-black dark:bg-white rounded-md flex items-center justify-center shrink-0">
            <span className="font-[Syne] font-bold text-[11px] text-white dark:text-black tracking-tight">
              C
            </span>
          </div>
          <span className="font-[Syne] font-bold text-[16px] tracking-tight text-black dark:text-white truncate group-data-[state=collapsed]/sidebar-wrapper:hidden">
            clarity
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-140px)]">
          <SidebarGroup>
            <SidebarGroupLabel>Mail</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mailItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={isActive(item.to)}
                      onClick={() => navigate({ to: item.to })}
                      className="cursor-pointer"
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold">
                          {item.badge}
                        </Badge>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mx-2 my-2" />

          <SidebarGroup>
            <SidebarGroupLabel>Other</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {otherItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={isActive(item.to)}
                      onClick={() => navigate({ to: item.to })}
                      className="cursor-pointer"
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="rounded-lg bg-black/10 dark:bg-white/10 text-[11px] font-semibold">
                      {getInitials(user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]/sidebar-wrapper:hidden">
                    <span className="truncate font-semibold">
                      {user?.email?.split("@")[0] || "User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                  <MoreVertical className="ml-auto h-4 w-4 group-data-[state=collapsed]/sidebar-wrapper:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side="bottom"
                align="end"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.email?.split("@")[0]}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/dashboard/settings" })} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

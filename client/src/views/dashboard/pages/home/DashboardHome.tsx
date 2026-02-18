import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Archive, Send, FileText } from "lucide-react";

const stats = [
  { label: "Unread", value: "12", icon: Mail, color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400" },
  { label: "Starred", value: "3", icon: Archive, color: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400" },
  { label: "Sent", value: "24", icon: Send, color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400" },
  { label: "Drafts", value: "2", icon: FileText, color: "bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400" },
];

export function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          You have 12 unread messages. Start organizing your inbox today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="overflow-hidden shadow-none border-muted/30 bg-background">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</CardTitle>
                <div className={`rounded p-1.5 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">
            Your latest emails will appear here
          </p>
        </div>

        <Card className="shadow-none border-muted/30 bg-background">
          <CardHeader>
            <CardTitle className="text-base">Incoming Messages</CardTitle>
            <CardDescription>
              Your email messages will be displayed in a table below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/30 transition-colors">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1 min-w-0">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-3 w-12 shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="shadow-none border-muted/30 bg-background">
        <CardHeader>
          <CardTitle className="text-base">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use ⌘B to toggle the sidebar on desktop</p>
          <p>• Star important messages for quick access</p>
          <p>• Your drafts auto-save as you type</p>
        </CardContent>
      </Card>
    </div>
  );
}

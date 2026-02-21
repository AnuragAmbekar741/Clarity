import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useTheme } from "@/components/theme/use-theme";
import {
  useGmailAccounts,
  useGmailAuthUrl,
  useRevokeGmailAccount,
} from "@/hooks/gmail/useGmailAccounts";
import { Moon, Sun, Trash2, AlertCircle, CheckCircle } from "lucide-react";

export function DashboardSettings() {
  const { theme, setTheme } = useTheme();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // React Query hooks
  const {
    data: accounts = [],
    isLoading,
    error: accountsError,
  } = useGmailAccounts();

  const connectMutation = useGmailAuthUrl();
  const revokeMutation = useRevokeGmailAccount();

  // Handle disconnect Gmail account
  const handleDisconnect = (accountId: string, email: string) => {
    if (
      !confirm(
        `Are you sure you want to disconnect ${email}? You'll need to reconnect to access this account again.`
      )
    ) {
      return;
    }

    // Show success message via callback, not effect
    revokeMutation.mutate(accountId, {
      onSuccess: () => {
        setSuccessMessage("Gmail account disconnected successfully");
        const timer = setTimeout(() => setSuccessMessage(null), 3000);
        return () => clearTimeout(timer);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-base text-muted-foreground">
          Manage your preferences and connected accounts
        </p>
      </div>

      {/* Status Messages */}
      {accountsError && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <div>
            <AlertTitle>Failed to load Gmail accounts</AlertTitle>
            <AlertDescription>
              {accountsError instanceof Error
                ? accountsError.message
                : "An error occurred while loading your Gmail accounts"}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {revokeMutation.error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <div>
            <AlertTitle>Disconnection failed</AlertTitle>
            <AlertDescription>
              Failed to disconnect Gmail account. Please try again.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success">
          <CheckCircle className="w-4 h-4" />
          <div>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </div>
        </Alert>
      )}

      {/* Settings Sections */}
      <div className="space-y-5">
        {/* Theme Section */}
        <section className="border border-border/40 rounded-lg p-6 bg-card/50 space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold">Theme</h2>
            <p className="text-sm text-muted-foreground">
              Choose your preferred color scheme
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setTheme("light")}
              variant={theme === "light" ? "default" : "outline"}
              className="gap-2"
              aria-pressed={theme === "light"}
              aria-label="Light theme"
            >
              <Sun className="w-4 h-4" />
              Light
            </Button>
            <Button
              onClick={() => setTheme("dark")}
              variant={theme === "dark" ? "default" : "outline"}
              className="gap-2"
              aria-pressed={theme === "dark"}
              aria-label="Dark theme"
            >
              <Moon className="w-4 h-4" />
              Dark
            </Button>
            <Button
              onClick={() => setTheme("system")}
              variant={theme === "system" ? "default" : "outline"}
              className="gap-2"
              aria-pressed={theme === "system"}
              aria-label="System theme"
            >
              System
            </Button>
          </div>
        </section>

        {/* Gmail Integration Section */}
        <section className="border border-border/40 rounded-lg p-6 bg-card/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-semibold">Gmail Integration</h2>
              <p className="text-sm text-muted-foreground">
                Connect your Gmail accounts to manage emails
              </p>
            </div>
            <Button
              onClick={() => connectMutation.mutate()}
              disabled={connectMutation.isPending}
              variant={accounts.length === 0 ? "default" : "outline"}
              size="sm"
              className="gap-2 shrink-0"
            >
              <GoogleLogo />
              {connectMutation.isPending
                ? "Connecting…"
                : accounts.length === 0
                ? "Connect Gmail"
                : "Add Account"}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto"></div>
                <p className="text-sm text-muted-foreground">
                  Loading accounts…
                </p>
              </div>
            </div>
          ) : accounts.length === 0 ? (
            <Alert variant="warning">
              <AlertCircle className="w-4 h-4" />
              <div>
                <AlertTitle>Gmail account required</AlertTitle>
                <AlertDescription>
                  Connect at least one Gmail account to use this application.
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-background/50 border border-border/40 rounded-md hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0"
                      aria-label={`Avatar for ${account.googleEmail}`}
                    >
                      {account.googleEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {account.googleEmail}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {new Date(account.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                        {new Date(account.expiresAt) < new Date() ? (
                          <span className="text-amber-600 dark:text-amber-500 font-medium">
                            Expired
                          </span>
                        ) : (
                          <span>
                            Exp:{" "}
                            {new Date(account.expiresAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      handleDisconnect(account.id, account.googleEmail)
                    }
                    disabled={revokeMutation.isPending}
                    variant="ghost"
                    size="sm"
                    className="shrink-0 h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Disconnect ${account.googleEmail}`}
                  >
                    {revokeMutation.isPending ? (
                      <div className="w-3 h-3 animate-spin rounded-full border border-current border-t-transparent" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/**
 * Google Logo SVG component
 */
function GoogleLogo() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

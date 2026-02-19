import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Alerts */}
      {accountsError && (
        <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {accountsError instanceof Error
              ? accountsError.message
              : "Failed to load Gmail accounts"}
          </p>
        </div>
      )}

      {revokeMutation.error && (
        <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">
            Failed to disconnect Gmail account
          </p>
        </div>
      )}

      {successMessage && (
        <div className="flex gap-3 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-700 dark:text-green-300">
            {successMessage}
          </p>
        </div>
      )}

      {/* Theme Settings */}
      <div className="border dark:border-gray-700 rounded-xl p-6 space-y-4 bg-card">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Theme</h2>
          <p className="text-sm text-muted-foreground">
            Choose your preferred color scheme
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setTheme("light")}
            variant={theme === "light" ? "default" : "outline"}
            className="gap-2"
            size="sm"
          >
            <Sun className="w-4 h-4" />
            Light
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            variant={theme === "dark" ? "default" : "outline"}
            className="gap-2"
            size="sm"
          >
            <Moon className="w-4 h-4" />
            Dark
          </Button>
          <Button
            onClick={() => setTheme("system")}
            variant={theme === "system" ? "default" : "outline"}
            className="gap-2"
            size="sm"
          >
            System
          </Button>
        </div>
      </div>

      {/* Gmail Integration Section */}
      <div className="border dark:border-gray-700 rounded-xl p-6 space-y-6 bg-card">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Gmail Integration</h2>
          <p className="text-sm text-muted-foreground">
            Connect your Gmail accounts to start reading and managing emails
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Loading accounts...
              </p>
            </div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="space-y-4">
            <div className="text-center space-y-2 py-6">
              <p className="font-medium">No Gmail accounts connected</p>
              <p className="text-sm text-muted-foreground">
                Connect your Gmail account to start reading emails
              </p>
            </div>
            <Button
              onClick={() => connectMutation.mutate()}
              disabled={connectMutation.isPending}
              className="w-full gap-2"
            >
              <GoogleLogo />
              {connectMutation.isPending ? "Connecting..." : "Connect Gmail"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-muted/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted dark:hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                      {account.googleEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
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
                            ⚠️ Expired
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
                    className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 ml-2"
                  >
                    {revokeMutation.isPending ? (
                      <div className="w-3.5 h-3.5 animate-spin rounded-full border border-current border-t-transparent"></div>
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                onClick={() => connectMutation.mutate()}
                disabled={connectMutation.isPending}
                className="w-full gap-2"
              >
                <GoogleLogo />
                {connectMutation.isPending
                  ? "Connecting..."
                  : "Connect Another Account"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Google Logo SVG component
 */
function GoogleLogo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

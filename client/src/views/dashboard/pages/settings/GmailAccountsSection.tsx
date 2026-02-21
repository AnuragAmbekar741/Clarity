import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Trash2 } from "lucide-react";
import type { GmailAccount } from "@/types/gmail";
import type { UseMutationResult } from "@tanstack/react-query";

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

interface GmailAccountsSectionProps {
  accounts: GmailAccount[];
  isLoading: boolean;
  accountsError: Error | null;
  connectMutation: UseMutationResult<string, Error, void>;
  revokeMutation: UseMutationResult<void, Error, string>;
  onDisconnect: (accountId: string, email: string) => void;
}

export function GmailAccountsSection({
  accounts,
  isLoading,
  accountsError,
  connectMutation,
  revokeMutation,
  onDisconnect,
}: GmailAccountsSectionProps) {
  return (
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

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto" />
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
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0"
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
                      <span className="text-warning font-medium">Expired</span>
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
                onClick={() => onDisconnect(account.id, account.googleEmail)}
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
  );
}

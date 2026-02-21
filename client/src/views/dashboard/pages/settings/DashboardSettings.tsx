import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSettingsPage } from "./useSettingsPage";
import { ThemeSection } from "./ThemeSection";
import { GmailAccountsSection } from "./GmailAccountsSection";

function StatusAlerts({
  accountsError,
  revokeError,
  successMessage,
}: {
  accountsError: Error | null;
  revokeError: Error | null;
  successMessage: string | null;
}) {
  return (
    <>
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
      {revokeError && (
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
    </>
  );
}

export function DashboardSettings() {
  const settings = useSettingsPage();

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-base text-muted-foreground">
          Manage your preferences and connected accounts
        </p>
      </div>

      <StatusAlerts
        accountsError={settings.accountsError}
        revokeError={settings.revokeMutation.error}
        successMessage={settings.successMessage}
      />

      <div className="space-y-5">
        <ThemeSection
          theme={settings.theme}
          setTheme={settings.setTheme}
        />
        <GmailAccountsSection
          accounts={settings.accounts}
          isLoading={settings.isLoading}
          accountsError={settings.accountsError}
          connectMutation={settings.connectMutation}
          revokeMutation={settings.revokeMutation}
          onDisconnect={settings.handleDisconnect}
        />
      </div>
    </div>
  );
}

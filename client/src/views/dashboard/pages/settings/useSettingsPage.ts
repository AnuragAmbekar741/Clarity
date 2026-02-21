import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/use-theme";
import {
  useGmailAccounts,
  useGmailAuthUrl,
  useRevokeGmailAccount,
} from "@/hooks/gmail/useGmailAccounts";
export function useSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    data: accounts = [],
    isLoading,
    error: accountsError,
  } = useGmailAccounts();

  const connectMutation = useGmailAuthUrl();
  const revokeMutation = useRevokeGmailAccount();

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleDisconnect = (accountId: string, email: string) => {
    if (
      !confirm(
        `Are you sure you want to disconnect ${email}? You'll need to reconnect to access this account again.`
      )
    ) {
      return;
    }
    revokeMutation.mutate(accountId, {
      onSuccess: () => {
        setSuccessMessage("Gmail account disconnected successfully");
      },
    });
  };

  return {
    theme,
    setTheme,
    accounts,
    isLoading,
    accountsError,
    connectMutation,
    revokeMutation,
    successMessage,
    handleDisconnect,
  };
}

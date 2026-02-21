import { apiClient } from "@/services/global.client";
import type { ApiResponse } from "@/types/api";
import type { GmailAccount } from "@/types/gmail";

export const gmailService = {
  /**
   * Get the OAuth URL for connecting a Gmail account
   * User should be redirected to this URL
   */
  getAuthUrl: async (): Promise<string> => {
    const response = await apiClient.get<ApiResponse<{ url: string }>>(
      "/api/gmail/auth-url"
    );
    return response.data.data.url;
  },

  /**
   * Get all Gmail accounts connected by the user
   */
  getConnectedAccounts: async (): Promise<GmailAccount[]> => {
    const response = await apiClient.get<
      ApiResponse<{ accounts: GmailAccount[] }>
    >("/api/gmail/accounts");
    return response.data.data.accounts;
  },

  /**
   * Disconnect/revoke a Gmail account
   */
  revokeAccount: async (accountId: string): Promise<void> => {
    await apiClient.delete(`/api/gmail/accounts/${accountId}`);
  },
};

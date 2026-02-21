import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import { gmailService } from "@/api/gmail";
import type { GmailAccount } from "@/types/gmail";

/**
 * Hook to fetch all Gmail accounts for the current user
 */
export function useGmailAccounts(): UseQueryResult<GmailAccount[], Error> {
  return useQuery({
    queryKey: ["gmail", "accounts"],
    queryFn: () => gmailService.getConnectedAccounts(),
  });
}

/**
 * Hook to get Gmail OAuth URL and redirect user to Google
 */
export function useGmailAuthUrl(): UseMutationResult<string, Error, void> {
  return useMutation({
    mutationFn: () => gmailService.getAuthUrl(),
    onSuccess: (url) => {
      window.location.href = url;
    },
  });
}

/**
 * Hook to disconnect/revoke a Gmail account
 */
export function useRevokeGmailAccount(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => gmailService.revokeAccount(accountId),
    onSuccess: () => {
      // Refetch accounts after revoke
      queryClient.invalidateQueries({ queryKey: ["gmail", "accounts"] });
    },
  });
}

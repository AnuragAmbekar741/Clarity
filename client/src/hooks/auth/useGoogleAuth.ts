import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "@/api/auth";
import type { CredentialResponse } from "@react-oauth/google";

export function useGoogleAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (credentialResponse: CredentialResponse) => {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No credential received from Google");
      }

      return authService.googleLogin(idToken);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.error("Google auth error:", error);
    },
  });

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    mutation.mutate(credentialResponse);
  };

  const handleGoogleError = () => {
    mutation.reset();
  };

  const logout = async () => {
    await authService.logout();
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
    navigate({ to: "/auth" });
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    logout,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}

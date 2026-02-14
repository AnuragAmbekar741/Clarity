import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "@/api/auth";
import type { CredentialResponse } from "@react-oauth/google";

export function useGoogleAuth() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (credentialResponse: CredentialResponse) => {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No credential received from Google");
      }

      // Call the auth service to verify token and get JWT
      return authService.googleLogin(idToken);
    },
    onSuccess: (data) => {
      const { accessToken, user } = data;

      // Store JWT token and user in localStorage
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home after successful auth
      navigate({ to: "/" });
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

  const logout = () => {
    authService.logout();
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

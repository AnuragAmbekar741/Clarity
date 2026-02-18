import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth";

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getCurrentUser,
    retry: false,
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isAuthenticated: !isError && !!data,
  };
}

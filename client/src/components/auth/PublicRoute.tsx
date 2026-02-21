import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
}

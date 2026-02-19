import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function GmailSuccess() {
  const navigate = useNavigate();
  const { email, accountId } = useSearch({ from: "/gmail/success" });

  useEffect(() => {
    // Auto-redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate({ to: "/dashboard/settings" });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center space-y-4">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600">
          Gmail Connected Successfully!
        </h1>
        <p className="text-muted-foreground">
          Your Gmail account <span className="font-medium">{email}</span> is now
          connected.
        </p>
        <p className="text-sm text-muted-foreground">
          Account ID: <span className="font-mono text-xs">{accountId}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to settings in 2 seconds...
        </p>
        <Button
          onClick={() => navigate({ to: "/dashboard/settings" })}
          className="w-full"
        >
          Go to Settings
        </Button>
      </div>
    </div>
  );
}

import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function GmailError() {
  const navigate = useNavigate();
  const { reason = "Unknown error" } = useSearch({ from: "/gmail/error" }) as {
    reason?: string;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card rounded-lg border border-border/40 shadow-lg p-8 max-w-md w-full mx-4 text-center space-y-4">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-destructive">
          Gmail Connection Failed
        </h1>
        <p className="text-muted-foreground">
          Something went wrong while connecting your Gmail account.
        </p>
        <p className="text-sm bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 text-destructive">
          Error: {reason}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate({ to: "/dashboard/settings" })}
            variant="outline"
            className="flex-1"
          >
            Back to Settings
          </Button>
          <Button
            onClick={() => navigate({ to: "/dashboard/settings" })}
            className="flex-1"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

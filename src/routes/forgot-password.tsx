import { createFileRoute } from "@tanstack/react-router";
import { AuthView } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <AuthView view="FORGOT_PASSWORD" />
    </div>
  );
}

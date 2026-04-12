import { createFileRoute } from "@tanstack/react-router";
import { AuthView } from "@daveyplate/better-auth-ui";
import { z } from "zod";

const resetPasswordSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/reset-password")({
  validateSearch: resetPasswordSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <AuthView view="RESET_PASSWORD" />
    </div>
  );
}

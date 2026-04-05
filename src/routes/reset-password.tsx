import { ResetPasswordForm } from "@/components/reset-password-form";
import { Button } from "@/components/ui/button";
import { wadaDisplayName } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { z } from "zod";

const resetPasswordSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/reset-password")({
  validateSearch: resetPasswordSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const token = search.token?.trim();

  if (!token || typeof token !== "string") {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="max-w-sm rounded-md bg-white p-8 shadow">
          <h1 className="text-2xl font-bold">Invalid Password Reset Link</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            The password reset link is missing or invalid. Please request a new
            password reset link.
          </p>
          <Button className="mt-6 w-full">
            <Link to="/forgot-password">Request Password Reset</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {wadaDisplayName}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ResetPasswordForm token={token} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://pub-2b0addf01b884fb58892ece1dc10f22d.r2.dev/logos/feature.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

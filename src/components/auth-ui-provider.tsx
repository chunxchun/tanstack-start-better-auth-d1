import { authClient } from "@/lib/authClient";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface AuthUIProviderProps {
  children: ReactNode;
}

function TanstackLink({
  href,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return <Link to={href} {...(props as React.ComponentProps<typeof Link>)} />;
}

export function AuthUIProvider({ children }: AuthUIProviderProps) {
  const navigate = useNavigate();

  return (
    <AuthUIProviderTanstack
      authClient={authClient}
      navigate={(href) => navigate({ to: href })}
      Link={TanstackLink}
      credentials={{ forgotPassword: true }}
      redirectTo="/dashboard"
    >
      {children}
    </AuthUIProviderTanstack>
  );
}

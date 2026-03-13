import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        throw error;
      }

      console.log("Logout successful");
      await navigate({ to: "/", replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div>Hello "/_protected/dashboard"!</div>
      <div>Welcome, {user.name}!</div>
      <Button onClick={signOut}>logout</Button>
      <Outlet />
    </>
  );
}

import { authClient } from "@/lib/authClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <div>Hello "/_protected/dashboard"!</div>
      <div>Welcome, {user.name}!</div>
      <button onClick={async () => await authClient.signOut()}>logout</button>
    </>
  );
}

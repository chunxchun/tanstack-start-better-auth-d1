import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <>
      <div>Welcome, {user.name}!</div>
      <div>Hello "/_protected/setting"!</div>
    </>
  );
}

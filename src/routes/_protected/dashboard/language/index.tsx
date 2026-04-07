import { createFileRoute } from "@tanstack/react-router";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import SoonComing from "../-shared/soon-coming";

export const Route = createFileRoute("/_protected/dashboard/language/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RouteLayout>
        <RouteHeader title="Language" />
        <SoonComing />
      </RouteLayout>
    </>
  );
}

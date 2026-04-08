import { createFileRoute } from "@tanstack/react-router";
import RouteLayout from "../-shared/routeLayout";
import SoonComing from "../-shared/soon-coming";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/api-doc/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RouteLayout>
        <RouteHeader title="API Documents" />
        <SoonComing />
      </RouteLayout>
    </>
  );
}

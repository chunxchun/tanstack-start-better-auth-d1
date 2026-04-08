import { createFileRoute } from '@tanstack/react-router'
import RouteLayout from '../-shared/routeLayout';
import SoonComing from '../-shared/soon-coming';
import RouteHeader from '../-shared/routerHeader';

export const Route = createFileRoute('/_protected/dashboard/changelog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <RouteLayout>
        <RouteHeader title="Changelog" />
        <SoonComing />
      </RouteLayout>
    </>
  );
}
    
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listMachineFn } from "@/utils/machine/machine.function";
import { createFileRoute } from "@tanstack/react-router";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import RegularScheduleTab from "./-components/regular-schedule-tab";
import { searchSchema } from "@/db/schema/commonSchema";

export const Route = createFileRoute("/_protected/dashboard/schedules/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const machines = await listMachineFn({
      data: {
        limit: 100,
        offset: 0,
        shopId,
      },
    });

    return { machines, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { machines, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  return (
    <RouteLayout>
      <RouteHeader title="Machine Schedules" />
      <Tabs defaultValue="regularSchedule" className="w-1/2 mx-auto">
        <TabsList className="w-full">
          <TabsTrigger value="regularSchedule">Regular Schedule</TabsTrigger>
          <TabsTrigger value="specialSchedule">Special Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="regularSchedule">
          <RegularScheduleTab machines={machines} />
        </TabsContent>
        <TabsContent value="specialSchedule">
          Special schedule content
        </TabsContent>
      </Tabs>
    </RouteLayout>
  );
}

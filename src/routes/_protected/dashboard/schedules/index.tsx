import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listMachineFn } from "@/utils/machine/machine.function";
import { createFileRoute } from "@tanstack/react-router";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import RegularScheduleTab from "./-components/regular-schedule-tab";

export const Route = createFileRoute("/_protected/dashboard/schedules/")({
  loader: async ({ context }) => {
    const machines = await listMachineFn({
      data: {
        limit: 100,
        offset: 0,
        shopId: context.user.shopId ?? undefined,
      },
    });

    return { machines };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { machines } = Route.useLoaderData();

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

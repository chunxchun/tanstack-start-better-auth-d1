import { getDeliveryColumns } from "@/components/delivery/dataTables/deliveryColumns";
import { DataTable } from "@/components/delivery/dataTables/deliveryDataTable";
import CreateDeliveryDialog from "@/components/delivery/dialogs/CreateDeliveryDialog";
import DeleteDeliveryDialog from "@/components/delivery/dialogs/DeleteDeliveryDialog";
import EditDeliveryDialog from "@/components/delivery/dialogs/EditDeliveryDialog";
import ViewDeliveryDialog from "@/components/delivery/dialogs/ViewDeliveryDialog";
import type {
  SelectDeliveryType as Delivery,
  InsertDeliveryType,
  SelectDeliveryType,
  UpdateDeliveryType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createDeliveryFn,
  deleteDeliveryByIdFn,
  listDeliveryFn,
  updateDeliveryByIdFn,
} from "@/utils/delivery/delivery.function";
import { listLocationFn } from "@/utils/location/location.function";
import { listMachineFn } from "@/utils/machine/machine.function";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/deliveries/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [deliveries, locations, machines, shops] = await Promise.all([
      listDeliveryFn({ data: { ...deps, shopId } }),
      listLocationFn({ data: { limit: 100, offset: 0, shopId } }),
      listMachineFn({ data: { limit: 100, offset: 0, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { deliveries, locations, machines, shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { deliveries, locations, machines, shops, user } =
    Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null,
  );

  const { limit, offset } = search;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const columns = useMemo(
    () =>
      getDeliveryColumns({
        onView: (delivery) => {
          setSelectedDelivery(delivery);
          setViewOpen(true);
        },
        onEdit: (delivery) => {
          setSelectedDelivery(delivery);
          setEditOpen(true);
        },
        onDelete: (delivery) => {
          setSelectedDelivery(delivery);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (values: InsertDeliveryType) => {
    try {
      const delivery = {
        ...values,
        shopId: Number(values.shopId),
        destinationLocationId: Number(values.destinationLocationId),
        machineId: Number(values.machineId),
      };
      await createDeliveryFn({ data: delivery });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create delivery:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateDeliveryType) => {
    if (!selectedDelivery) return;

    try {
        const delivery = {
        ...values,
        shopId: Number(values.shopId),
        destinationLocationId: Number(values.destinationLocationId),
        machineId: Number(values.machineId),
      };
      await updateDeliveryByIdFn({ data: delivery });

      setEditOpen(false);
      setSelectedDelivery(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update delivery:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDelivery) return;

    try {
      await deleteDeliveryByIdFn({ data: { id: selectedDelivery.id } });
      setDeleteOpen(false);
      setSelectedDelivery(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete delivery:", error);
    }
  };

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Deliveries" />

        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={deliveries}
          updatePagination={updatePagination}
        />
        <DataTable
          columns={columns}
          data={deliveries as SelectDeliveryType[]}
        />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateDeliveryDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        shops={shops}
        locations={locations}
        machines={machines}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewDeliveryDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
        shops={shops}
        locations={locations}
        machines={machines}
        onCancel={() => {
          setSelectedDelivery(null);
          setViewOpen(false);
        }}
        initialData={selectedDelivery as SelectDeliveryType}
      />

      <EditDeliveryDialog
        open={editOpen}
        shops={shops}
        locations={locations}
        machines={machines}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
        onCancel={() => {
          setSelectedDelivery(null);
          setEditOpen(false);
        }}
        onSubmit={handleEditSubmit}
        initialData={selectedDelivery as SelectDeliveryType}
        defaultShopId={defaultShopId}
      />

      <DeleteDeliveryDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
        onCancel={() => {
          setSelectedDelivery(null);
          setDeleteOpen(false);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedDelivery as SelectDeliveryType}
      />
    </>
  );
}

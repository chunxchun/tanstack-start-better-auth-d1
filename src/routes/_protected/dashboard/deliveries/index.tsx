import { getDeliveryColumns } from "@/components/delivery/dataTables/deliveryColumns";
import { DataTable } from "@/components/delivery/dataTables/deliveryDataTable";
import CreateDeliveryDialog from "@/components/delivery/dialogs/CreateDeliveryDialog";
import DeleteDeliveryDialog from "@/components/delivery/dialogs/DeleteDeliveryDialog";
import EditDeliveryDialog from "@/components/delivery/dialogs/EditDeliveryDialog";
import ViewDeliveryDialog from "@/components/delivery/dialogs/ViewDeliveryDialog";
import { Button } from "@/components/ui/button";
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
import { type ChangeEvent, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/dashboard/deliveries/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [deliveries, locations, machines, shops] = await Promise.all([
      listDeliveryFn({ data: deps }),
      listLocationFn({ data: { limit: 100, offset: 0 } }),
      listMachineFn({ data: { limit: 100, offset: 0 } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { deliveries, locations, machines, shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { deliveries, locations, machines, shops } = Route.useLoaderData();
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
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = deliveries.length === limit;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const goToPreviousPage = () => {
    if (!hasPreviousPage) return;
    updatePagination({
      limit,
      offset: Math.max(0, offset - limit),
    });
  };

  const goToNextPage = () => {
    if (!hasNextPage) return;
    updatePagination({
      limit,
      offset: offset + limit,
    });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLimit = Number(event.target.value);

    updatePagination({
      limit: nextLimit,
      offset: 0,
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
      await createDeliveryFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create delivery:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateDeliveryType) => {
    if (!selectedDelivery) return;

    try {
      await updateDeliveryByIdFn({ data: values });

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
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <CreateDeliveryDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            shops={shops}
            locations={locations}
            machines={machines}
            onSubmit={handleCreateSubmit}
            onCancel={() => setCreateOpen(false)}
          />
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>

          <div className="flex items-center gap-2">
            <label
              className="text-sm text-muted-foreground"
              htmlFor="delivery-page-size"
            >
              Rows
            </label>
            <select
              id="delivery-page-size"
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousPage}
              disabled={!hasPreviousPage}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={goToNextPage}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={deliveries} />
      </div>

      <ViewDeliveryDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
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

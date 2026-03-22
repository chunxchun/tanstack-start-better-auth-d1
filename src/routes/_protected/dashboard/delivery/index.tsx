import { getDeliveryColumns } from "@/components/delivery/dataTables/deliveryColumns";
import { DataTable } from "@/components/delivery/dataTables/deliveryDataTable";
import { DeliveryForm } from "@/components/delivery/forms/deliveryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  InsertDeliveryType,
  SelectDeliveryType,
  SelectDeliveryType as Delivery,
  UpdateDeliveryType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createDeliveryFn,
  deleteDeliveryByIdFn,
  listDeliveryFn,
  updateDeliveryByIdFn,
} from "@/utils/delivery/delivery.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/dashboard/delivery/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listDeliveryFn({ data: deps }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
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
  const hasNextPage = data.length === limit;

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
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <span>+</span>Create
              </Button>
            </DialogTrigger>
            <DialogContent
              className="min-w-[50vw]"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DeliveryForm
                mode="create"
                onSubmit={handleCreateSubmit}
                onCancel={() => setCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
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

        <DataTable columns={columns} data={data} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DeliveryForm
            mode="view"
            initialData={selectedDelivery as SelectDeliveryType}
            onCancel={() => {
              setViewOpen(false);
              setSelectedDelivery(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DeliveryForm
            mode="edit"
            initialData={selectedDelivery as UpdateDeliveryType}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedDelivery(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedDelivery(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete delivery</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedDelivery
                ? ` delivery #${selectedDelivery.id}`
                : " this delivery"}
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedDelivery(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

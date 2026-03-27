import { getDisposeColumns } from "@/components/dispose/dataTables/disposeColumns";
import { DataTable } from "@/components/dispose/dataTables/disposeDataTable";
import { DisposeForm } from "@/components/dispose/forms/disposeForm";
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
  SelectDisposeType as Dispose,
  InsertDisposeType,
  SelectDisposeType,
  UpdateDisposeType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createDisposeFn,
  deleteDisposeByIdFn,
  listDisposeFn,
  updateDisposeByIdFn,
} from "@/utils/dispose/dispose.function";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { listMachineFn } from "@/utils/machine/machine.function";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/dashboard/disposes/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [disposes, shops, foodItems, machines] = await Promise.all([
      listDisposeFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0 } }),
      listMachineFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { disposes, shops, foodItems, machines };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { disposes, shops, foodItems, machines } = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDispose, setSelectedDispose] = useState<Dispose | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = disposes.length === limit;

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
      getDisposeColumns({
        onView: (dispose) => {
          setSelectedDispose(dispose);
          setViewOpen(true);
        },
        onEdit: (dispose) => {
          setSelectedDispose(dispose);
          setEditOpen(true);
        },
        onDelete: (dispose) => {
          setSelectedDispose(dispose);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (values: InsertDisposeType) => {
    try {
      await createDisposeFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create dispose:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateDisposeType) => {
    if (!selectedDispose) return;

    try {
      await updateDisposeByIdFn({ data: values });
      setEditOpen(false);
      setSelectedDispose(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update dispose:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDispose) return;

    try {
      await deleteDisposeByIdFn({ data: { id: selectedDispose.id } });
      setDeleteOpen(false);
      setSelectedDispose(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete dispose:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dispose</h1>
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
              <DisposeForm
                mode="create"
                shops={shops}
                foodItems={foodItems}
                machines={machines}
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
              htmlFor="dispose-page-size"
            >
              Rows
            </label>
            <select
              id="dispose-page-size"
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

        <DataTable columns={columns} data={disposes} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedDispose(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DisposeForm
            mode="view"
            initialData={selectedDispose as SelectDisposeType}
            onCancel={() => {
              setViewOpen(false);
              setSelectedDispose(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedDispose(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DisposeForm
            mode="edit"
            initialData={selectedDispose as UpdateDisposeType}
            shops={shops}
            foodItems={foodItems}
            machines={machines}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedDispose(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedDispose(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete dispose</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedDispose ? ` dispose #${selectedDispose.id}` : " this dispose"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedDispose(null);
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

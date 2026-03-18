import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodItemForm } from "@/components/forms/foodItemForm";
import type { SelectFoodItem as FoodItem } from "@/db/schema";
import {
  createFoodItemFn,
  deleteFoodItemByIdFn,
  listFoodItemFn,
  updateFoodItemByIdFn,
} from "@/utils/foodItem/foodItem.function";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import * as z from "zod";
import { DataTable } from "@/components/dataTables/foodItem/foodItemDataTable";
import { getFoodItemColumns } from "@/components/dataTables/foodItem/foodItemColumns";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const Route = createFileRoute("/_protected/dashboard/food-item/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listFoodItemFn({ data: deps }),
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
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = data.length === limit;

  const columns = useMemo(
    () =>
      getFoodItemColumns({
        onView: (foodItem) => {
          setSelectedFoodItem(foodItem);
          setViewOpen(true);
        },
        onEdit: (foodItem) => {
          setSelectedFoodItem(foodItem);
          setEditOpen(true);
        },
        onDelete: (foodItem) => {
          setSelectedFoodItem(foodItem);
          setDeleteOpen(true);
        },
      }),
    [],
  );

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

  const handleCreateSubmit = async (values: Omit<FoodItem, "id" | "createdAt" | "updatedAt">) => {
    try {
      await createFoodItemFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create food item:", error);
    }
  };

  const handleEditSubmit = async (values: Omit<FoodItem, "id" | "createdAt" | "updatedAt">) => {
    if (!selectedFoodItem) return;

    try {
      await updateFoodItemByIdFn({
        data: {
          id: selectedFoodItem.id,
          ...values,
        },
      });

      setEditOpen(false);
      setSelectedFoodItem(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update food item:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFoodItem) return;

    try {
      await deleteFoodItemByIdFn({ data: { id: selectedFoodItem.id } });
      setDeleteOpen(false);
      setSelectedFoodItem(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete food item:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <h1 className="mb-6 text-2xl font-bold">Food Items</h1>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">Page {currentPage}</div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="food-item-page-size">
              Rows
            </label>
            <select
              id="food-item-page-size"
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <Button type="button" variant="outline" onClick={goToPreviousPage} disabled={!hasPreviousPage}>
              Previous
            </Button>
            <Button type="button" variant="outline" onClick={goToNextPage} disabled={!hasNextPage}>
              Next
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Food Item</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <FoodItemForm
            mode="create"
            onSubmit={handleCreateSubmit}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <FoodItemForm
            mode="view"
            initialData={selectedFoodItem ?? undefined}
            onCancel={() => {
              setViewOpen(false);
              setSelectedFoodItem(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <FoodItemForm
            mode="edit"
            initialData={selectedFoodItem ?? undefined}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedFoodItem(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete food item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedFoodItem ? ` ${selectedFoodItem.name}` : " this food item"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedFoodItem(null);
              }}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

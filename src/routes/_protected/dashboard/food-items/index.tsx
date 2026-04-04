import { getFoodItemColumns } from "@/components/foodItem/dataTables/foodItemColumns";
import { DataTable } from "@/components/foodItem/dataTables/foodItemDataTable";
import CreateFoodItemDialog from "@/components/foodItem/dialogs/CreateFoodItemDialog";
import DeleteFoodItemDialog from "@/components/foodItem/dialogs/DeleteFoodItemDialog";
import EditFoodItemDialog from "@/components/foodItem/dialogs/EditFoodItemDialog";
import ViewFoodItemDialog from "@/components/foodItem/dialogs/ViewFoodItemDialog";
import { Button } from "@/components/ui/button";
import type {
  SelectFoodItemType as FoodItem,
  InsertFoodItemType,
  SelectFoodItemType,
  UpdateFoodItemType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  deleteFoodItemByIdFn,
  listFoodItemFn,
  updateFoodItemByIdFn,
} from "@/utils/foodItem/foodItem.function";
import {
  foodItemHandleCreateSubmit,
  foodItemHandleUpdateSubmit,
} from "@/utils/foodItem/foodItem.helper";
import { listShopFn } from "@/utils/shop/shop.function";
// import { getImageUrl } from "@/utils/user/user.helper";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected/dashboard/food-items/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [foodItems, shops] = await Promise.all([
      listFoodItemFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { foodItems, shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { foodItems, shops } = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(
    null,
  );

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = foodItems.length === limit;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev: any) => ({
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

  const handleCreateSubmit = async (
    values: InsertFoodItemType,
    image: File | null = null,
    shopId: string | number | null = null,
  ) => {
    try {
      await foodItemHandleCreateSubmit(values, image, shopId);
      setSelectedFoodItem(null);
      toast.success("Food item created successfully");
    } catch (error) {
      console.error("Failed to create food item:", error);
      toast.error("Failed to create food item");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (
    values: UpdateFoodItemType,
    image: File | null = null,
    shopId: string | number | null = null,
  ) => {
    if (!selectedFoodItem) return;

    try {
      const parsedValues = { ...values, shopId: Number(values.shopId) };
      await foodItemHandleUpdateSubmit(parsedValues, image, shopId);
      setSelectedFoodItem(null);
      toast.success("Food item updated successfully");
    } catch (error) {
      console.error("Failed to update food item:", error);
      toast.error("Failed to update food item");
    } finally {
      setEditOpen(false);
      await router.invalidate();
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Food Items</h1>
          <CreateFoodItemDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            shops={shops}
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
              htmlFor="food-item-page-size"
            >
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

        <DataTable columns={columns} data={foodItems} />
      </div>

      <ViewFoodItemDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
        initialData={selectedFoodItem as SelectFoodItemType}
        onCancel={() => {
          setViewOpen(false);
          setSelectedFoodItem(null);
        }}
      />

      <EditFoodItemDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
        initialData={selectedFoodItem as SelectFoodItemType}
        shops={shops}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedFoodItem(null);
        }}
      />

      <DeleteFoodItemDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
        data={selectedFoodItem as SelectFoodItemType}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedFoodItem(null);
        }}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
}

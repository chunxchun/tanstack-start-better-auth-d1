import { getFoodItemColumns } from "@/components/foodItem/dataTables/foodItemColumns";
import { DataTable } from "@/components/foodItem/dataTables/foodItemDataTable";
import CreateFoodItemDialog from "@/components/foodItem/dialogs/CreateFoodItemDialog";
import DeleteFoodItemDialog from "@/components/foodItem/dialogs/DeleteFoodItemDialog";
import EditFoodItemDialog from "@/components/foodItem/dialogs/EditFoodItemDialog";
import ViewFoodItemDialog from "@/components/foodItem/dialogs/ViewFoodItemDialog";
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
} from "@/utils/foodItem/foodItem.function";
import {
  foodItemHandleCreateSubmit,
  foodItemHandleUpdateSubmit,
} from "@/utils/foodItem/foodItem.helper";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/food-items/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [foodItems, shops] = await Promise.all([
      listFoodItemFn({
        data: { ...deps, shopId },
      }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { foodItems, shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { foodItems, shops, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;
  
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

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
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
      <RouteLayout>
        <RouteHeader title="Food Items" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={foodItems}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={foodItems as SelectFoodItemType[]} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateFoodItemDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        shops={shops}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewFoodItemDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedFoodItem(null);
        }}
        shops={shops} 
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
        defaultShopId={defaultShopId}
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

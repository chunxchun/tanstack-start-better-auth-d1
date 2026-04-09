import { getInventoryColumns } from "@/components/inventory/dataTables/inventoryColumns";
import { DataTable } from "@/components/inventory/dataTables/inventoryDataTable";
import type {
  InsertInventoryType,
  SelectInventoryType as Inventory,
  SelectInventoryType,
  UpdateInventoryType,
} from "@/db/schema";
import {
  createInventoryFn,
  deleteInventoryByIdFn,
  listInventoryFn,
  updateInventoryByIdFn,
} from "@/utils/inventory/inventory.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";

import CreateInventoryDialog from "@/components/inventory/dialogs/CreateInventoryDialog";
import DeleteInventoryDialog from "@/components/inventory/dialogs/DeleteInventoryDialog";
import EditInventoryDialog from "@/components/inventory/dialogs/EditInventoryDialog";
import ViewInventoryDialog from "@/components/inventory/dialogs/ViewInventoryDialog";
import { searchSchema } from "@/db/schema/commonSchema";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { listMachineFn } from "@/utils/machine/machine.function";
import { listShopFn } from "@/utils/shop/shop.function";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/inventories/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [inventories, shops, foodItems, machines] = await Promise.all([
      listInventoryFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0, shopId } }),
      listMachineFn({ data: { limit: 100, offset: 0, shopId } }),
    ]);
    return { inventories, shops, foodItems, machines, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { inventories, shops, foodItems, machines, user } =
    Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
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
      getInventoryColumns({
        onView: (inventory) => {
          setSelectedInventory(inventory);
          setViewOpen(true);
        },
        onEdit: (inventory) => {
          setSelectedInventory(inventory);
          setEditOpen(true);
        },
        onDelete: (inventory) => {
          setSelectedInventory(inventory);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (values: InsertInventoryType) => {
    try {
      const inventory = {
        ...values,
        shopId: Number(values.shopId),
        machineId: Number(values.machineId),
        foodItemId: Number(values.foodItemId),
      };
      await createInventoryFn({ data: inventory });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create inventory:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateInventoryType) => {
    if (!selectedInventory) return;

    try {
      const inventory = {
        ...values,
        shopId: Number(values.shopId),
        machineId: Number(values.machineId),
        foodItemId: Number(values.foodItemId),
      };
      await updateInventoryByIdFn({ data: inventory });

      setEditOpen(false);
      setSelectedInventory(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedInventory) return;

    try {
      await deleteInventoryByIdFn({ data: { id: selectedInventory.id } });
      setDeleteOpen(false);
      setSelectedInventory(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete inventory:", error);
    }
  };

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Inventories" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={inventories}
          updatePagination={updatePagination}
        />

        <DataTable columns={columns} data={inventories} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateInventoryDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        shops={shops}
        foodItems={foodItems}
        machines={machines}
        defaultShopId={defaultShopId}
      />

      <ViewInventoryDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedInventory(null);
        }}
        shops={shops}
        foodItems={foodItems}
        machines={machines}
        onCancel={() => {
          setViewOpen(false);
          setSelectedInventory(null);
        }}
        initialData={selectedInventory as SelectInventoryType}
      />

      <EditInventoryDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedInventory(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedInventory(null);
        }}
        initialData={selectedInventory as SelectInventoryType}
        shops={shops}
        foodItems={foodItems}
        machines={machines}
        defaultShopId={defaultShopId}
      />

      <DeleteInventoryDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedInventory(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedInventory(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedInventory as SelectInventoryType}
      />
    </>
  );
}

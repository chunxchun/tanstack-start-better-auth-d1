import { getInventoryColumns } from "@/components/inventory/dataTables/inventoryColumns";
import { DataTable } from "@/components/inventory/dataTables/inventoryDataTable";
import { Button } from "@/components/ui/button";
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
import { type ChangeEvent, useMemo, useState } from "react";

import CreateInventoryDialog from "@/components/inventory/dialogs/CreateInventoryDialog";
import DeleteInventoryDialog from "@/components/inventory/dialogs/DeleteInventoryDialog";
import EditInventoryDialog from "@/components/inventory/dialogs/EditInventoryDialog";
import ViewInventoryDialog from "@/components/inventory/dialogs/ViewInventoryDialog";
import { searchSchema } from "@/db/schema/commonSchema";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { listMachineFn } from "@/utils/machine/machine.function";
import { listShopFn } from "@/utils/shop/shop.function";

export const Route = createFileRoute("/_protected/dashboard/inventories/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [inventories, shops, foodItems, machines] = await Promise.all([
      listInventoryFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0 } }),
      listMachineFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { inventories, shops, foodItems, machines };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { inventories, shops, foodItems, machines } = Route.useLoaderData();
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
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = inventories.length === limit;

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
      await createInventoryFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create inventory:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateInventoryType) => {
    if (!selectedInventory) return;

    try {
      await updateInventoryByIdFn({ data: values });

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
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <CreateInventoryDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            onSubmit={handleCreateSubmit}
            onCancel={() => setCreateOpen(false)}
            shops={shops}
            foodItems={foodItems}
            machines={machines}
          />
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>

          <div className="flex items-center gap-2">
            <label
              className="text-sm text-muted-foreground"
              htmlFor="inventory-page-size"
            >
              Rows
            </label>
            <select
              id="inventory-page-size"
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

        <DataTable columns={columns} data={inventories} />
      </div>

      <ViewInventoryDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedInventory(null);
        }}
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

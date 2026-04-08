import { getDisposeColumns } from "@/components/dispose/dataTables/disposeColumns";
import { DataTable } from "@/components/dispose/dataTables/disposeDataTable";
import CreateDisposeDialog from "@/components/dispose/dialogs/CreateDisposeDialog";
import DeleteDisposeDialog from "@/components/dispose/dialogs/DeleteDisposeDialog";
import EditDisposeDialog from "@/components/dispose/dialogs/EditDisposeDialog";
import ViewDisposeDialog from "@/components/dispose/dialogs/ViewDisposeDialog";
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
import { useMemo, useState } from "react";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/disposes/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [disposes, shops, foodItems, machines] = await Promise.all([
      listDisposeFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0, shopId } }),
      listMachineFn({ data: { limit: 100, offset: 0, shopId } }),
    ]);
    return { disposes, shops, foodItems, machines, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { disposes, shops, foodItems, machines, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDispose, setSelectedDispose] = useState<Dispose | null>(null);

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
      const dispose = {
        ...values,
        shopId: Number(values.shopId),
        machineId: Number(values.machineId),
        foodItemId: Number(values.foodItemId),
      };
      await createDisposeFn({ data: dispose });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create dispose:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateDisposeType) => {
    if (!selectedDispose) return;

    try {
      const dispose = {
        ...values,
        shopId: Number(values.shopId),
        machineId: Number(values.machineId),
        foodItemId: Number(values.foodItemId),
      };
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
      <RouteLayout>
        <RouteHeader title="Dispose" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={disposes}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={disposes as SelectDisposeType[]} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateDisposeDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        shops={shops}
        foodItems={foodItems}
        machines={machines}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewDisposeDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedDispose(null);
        }}
        onCancel={() => {
          setViewOpen(false);
          setSelectedDispose(null);
        }}
        initialData={selectedDispose as SelectDisposeType}
      />

      <EditDisposeDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedDispose(null);
        }}
        onCancel={() => {
          setEditOpen(false);
          setSelectedDispose(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={selectedDispose as SelectDisposeType}
        shops={shops}
        foodItems={foodItems}
        machines={machines}
        defaultShopId={defaultShopId}
      />

      <DeleteDisposeDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedDispose(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedDispose(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedDispose as SelectDisposeType}
      />
    </>
  );
}

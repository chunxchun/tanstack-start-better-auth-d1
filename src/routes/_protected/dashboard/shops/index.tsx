import { getShopColumns } from "@/components/shop/dataTables/shopColumns";
import { DataTable } from "@/components/shop/dataTables/shopDataTable";
import CreateShopDialog from "@/components/shop/dialogs/CreateShopDialog";
import DeleteShopDialog from "@/components/shop/dialogs/DeleteShopDialog";
import EditShopDialog from "@/components/shop/dialogs/EditShopDialog";
import ViewShopDialog from "@/components/shop/dialogs/ViewShopDialog";
import { Button } from "@/components/ui/button";
import type {
  InsertShopType,
  SelectShopType,
  SelectShopType as Shop,
  UpdateShopType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import { deleteShopByIdFn, listShopFn } from "@/utils/shop/shop.function";
import {
  shopHandleCreateSubmit,
  shopHandleUpdateSubmit,
} from "@/utils/shop/shop.helper";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import RouteHeader from "../-shared/routerHeader";
import DataTableNavigator from "../-shared/data-table-navigator";
import CreateButton from "../-shared/createButton";
import RouteLayout from "../-shared/routeLayout";

export const Route = createFileRoute("/_protected/dashboard/shops/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const shops = await listShopFn({ data: { ...deps, shopId } });
    return { shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { shops, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

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
      getShopColumns({
        rowNumberOffset: offset,
        onView: (shop) => {
          setSelectedShop(shop);
          setViewOpen(true);
        },
        onEdit: (shop) => {
          setSelectedShop(shop);
          setEditOpen(true);
        },
        onDelete: (shop) => {
          setSelectedShop(shop);
          setDeleteOpen(true);
        },
      }),
    [offset],
  );

  const handleCreateSubmit = async (
    values: InsertShopType,
    banner: File | null = null,
    logo: File | null = null,
  ) => {
    try {
      await shopHandleCreateSubmit(values, banner, logo);
      setSelectedShop(null);
      toast.success("Shop created successfully");
    } catch (error) {
      console.error("Failed to create shop:", error);
      toast.error("Failed to create shop");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (
    values: UpdateShopType,
    banner: File | null = null,
    logo: File | null = null,
  ) => {
    if (!selectedShop) return;

    try {
      await shopHandleUpdateSubmit(values, banner, logo);
      setSelectedShop(null);
      toast.success("Shop updated successfully");
    } catch (error) {
      console.error("Failed to update shop:", error);
      toast.error("Failed to update shop");
    } finally {
      setEditOpen(false);
      await router.invalidate();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedShop) return;

    try {
      await deleteShopByIdFn({ data: { id: selectedShop.id } });
      toast.success("Shop deleted successfully");
    } catch (error) {
      console.error("Failed to delete shop:", error);
      toast.error("Failed to delete shop");
    } finally {
      setDeleteOpen(false);
      setSelectedShop(null);
      await router.invalidate();
    }
  };

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Shops" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={shops}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={shops} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateShopDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewShopDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedShop(null);
        }}
        onCancel={() => {
          setViewOpen(false);
          setSelectedShop(null);
        }}
        initialData={selectedShop as SelectShopType}
      />

      <EditShopDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedShop(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedShop(null);
        }}
        initialData={selectedShop as SelectShopType}
        defaultShopId={defaultShopId}
      />

      <DeleteShopDialog
        open={deleteOpen}
        onOpenChange={(open: boolean) => {
          setDeleteOpen(open);
          if (!open) setSelectedShop(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedShop(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedShop as SelectShopType}
      />
    </>
  );
}

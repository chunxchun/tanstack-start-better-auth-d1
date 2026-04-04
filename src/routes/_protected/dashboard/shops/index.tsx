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

export const Route = createFileRoute("/_protected/dashboard/shops/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listShopFn({ data: deps }),
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
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = data.length === limit;

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
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shops</h1>
          <CreateShopDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
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
              htmlFor="shop-page-size"
            >
              Rows
            </label>
            <select
              id="shop-page-size"
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

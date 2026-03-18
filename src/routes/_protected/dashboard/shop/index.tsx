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
import { ShopForm } from "@/components/forms/shopForm";
import type { SelectShop as Shop } from "@/db/schema";
import {
  createShopFn,
  deleteShopByIdFn,
  listShopFn,
  updateShopByIdFn,
} from "@/utils/shop/shop.function";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import * as z from "zod";
import { DataTable } from "@/components/dataTables/shop/shopDataTable";
import { getShopColumns } from "@/components/dataTables/shop/shopColumns";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

// const { fieldContext, formContext } = createFormHookContexts();

// const { useAppForm } = createFormHook({
//   fieldComponents: {
//     TextField,
//     NumberField,
//   },
//   formComponents: {
//     SubmitButton,
//   },
//   fieldContext,
//   formContext,
// });

export const Route = createFileRoute("/_protected/dashboard/shop/")({
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
      getShopColumns({
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
    [],
  );

  const handleCreateSubmit = async (values: {
    name: string;
    logoUrl: string | null;
  }) => {
    try {
      await createShopFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create shop:", error);
    }
  };

  const handleEditSubmit = async (values: {
    name: string;
    logoUrl: string | null;
  }) => {
    if (!selectedShop) return;

    try {
      await updateShopByIdFn({
        data: {
          id: selectedShop.id,
          name: values.name,
          logoUrl: values.logoUrl,
        },
      });

      setEditOpen(false);
      setSelectedShop(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update shop:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedShop) return;

    try {
      await deleteShopByIdFn({ data: { id: selectedShop.id } });
      setDeleteOpen(false);
      setSelectedShop(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete shop:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <h1 className="mb-6 text-2xl font-bold">Shops</h1>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="shop-page-size">
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

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Shop</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <ShopForm
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
          if (!open) setSelectedShop(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <ShopForm
            mode="view"
            initialData={selectedShop ?? undefined}
            onCancel={() => {
              setViewOpen(false);
              setSelectedShop(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedShop(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <ShopForm
            mode="edit"
            initialData={selectedShop ?? undefined}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedShop(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedShop(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete shop</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedShop ? ` ${selectedShop.name}` : " this shop"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedShop(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

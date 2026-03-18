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
import { SaleForm } from "@/components/forms/saleForm";
import type { SelectSale as Sale } from "@/db/schema";
import {
  createSaleFn,
  deleteSaleByIdFn,
  listSaleFn,
  updateSaleByIdFn,
} from "@/utils/sale/sale.function";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import * as z from "zod";
import { DataTable } from "@/components/dataTables/sale/saleDataTable";
import { getSaleColumns } from "@/components/dataTables/sale/saleColumns";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const Route = createFileRoute("/_protected/dashboard/sale/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listSaleFn({ data: deps }),
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
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = data.length === limit;

  const columns = useMemo(
    () =>
      getSaleColumns({
        onView: (sale) => {
          setSelectedSale(sale);
          setViewOpen(true);
        },
        onEdit: (sale) => {
          setSelectedSale(sale);
          setEditOpen(true);
        },
        onDelete: (sale) => {
          setSelectedSale(sale);
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

  const handleCreateSubmit = async (values: Omit<Sale, "id" | "createdAt" | "updatedAt">) => {
    try {
      await createSaleFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create sale:", error);
    }
  };

  const handleEditSubmit = async (values: Omit<Sale, "id" | "createdAt" | "updatedAt">) => {
    if (!selectedSale) return;

    try {
      await updateSaleByIdFn({
        data: {
          id: selectedSale.id,
          ...values,
        },
      });

      setEditOpen(false);
      setSelectedSale(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update sale:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSale) return;

    try {
      await deleteSaleByIdFn({ data: { id: selectedSale.id } });
      setDeleteOpen(false);
      setSelectedSale(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete sale:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <h1 className="mb-6 text-2xl font-bold">Sales</h1>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">Page {currentPage}</div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="sale-page-size">
              Rows
            </label>
            <select
              id="sale-page-size"
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
          <Button variant="outline">Create Sale</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <SaleForm
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
          if (!open) setSelectedSale(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <SaleForm
            mode="view"
            initialData={selectedSale ?? undefined}
            onCancel={() => {
              setViewOpen(false);
              setSelectedSale(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedSale(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <SaleForm
            mode="edit"
            initialData={selectedSale ?? undefined}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedSale(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedSale(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete sale</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedSale ? ` sale #${selectedSale.id}` : " this sale"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedSale(null);
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

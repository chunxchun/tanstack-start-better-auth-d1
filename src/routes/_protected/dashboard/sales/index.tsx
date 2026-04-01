import { getSaleColumns } from "@/components/sale/dataTables/saleColumns";
import { DataTable } from "@/components/sale/dataTables/saleDataTable";
import CreateSaleDialog from "@/components/sale/dialogs/CreateSaleDialog";
import DeleteSaleDialog from "@/components/sale/dialogs/DeleteSaleDialog";
import EditSaleDialog from "@/components/sale/dialogs/EditSaleDialog";
import ViewSaleDialog from "@/components/sale/dialogs/ViewSaleDialog";
import { Button } from "@/components/ui/button";
import type {
  InsertSaleType,
  SelectSaleType as Sale,
  SelectSaleType,
  UpdateSaleType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { listMachineFn } from "@/utils/machine/machine.function";
import {
  createSaleFn,
  deleteSaleByIdFn,
  listSaleFn,
  updateSaleByIdFn,
} from "@/utils/sale/sale.function";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/dashboard/sales/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [sales, shops, machines, foodItems] = await Promise.all([
      listSaleFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listMachineFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { sales, shops, machines, foodItems };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { sales, shops, machines, foodItems } = Route.useLoaderData();
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
  const hasNextPage = sales.length === limit;

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

  const handleCreateSubmit = async (values: InsertSaleType) => {
    try {
      await createSaleFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create sale:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateSaleType) => {
    if (!selectedSale) return;

    try {
      await updateSaleByIdFn({ data: values });
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sales</h1>
          <CreateSaleDialog
            open={createOpen}
            shops={shops}
            machines={machines}
            foodItems={foodItems}
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
              htmlFor="sale-page-size"
            >
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

        <DataTable columns={columns} data={sales} />
      </div>

      <ViewSaleDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedSale(null);
        }}
        initialData={selectedSale as SelectSaleType}
        onCancel={() => {
          setViewOpen(false);
          setSelectedSale(null);
        }}
      />

      <EditSaleDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedSale(null);
        }}
        initialData={selectedSale as SelectSaleType}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedSale(null);
        }}
        shops={shops}
        machines={machines}
        foodItems={foodItems}
      />

      <DeleteSaleDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedSale(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedSale(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedSale as SelectSaleType}
      />
    </>
  );
}

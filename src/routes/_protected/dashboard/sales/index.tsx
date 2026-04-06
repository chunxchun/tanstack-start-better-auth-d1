import { getSaleColumns } from "@/components/sale/dataTables/saleColumns";
import { DataTable } from "@/components/sale/dataTables/saleDataTable";
import CreateSaleDialog from "@/components/sale/dialogs/CreateSaleDialog";
import DeleteSaleDialog from "@/components/sale/dialogs/DeleteSaleDialog";
import EditSaleDialog from "@/components/sale/dialogs/EditSaleDialog";
import ViewSaleDialog from "@/components/sale/dialogs/ViewSaleDialog";
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
import { useMemo, useState } from "react";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/sales/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [sales, shops, machines, foodItems] = await Promise.all([
      listSaleFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listMachineFn({ data: { limit: 100, offset: 0, shopId } }),
      listFoodItemFn({ data: { limit: 100, offset: 0, shopId } }),
    ]);
    return { sales, shops, machines, foodItems, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { sales, shops, machines, foodItems, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

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
      <RouteLayout>
        <RouteHeader title="Sales" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={sales}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={sales} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateSaleDialog
        open={createOpen}
        shops={shops}
        machines={machines}
        foodItems={foodItems}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

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
        defaultShopId={defaultShopId}
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

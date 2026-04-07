import { getLocationColumns } from "@/components/location/dataTables/locationColumns";
import { DataTable } from "@/components/location/dataTables/locationDataTable";
import CreateLocationDialog from "@/components/location/dialogs/CreateLocationDialog";
import DeleteLocationDialog from "@/components/location/dialogs/DeleteLocationDialog";
import EditLocationDialog from "@/components/location/dialogs/EditLocationDialog";
import ViewLocationDialog from "@/components/location/dialogs/ViewLocationDialog";
import type {
  InsertLocationType,
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createLocationFn,
  deleteLocationByIdFn,
  listLocationFn,
  updateLocationByIdFn,
} from "@/utils/location/location.function";
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

export const Route = createFileRoute("/_protected/dashboard/locations/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [locations, shops] = await Promise.all([
      listLocationFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { locations, shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { locations, shops, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState<SelectLocationType | null>(null);

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
      getLocationColumns({
        onView: (location) => {
          setSelectedLocation(location);
          setViewOpen(true);
        },
        onEdit: (location) => {
          setSelectedLocation(location);
          setEditOpen(true);
        },
        onDelete: (location) => {
          setSelectedLocation(location);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (values: InsertLocationType) => {
    try {
      const parsedValues = { ...values, shopId: Number(values.shopId) };
      const result = await createLocationFn({ data: parsedValues });
      if (!result || result.length === 0) {
        throw new Error("Failed to create location: No result returned");
      }
      toast.success("Location created successfully");
    } catch (error) {
      console.error("Failed to create location:", error);
      toast.error("Failed to create location");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (values: UpdateLocationType) => {
    if (!selectedLocation) return;

    try {
      const parsedValues = { ...values, shopId: Number(values.shopId) };
      const result = await updateLocationByIdFn({ data: parsedValues });

      if (!result || result.length === 0) {
        throw new Error("Failed to update location: No result returned");
      }

      toast.success("Location updated successfully");
    } catch (error) {
      console.error("Failed to update location:", error);
      toast.error("Failed to update location");
    } finally {
      setEditOpen(false);
      setSelectedLocation(null);
      await router.invalidate();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLocation) return;

    try {
      await deleteLocationByIdFn({ data: { id: selectedLocation.id } });
      toast.success("Location deleted successfully");
    } catch (error) {
      console.error("Failed to delete location:", error);
      toast.error("Failed to delete location");
    } finally {
      setDeleteOpen(false);
      setSelectedLocation(null);
      await router.invalidate();
    }
  };

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Locations" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={locations}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={locations} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateLocationDialog
        open={createOpen}
        shops={shops}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />
      
      <ViewLocationDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedLocation(null);
        }}
        onCancel={() => {
          setSelectedLocation(null);
          setViewOpen(false);
        }}
        initialData={selectedLocation as SelectLocationType}
      />

      <EditLocationDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedLocation(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedLocation(null);
        }}
        shops={shops}
        initialData={selectedLocation as SelectLocationType}
        defaultShopId={defaultShopId}
      />

      <DeleteLocationDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedLocation(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedLocation(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedLocation as SelectLocationType}
      />
    </>
  );
}

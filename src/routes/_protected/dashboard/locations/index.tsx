import { getLocationColumns } from "@/components/location/dataTables/locationColumns";
import { DataTable } from "@/components/location/dataTables/locationDataTable";
import CreateLocationDialog from "@/components/location/dialogs/CreateLocationDialog";
import DeleteLocationDialog from "@/components/location/dialogs/DeleteLocationDialog";
import EditLocationDialog from "@/components/location/dialogs/EditLocationDialog";
import ViewLocationDialog from "@/components/location/dialogs/ViewLocationDialog";
import { Button } from "@/components/ui/button";
import type {
  InsertLocationType,
  SelectLocationType as Location,
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
import { type ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected/dashboard/locations/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [locations, shops] = await Promise.all([
      listLocationFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { locations, shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { locations, shops } = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = locations.length === limit;

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
      await createLocationFn({ data: values });
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
      const result = await updateLocationByIdFn({ data: values });

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
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Locations</h1>
          <CreateLocationDialog
            open={createOpen}
            shops={shops}
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
              htmlFor="location-page-size"
            >
              Rows
            </label>
            <select
              id="location-page-size"
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

        <DataTable columns={columns} data={locations} />
      </div>

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
        location={selectedLocation as SelectLocationType}
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
        location={selectedLocation as SelectLocationType}
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
        location={selectedLocation as SelectLocationType}
      />
    </>
  );
}

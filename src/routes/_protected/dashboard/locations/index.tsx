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
import { LocationForm } from "@/components/forms/locationForm";
import type { SelectLocationType as Location, LocationStatus } from "@/db/schema";
import {
  createLocationFn,
  deleteLocationByIdFn,
  listLocationFn,
  updateLocationByIdFn,
} from "@/utils/location/location.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import * as z from "zod";
import { DataTable } from "@/components/dataTables/location/locationDataTable";
import { getLocationColumns } from "@/components/dataTables/location/locationColumns";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const Route = createFileRoute("/_protected/dashboard/locations/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listLocationFn({ data: deps }),
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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  ); // LocationWithAddress

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

  type LocationFormValues = {
    name: string;
    description: string | null;
    status: LocationStatus;
    addressLine1: string;
    addressLine2?: string | null;
    addressCity: string;
    addressState?: string | null;
    addressPostalCode?: string | null;
    addressCountry: string;
  };
 
  const handleCreateSubmit = async (values: LocationFormValues) => {
    try {
      await createLocationFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create location:", error);
    }
  };

  const handleEditSubmit = async (values: LocationFormValues) => {
    if (!selectedLocation) return;

    try {
      await updateLocationByIdFn({
        data: {
          id: selectedLocation.id,
          ...values,
        },
      });

      setEditOpen(false);
      setSelectedLocation(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedLocation) return;

    try {
      await deleteLocationByIdFn({ data: { id: selectedLocation.id } });
      setDeleteOpen(false);
      setSelectedLocation(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Locations</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <span>+</span> Create
              </Button>
            </DialogTrigger>
            <DialogContent
              className="min-w-[50vw]"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <LocationForm
                mode="create"
                onSubmit={handleCreateSubmit}
                onCancel={() => setCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
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

        <DataTable columns={columns} data={data as Location[]} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedLocation(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <LocationForm
            mode="view"
            initialData={selectedLocation ?? undefined}
            onCancel={() => {
              setViewOpen(false);
              setSelectedLocation(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedLocation(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <LocationForm
            mode="edit"
            initialData={selectedLocation ?? undefined}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedLocation(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedLocation(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Delete location</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedLocation
                ? ` ${selectedLocation.name}`
                : " this location"}
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedLocation(null);
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

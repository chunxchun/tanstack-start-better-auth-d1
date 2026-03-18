import { getMachineColumns } from "@/components/dataTables/machine/machineColumns";
import { DataTable } from "@/components/dataTables/machine/machineDataTable";
import { LocationForm } from "@/components/forms/location/locationForm";
import { MachineForm } from "@/components/forms/machine/machineForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  InsertLocationType,
  InsertMachineType,
  SelectLocationType as Location,
  SelectMachineType as Machine,
  SelectMachineType,
  SelectShopType as Shop,
  UpdateMachineType,
} from "@/db/schema";
import {
  createLocationFn,
  listLocationFn,
} from "@/utils/location/location.function";
import {
  createMachineFn,
  deleteMachineByIdFn,
  listMachineFn,
  updateMachineByIdFn,
} from "@/utils/machine/machine.function";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";

import { searchSchema } from "@/db/schema/commonSchema";

export const Route = createFileRoute("/_protected/dashboard/machines/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [machines, locations, shops] = await Promise.all([
      listMachineFn({ data: deps }),
      listLocationFn({ data: { limit: 100, offset: 0 } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { machines, locations, shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { machines: data, locations, shops } = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createLocationOpen, setCreateLocationOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

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
      getMachineColumns({
        onView: (machine) => {
          setSelectedMachine(machine);
          setViewOpen(true);
        },
        onEdit: (machine) => {
          setSelectedMachine(machine);
          setEditOpen(true);
        },
        onDelete: (machine) => {
          setSelectedMachine(machine);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (values: InsertMachineType) => {
    try {
      await createMachineFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create machine:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateMachineType) => {
    if (!selectedMachine) return;

    try {
      await updateMachineByIdFn({ data: values });
      setEditOpen(false);
      setSelectedMachine(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update machine:", error);
    }
  };

  const handleCreateLocationSubmit = async (values: InsertLocationType) => {
    try {
      await createLocationFn({ data: values });
      setCreateLocationOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create location:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMachine) return;

    try {
      await deleteMachineByIdFn({ data: { id: selectedMachine.id } });
      setDeleteOpen(false);
      setSelectedMachine(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete machine:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Machines</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <span>+</span>Create
              </Button>
            </DialogTrigger>
            <DialogContent
              className="min-w-[50vw]"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <MachineForm
                mode="create"
                locations={locations as Location[]}
                shops={shops as Shop[]}
                onCreateLocation={() => setCreateLocationOpen(true)}
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
              htmlFor="machine-page-size"
            >
              Rows
            </label>
            <select
              id="machine-page-size"
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

        <DataTable columns={columns} data={data as Machine[]} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedMachine(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <MachineForm
            mode="view"
            initialData={selectedMachine as SelectMachineType}
            onCancel={() => {
              setViewOpen(false);
              setSelectedMachine(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedMachine(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <MachineForm
            mode="edit"
            initialData={selectedMachine as UpdateMachineType}
            locations={locations as Location[]}
            shops={shops as Shop[]}
            onCreateLocation={() => setCreateLocationOpen(true)}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedMachine(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedMachine(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Delete machine</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedMachine ? ` ${selectedMachine.name}` : " this machine"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedMachine(null);
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

      <Dialog open={createLocationOpen} onOpenChange={setCreateLocationOpen}>
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <LocationForm
            mode="create"
            onSubmit={handleCreateLocationSubmit}
            onCancel={() => setCreateLocationOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

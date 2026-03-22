import { getMachineColumns } from "@/components/machine/dataTables/machineColumns";
import { DataTable } from "@/components/machine/dataTables/machineDataTable";
import { Button } from "@/components/ui/button";
import type {
  InsertLocationType,
  InsertMachineType,
  SelectMachineType as Machine,
  SelectMachineType,
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

import CreateMachineDialog from "@/components/machine/dialogs/CreateMachineDialog";
import EditMachineDialog from "@/components/machine/dialogs/EditMachineDialog";
import ViewMachineDialog from "@/components/machine/dialogs/ViewMachineDialog";
import DeleteMachineDialog from "@/components/machine/dialogs/DeleteMachineDialog";
import { searchSchema } from "@/db/schema/commonSchema";
import { toast } from "sonner";

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
  const { machines, locations, shops } = Route.useLoaderData();
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
  const hasNextPage = machines.length === limit;

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
      const result = await createMachineFn({ data: values });
      if (!result || result.length === 0) {
        throw new Error("Failed to create machine: No result returned");
      }
      console.log("Create machine result:", result);
      toast.success("Machine created successfully");
    } catch (error) {
      console.error("Failed to create machine:", error);
      toast.error("Failed to create machine");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (values: UpdateMachineType) => {
    if (!selectedMachine) return;

    try {
      const result = await updateMachineByIdFn({ data: values });

      if (!result || result.length === 0) {
        throw new Error("Failed to update machine: No result returned");
      }

      toast.success("Machine updated successfully");
    } catch (error) {
      console.error("Failed to update machine:", error);
      toast.error("Failed to update machine");
    } finally {
      setEditOpen(false);
      setSelectedMachine(null);
      await router.invalidate();
    }
  };

  const handleCreateLocationSubmit = async (values: InsertLocationType) => {
    try {
      await createLocationFn({ data: values });
      toast.success("Location created successfully");
    } catch (error) {
      console.error("Failed to create location:", error);
      toast.error("Failed to create location");
    } finally {
      setCreateLocationOpen(false);
      await router.invalidate();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMachine) return;

    try {
      await deleteMachineByIdFn({ data: { id: selectedMachine.id } });
      toast.success("Machine deleted successfully");
    } catch (error) {
      console.error("Failed to delete machine:", error);
      toast.error("Failed to delete machine");
    } finally {
      setDeleteOpen(false);
      setSelectedMachine(null);
      await router.invalidate();
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Machines</h1>
          <CreateMachineDialog
            open={createOpen}
            shops={shops}
            locations={locations}
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

        <DataTable columns={columns} data={machines as Machine[]} />
      </div>

      <ViewMachineDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedMachine(null);
        }}
        onCancel={() => {
          setSelectedMachine(null);
          setViewOpen(false);
        }}
        machine={selectedMachine as SelectMachineType}
      />

      <EditMachineDialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedMachine(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedMachine(null);
        }}
        shops={shops}
        locations={locations}
        machine={selectedMachine as SelectMachineType}
      />

      <DeleteMachineDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedMachine(null);
        }}
        onDelete={handleDeleteConfirm}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedMachine(null);
        }}
        machine={selectedMachine as SelectMachineType}
      />
    </>
  );
}

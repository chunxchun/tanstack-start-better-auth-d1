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
import { MachineForm } from "@/components/forms/machineForm";
import type { SelectMachine as Machine } from "@/db/schema";
import {
  createMachineFn,
  deleteMachineByIdFn,
  listMachineFn,
  updateMachineByIdFn,
} from "@/utils/machine/machine.function";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import * as z from "zod";
import { DataTable } from "@/components/dataTables/machine/machineDataTable";
import { getMachineColumns } from "@/components/dataTables/machine/machineColumns";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const Route = createFileRoute("/_protected/dashboard/machines/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listMachineFn({ data: deps }),
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

  const handleCreateSubmit = async (values: {
    locationId: number | null;
    name: string;
    serialNumber: string;
    status: "active" | "inactive" | "maintenance" | null;
    description: string | null;
    installationDate: string;
    startWorkingHour: string;
    closeWorkingHour: string;
  }) => {
    try {
      await createMachineFn({
        data: {
          ...values,
          status: values.status ?? "active",
        },
      });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create machine:", error);
    }
  };

  const handleEditSubmit = async (values: {
    locationId: number | null;
    name: string;
    serialNumber: string;
    status: "active" | "inactive" | "maintenance" | null;
    description: string | null;
    installationDate: string;
    startWorkingHour: string;
    closeWorkingHour: string;
  }) => {
    if (!selectedMachine) return;

    try {
      await updateMachineByIdFn({
        data: {
          id: selectedMachine.id,
          locationId: values.locationId,
          name: values.name,
          serialNumber: values.serialNumber,
          status: values.status ?? "active",
          description: values.description,
          installationDate: values.installationDate,
          startWorkingHour: values.startWorkingHour,
          closeWorkingHour: values.closeWorkingHour,
        },
      });

      setEditOpen(false);
      setSelectedMachine(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update machine:", error);
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
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">Page {currentPage}</div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="machine-page-size">
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
          <Button variant="outline">Create Machine</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <MachineForm
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
          if (!open) setSelectedMachine(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <MachineForm
            mode="view"
            initialData={selectedMachine ?? undefined}
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
        <DialogContent className="sm:max-w-sm">
          <MachineForm
            mode="edit"
            initialData={selectedMachine ?? undefined}
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
        <DialogContent className="sm:max-w-sm">
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
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

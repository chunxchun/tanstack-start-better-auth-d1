import { getMachineColumns } from "@/components/machine/dataTables/machineColumns";
import { DataTable } from "@/components/machine/dataTables/machineDataTable";
import type {
  InsertMachineType,
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema";
import { listLocationFn } from "@/utils/location/location.function";
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
import { useMemo, useState } from "react";

import CreateMachineDialog from "@/components/machine/dialogs/CreateMachineDialog";
import DeleteMachineDialog from "@/components/machine/dialogs/DeleteMachineDialog";
import EditMachineDialog from "@/components/machine/dialogs/EditMachineDialog";
import ViewMachineDialog from "@/components/machine/dialogs/ViewMachineDialog";

import { searchSchema } from "@/db/schema/commonSchema";
import { toast } from "sonner";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/machines/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [machines, locations, shops] = await Promise.all([
      listMachineFn({ data: { ...deps, shopId } }),
      listLocationFn({ data: { limit: 100, offset: 0, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { machines, locations, shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { machines, locations, shops, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedMachine, setSelectedMachine] =
    useState<SelectMachineType | null>(null);

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
      getMachineColumns({
        locations,
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
    [locations],
  );

  const handleCreateSubmit = async (values: InsertMachineType) => {
    try {
      const formattedValues = {
        ...values,
        locationId: values.locationId ? Number(values.locationId) : null,
        shopId: values.shopId ? Number(values.shopId) : null,
      };
      const result = await createMachineFn({ data: formattedValues });
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
      <RouteLayout>
        <RouteHeader title="Machines" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={machines}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={machines as SelectMachineType[]} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateMachineDialog
        open={createOpen}
        shops={shops}
        locations={locations}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewMachineDialog
        open={viewOpen}
        shops={shops}
        locations={locations}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedMachine(null);
        }}
        onCancel={() => {
          setSelectedMachine(null);
          setViewOpen(false);
        }}
        initialData={selectedMachine as SelectMachineType}
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
        initialData={selectedMachine as SelectMachineType}
        defaultShopId={defaultShopId}
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
        data={selectedMachine as SelectMachineType}
      />
    </>
  );
}

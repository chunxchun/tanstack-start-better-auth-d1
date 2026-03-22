import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { SelectLocationType } from "@/db/schema/locationTable";
import type {
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema/machineTable";
import type { SelectShopType } from "@/db/schema/shopTable";
import { MachineForm } from "@/components/machine/forms/machineForm";

export default function EditMachineDialog({
  open,
  shops,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
  machine,
}: {
  open: boolean;
  shops: SelectShopType[];
  locations: SelectLocationType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateMachineType) => Promise<void>;
  onCancel: () => void;
  machine: SelectMachineType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Machine</DialogTitle>
        </DialogHeader>
        <MachineForm
          mode="edit"
          shops={shops}
          locations={locations}
          initialData={machine}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

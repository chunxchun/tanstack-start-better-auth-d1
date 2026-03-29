import { MachineForm } from "@/components/machine/forms/machineForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MachineEditDialogProps } from "./machineDialogType";

export default function EditMachineDialog({
  open,
  shops,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: MachineEditDialogProps) {
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
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

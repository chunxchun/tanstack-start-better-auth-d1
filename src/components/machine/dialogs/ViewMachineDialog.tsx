import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MachineForm } from "../forms/machineForm";
import type { MachineViewDialogProps } from "./machineDialogType";

export default function ViewMachineDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: MachineViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Machine Details</DialogTitle>
        </DialogHeader>
        <MachineForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

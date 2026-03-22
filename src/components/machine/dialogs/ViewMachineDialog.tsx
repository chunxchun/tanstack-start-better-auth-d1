import { MachineForm } from "../forms/machineForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectMachineType } from "@/db/schema/machineTable";

export default function ViewMachineDialog({
  open,
  onOpenChange,
  onCancel,
  machine,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
          <DialogTitle>Machine Details</DialogTitle>
        </DialogHeader>
        <MachineForm mode="view" initialData={machine} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

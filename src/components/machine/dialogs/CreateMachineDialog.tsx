import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MachineForm } from "../forms/machineForm";
import type { MachineCreateDialogProps } from "./machineDialogType";

export default function CreateMachineDialog({
  open,
  onOpenChange,
  shops,
  locations,
  onSubmit,
  onCancel,
  defaultShopId,
}: MachineCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Create Machine</DialogTitle>
        </DialogHeader>
        <MachineForm
          mode="create"
          shops={shops}
          locations={locations}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

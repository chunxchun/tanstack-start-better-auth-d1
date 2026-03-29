import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MachineForm } from "../forms/machineForm";
import type { MachineCreateDialogProps } from "./machineDialogType";

export default function CreateMachineDialog({
  open,
  shops,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
}: MachineCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger>
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
        />
      </DialogContent>
    </Dialog>
  );
}

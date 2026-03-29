import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocationForm } from "../forms/locationForm";
import type { LocationEditDialogProps } from "./locationDialogType";

export default function EditLocationDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: LocationEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <LocationForm
          mode="edit"
          shops={shops}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

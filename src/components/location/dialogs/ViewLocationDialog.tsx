import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocationForm } from "../forms/locationForm";
import type { LocationViewDialogProps } from "./locationDialogType";

export default function ViewLocationDialog({
  open,
  shops,
  onOpenChange,
  onCancel,
  initialData,
}: LocationViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Location Details</DialogTitle>
        </DialogHeader>
        <LocationForm
          mode="view"
          shops={shops}
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

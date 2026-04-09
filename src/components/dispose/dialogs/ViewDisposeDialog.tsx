import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DisposeForm } from "../forms/disposeForm";
import type { DisposeViewDialogProps } from "./disposeDialogType";

export default function ViewDisposeDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onCancel,
  initialData,
}: DisposeViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Dispose Details</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DisposeForm
          mode="view"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onCancel={onCancel}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
}

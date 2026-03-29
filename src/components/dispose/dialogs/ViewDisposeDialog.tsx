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
          shops={undefined}
          machines={undefined}
          foodItems={undefined}
          onCancel={onCancel}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
}

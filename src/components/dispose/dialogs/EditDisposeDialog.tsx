import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DisposeForm } from "../forms/disposeForm";
import type { DisposeEditDialogProps } from "./disposeDialogType";

export default function EditDisposeDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,defaultShopId
}: DisposeEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Edit Dispose</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DisposeForm
          mode="edit"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialData={initialData}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

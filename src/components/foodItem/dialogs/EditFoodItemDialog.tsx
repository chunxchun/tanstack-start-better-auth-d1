import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FoodItemForm } from "../forms/foodItemForm";
import type { FoodItemEditDialogProps } from "./foodItemDialogType";

export default function EditFoodItemDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: FoodItemEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Edit Food Item</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FoodItemForm
          mode="edit"
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          shops={shops}
        />
      </DialogContent>
    </Dialog>
  );
}

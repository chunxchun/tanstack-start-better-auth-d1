import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FoodItemForm } from "../forms/foodItemForm";
import type { FoodItemViewDialogProps } from "./foodItemDialogType";

export default function ViewFoodItemDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: FoodItemViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Food Item Details</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FoodItemForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

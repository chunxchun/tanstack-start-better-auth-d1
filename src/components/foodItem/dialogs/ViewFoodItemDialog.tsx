import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectFoodItemType } from "@/db/schema";
import type { ViewDialogProps } from "@/db/schema/commonSchema";
import { FoodItemForm } from "../forms/foodItemForm";

type ViewFoodItemDialogProps = ViewDialogProps<SelectFoodItemType>;

export default function ViewFoodItemDialog({
  open,
  onOpenChange,
  onCancel,
  data: foodItem,
}: ViewFoodItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Food Item Details</DialogTitle>
        </DialogHeader>
        <FoodItemForm mode="create" initialData={foodItem} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

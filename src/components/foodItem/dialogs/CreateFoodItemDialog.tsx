import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodItemForm } from "../forms/foodItemForm";
import type { FoodItemCreateDialogProps } from "./foodItemDialogType";

export default function CreateFoodItemDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  shops,
  defaultShopId,
}: FoodItemCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Create Food Item</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FoodItemForm
          mode="create"
          shops={shops}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

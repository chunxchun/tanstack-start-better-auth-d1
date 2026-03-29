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
}: FoodItemCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger>
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
        />
      </DialogContent>
    </Dialog>
  );
}

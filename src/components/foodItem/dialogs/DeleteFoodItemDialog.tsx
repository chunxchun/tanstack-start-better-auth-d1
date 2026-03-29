import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FoodItemDeleteDialogProps } from "./foodItemDialogType";

export default function DeleteFoodItemDialog({
  open,
  onOpenChange,
  onCancel,
  onDelete,
  data,
}: FoodItemDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Food Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the food item{" "}
            {data ? ` ${data.name}` : " this food item"}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

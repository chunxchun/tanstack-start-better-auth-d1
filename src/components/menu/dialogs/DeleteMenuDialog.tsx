import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  SelectMenuWithFoodItemsType,
} from "@/db/schema";

export default function DeleteMenuDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  menuWithFoodItems,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  menuWithFoodItems: SelectMenuWithFoodItemsType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Menu</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            {menuWithFoodItems ? `${menuWithFoodItems.name}` : " this menu"}? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> 
  );
}

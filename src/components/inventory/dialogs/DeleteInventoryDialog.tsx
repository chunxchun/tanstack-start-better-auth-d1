import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InventoryDeleteDialogProps } from "./inventoryDialogType";

export default function DeleteInventoryDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  data,
}: InventoryDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Inventory</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the inventory item{" "}
            {data ? ` ${data.id}` : " this inventory item"}? This action cannot
            be undone.
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

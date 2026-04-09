import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryForm } from "../forms/inventoryForm";
import type { InventoryViewDialogProps } from "./inventoryDialogType";

export default function ViewInventoryDialog({
  open,
  onOpenChange,
  onCancel,
  shops,
  machines,
  foodItems,
  initialData,
}: InventoryViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>View Inventory</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <InventoryForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
          shops={shops}
          machines={machines}
          foodItems={foodItems}
        />
      </DialogContent>
    </Dialog>
  );
}

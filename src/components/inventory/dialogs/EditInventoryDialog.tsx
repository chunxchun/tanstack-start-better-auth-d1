import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryForm } from "../forms/inventoryForm";
import type { InventoryEditDialogProps } from "./inventoryDialogType";

export default function EditInventoryDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
  shops,
  machines,
  foodItems,
  defaultShopId,
}: InventoryEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Edit Inventory</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <InventoryForm
          mode="edit"
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InventoryForm } from "../forms/inventoryForm";
import type { InventoryCreateDialogProps } from "./inventoryDialogType";

export default function CreateInventoryDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  shops,
  machines,
  foodItems,
  defaultShopId,
}: InventoryCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger>
      <DialogHeader className="sr-only">
        <DialogTitle>Create Inventory</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <InventoryForm
          mode="create"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}

        />
      </DialogContent>
    </Dialog>
  );
}

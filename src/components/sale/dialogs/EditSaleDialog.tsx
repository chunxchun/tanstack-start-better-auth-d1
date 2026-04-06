import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SaleForm } from "../forms/saleForm";
import type { SaleEditDialogProps } from "./saleDialogType";

export default function EditSaleDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
  defaultShopId,

}: SaleEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Sale</DialogTitle>
        </DialogHeader>
        <SaleForm
          mode="edit"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}

        />
      </DialogContent>
    </Dialog>
  );
}

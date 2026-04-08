import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SaleForm } from "../forms/saleForm";
import type { SaleViewDialogProps } from "./saleDialogType";

export default function ViewSaleDialog({
  open,
  onOpenChange,
  shops,
  machines,
  foodItems,
  onCancel,
  initialData,
}: SaleViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>View Sale</DialogTitle>
        </DialogHeader>
        <SaleForm
          mode="view"
          initialData={initialData}
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeliveryForm } from "../forms/deliveryForm";
import type { DeliveryEditDialogProps } from "./deliveryDialogType";

export default function EditDeliveryDialog({
  open,
  shops,
  machines,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
  defaultShopId,
}: DeliveryEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Delivery</DialogTitle>
        </DialogHeader>
        <DeliveryForm
          mode="edit"
          shops={shops}
          machines={machines}
          locations={locations}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

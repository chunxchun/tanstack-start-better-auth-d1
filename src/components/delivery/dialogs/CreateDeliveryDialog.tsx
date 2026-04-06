import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeliveryForm } from "../forms/deliveryForm";
import type { DeliveryCreateDialogProps } from "./deliveryDialogType";

export default function CreateDeliveryDialog({
  open,
  shops,
  machines,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultShopId,
}: DeliveryCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Create Delivery</DialogTitle>
        </DialogHeader>
        <DeliveryForm
          mode="create"
          shops={shops}
          machines={machines}
          locations={locations}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

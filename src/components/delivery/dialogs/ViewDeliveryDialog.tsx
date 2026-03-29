import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeliveryForm } from "../forms/deliveryForm";
import type { DeliveryViewDialogProps } from "./deliveryDialogType";

export default function ViewDeliveryDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: DeliveryViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        <DeliveryForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

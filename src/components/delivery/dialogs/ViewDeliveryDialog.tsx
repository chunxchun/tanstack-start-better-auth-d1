import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ViewDialogProps } from "@/db/schema/commonSchema";
import type { SelectDeliveryType } from "@/db/schema/deliveryTable";
import { DeliveryForm } from "../forms/deliveryForm";

type ViewDeliveryDialogProps = ViewDialogProps<SelectDeliveryType>;

export default function ViewDeliveryDialog({
  open,
  onOpenChange,
  onCancel,
  data: delivery,
}: ViewDeliveryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        <DeliveryForm mode="view" initialData={delivery} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

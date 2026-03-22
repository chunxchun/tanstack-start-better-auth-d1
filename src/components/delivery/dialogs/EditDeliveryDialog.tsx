import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  SelectDeliveryType,
  SelectMachineType,
  SelectShopType,
  UpdateDeliveryType,
} from "@/db/schema";
import type { SelectLocationType } from "@/db/schema/locationTable";
import { DeliveryForm } from "../forms/deliveryForm";

type EditDeliveryDialogProps = {
  open: boolean;
  shops: SelectShopType[];
  machines: SelectMachineType[];
  locations: SelectLocationType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateDeliveryType) => Promise<void>;
  onCancel: () => void;
  delivery: SelectDeliveryType;
};

export default function EditDeliveryDialog({
  open,
  shops,
  machines,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
  delivery,
}: EditDeliveryDialogProps) {
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
          initialData={delivery}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

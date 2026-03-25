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
import { FoodItemForm } from "../forms/foodItemForm";

type EditFoodItemDialogProps = {
  open: boolean;
  shops: SelectShopType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateDeliveryType) => Promise<void>;
  onCancel: () => void;
  delivery: SelectDeliveryType;
};
export default function EditFoodItemDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  delivery,
}: EditFoodItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Edit Food Item</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FoodItemForm
          mode="edit"
          shops={shops}
          initialData={delivery}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

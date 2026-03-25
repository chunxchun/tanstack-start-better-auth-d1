import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type {
  SelectFoodItemType,
  SelectMachineType,
  SelectShopType,
} from "@/db/schema";
import type { SelectDisposeType } from "@/db/schema/disposeTable";
import { DisposeForm } from "../forms/disposeForm";

type EditDisposeDialogProps = {
  open: boolean;
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  onCancel: () => void;
  dispose: SelectDisposeType;
};
export default function EditDisposeDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  dispose,
}: EditDisposeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Edit Dispose</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DisposeForm
          mode="edit"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialData={dispose}
        />
      </DialogContent>
    </Dialog>
  );
}

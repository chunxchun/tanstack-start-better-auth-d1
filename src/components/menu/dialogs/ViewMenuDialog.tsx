import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuForm } from "../forms/menuForm";
import type { MenuViewDialogProps } from "./menuDialogType";

export default function ViewMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onCancel,
  initialData,
}: MenuViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Menu Details</DialogTitle>
        </DialogHeader>
        <MenuForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
          shops={shops}
          foodItems={foodItems}
        />
      </DialogContent>
    </Dialog>
  );
}

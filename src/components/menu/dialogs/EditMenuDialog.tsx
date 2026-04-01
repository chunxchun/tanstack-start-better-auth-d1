import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuForm } from "../forms/menuForm";
import type { MenuEditDialogProps } from "./menuDialogType";

export default function EditMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: MenuEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Menu</DialogTitle>
        </DialogHeader>
        <MenuForm
          mode="edit"
          shops={shops}
          foodItems={foodItems}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

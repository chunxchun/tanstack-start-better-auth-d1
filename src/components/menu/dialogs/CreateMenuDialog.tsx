import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuForm } from "../forms/menuForm";
import type { MenuCreateDialogProps } from "./menuDialogType";

export default function CreateMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultShopId,
}: MenuCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>
        <MenuForm
          mode="create"
          shops={shops}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { SelectMenuWithFoodItemsType } from "@/db/schema";
import { MenuForm } from "../forms/menuForm";

export default function ViewMenuDialog({
  open,
  onOpenChange,
  onCancel,
  menu,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  menu: SelectMenuWithFoodItemsType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Menu Details</DialogTitle>
        </DialogHeader>
        <MenuForm mode="view" initialData={menu} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

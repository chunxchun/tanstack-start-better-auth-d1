import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenuForm } from "../forms/menuForm";
import type { InsertMenuWithFoodItemsType } from "@/db/schema/menuTable";
import type { SelectFoodItemType, SelectShopType } from "@/db/schema";

export default function CreateMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InsertMenuWithFoodItemsType) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger>
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
        />
      </DialogContent>
    </Dialog>
  );
}

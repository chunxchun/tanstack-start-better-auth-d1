import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectLocationType } from "@/db/schema/locationTable";
import type {
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema/machineTable";
import type { SelectMenuWithFoodItemsType } from "@/db/schema/menuTable";
import type { UpdateMenuWithFoodItemsType } from "@/db/schema/menuTable";
import { MenuForm } from "../forms/menuForm";
import type { SelectFoodItemType, SelectShopType } from "@/db/schema";

export default function EditMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
  menu,
}: {
  open: boolean;
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateMenuWithFoodItemsType) => Promise<void>;
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
          <DialogTitle>Edit Menu</DialogTitle>
        </DialogHeader>
         <MenuForm
          mode="edit"
          shops={shops}
          foodItems={foodItems}
          initialData={menu}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog> 
  );
}

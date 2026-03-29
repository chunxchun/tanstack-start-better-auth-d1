import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SelectMachineType } from "@/db/schema/machineTable";
import type { InsertSaleType } from "@/db/schema/saleTable";
import type { SelectShopType } from "@/db/schema/shopTable";
import { SaleForm } from "../forms/saleForm";
import { Button } from "@/components/ui/button";
import type { SelectFoodItemType } from "@/db/schema";

export default function CreateSaleDialog({
  open,
  shops,
  machines,
  onOpenChange,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InsertSaleType) => Promise<void>;
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
          <DialogTitle>Create Sale</DialogTitle>
        </DialogHeader>
        <SaleForm
          mode="create"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

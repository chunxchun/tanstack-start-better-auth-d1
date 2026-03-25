import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { InsertShopType, SelectShopType } from "@/db/schema";
import { FoodItemForm } from "../forms/foodItemForm";

type CreateFoodItemDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InsertShopType) => Promise<void>;
  onCancel: () => void;
  shops: SelectShopType;
};

export default function CreateFoodItemDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  shops,
}: CreateFoodItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger>
      <DialogHeader className="sr-only">
        <DialogTitle>Create Food Item</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FoodItemForm
          mode="create"
          shops={shops}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

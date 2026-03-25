import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type {
  SelectFoodItemType,
  SelectMachineType,
  SelectShopType,
} from "@/db/schema";
import type { Select } from "radix-ui";
import { DisposeForm } from "../forms/disposeForm";

type CreateDisposeDialogProps = {
  open: boolean;
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  onCancel: () => void;
};
export default function CreateDisposeDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
}: CreateDisposeDialogProps) {
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
          <DialogTitle>Create Dispose</DialogTitle>
        </DialogHeader>
        <DisposeForm
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

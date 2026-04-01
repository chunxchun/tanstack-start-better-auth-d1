import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SaleForm } from "../forms/saleForm";
import type { SaleCreateDialogProps } from "./saleDialogType";

export default function CreateSaleDialog({
  open,
  shops,
  machines,
  foodItems,

  onOpenChange,
  onSubmit,
  onCancel,
}: SaleCreateDialogProps) {
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

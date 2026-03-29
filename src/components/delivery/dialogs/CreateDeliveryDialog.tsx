import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeliveryForm } from "../forms/deliveryForm";
import type { DeliveryCreateDialogProps } from "./deliveryDialogType";

export default function CreateDeliveryDialog({
  open,
  shops,
  machines,
  locations,
  onOpenChange,
  onSubmit,
  onCancel,
}: DeliveryCreateDialogProps) {
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
          <DialogTitle>Create Delivery</DialogTitle>
        </DialogHeader>
        <DeliveryForm
          mode="create"
          shops={shops}
          machines={machines}
          locations={locations}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

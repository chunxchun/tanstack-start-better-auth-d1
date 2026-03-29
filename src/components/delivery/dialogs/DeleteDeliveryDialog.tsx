import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DeliveryDeleteDialogProps } from "./deliveryDialogType";

export default function DeleteDeliveryDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  data,
}: DeliveryDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Delivery</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the delivery{" "}
            {data ? ` ${data.courierReference}` : " this delivery"}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

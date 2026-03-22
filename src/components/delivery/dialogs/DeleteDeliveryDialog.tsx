import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectDeliveryType } from "@/db/schema";

type DeleteDeliveryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  delivery: SelectDeliveryType;
};

export default function DeleteDeliveryDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  delivery,
}: DeleteDeliveryDialogProps) {
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
            {delivery ? ` ${delivery.courierReference}` : " this delivery"}?
            This action cannot be undone.
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

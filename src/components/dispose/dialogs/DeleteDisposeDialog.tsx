import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectDisposeType } from "@/db/schema";
import type { DeleteDialogProps } from "@/db/schema/commonSchema";

type DeleteDisposeDialogProps = DeleteDialogProps<SelectDisposeType>;

export default function DeleteDisposeDialog({
  open,
  onOpenChange,
  onCancel,
  onDeleteConfirm,
  data: dispose,
}: DeleteDisposeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete dispose</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {dispose ? ` ${dispose.id}` : "this dispose"}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDeleteConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

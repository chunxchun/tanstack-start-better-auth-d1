import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DisposeDeleteDialogProps } from "./disposeDialogType";

export default function DeleteDisposeDialog({
  open,
  onOpenChange,
  onCancel,
  onDelete,
  data,
}: DisposeDeleteDialogProps) {
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
            {data ? ` ${data.id}` : "this dispose"}? This action cannot be
            undone.
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectDisposeType } from "@/db/schema";
import type { ViewDialogProps } from "@/db/schema/commonSchema";
import { DisposeForm } from "../forms/disposeForm";

type ViewDisposeDialogProps = ViewDialogProps<SelectDisposeType>;

export default function ViewDisposeDialog({
  open,
  onOpenChange,
  onCancel,
  data: dispose,
}: ViewDisposeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Dispose Details</DialogTitle>
      </DialogHeader>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DisposeForm
          mode="view"
          shops={undefined}
          machines={undefined}
          foodItems={undefined}
          onCancel={onCancel}
          initialData={dispose}
        />
      </DialogContent>
    </Dialog>
  );
}

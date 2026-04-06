import { SpecialHourForm } from "@/components/special-hour/forms/specialHourForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SpecialHourViewDialogProps } from "./specialHourDialogType";

export default function ViewSpecialHourDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: SpecialHourViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Special Hour Details</DialogTitle>
        </DialogHeader>
        <SpecialHourForm
          mode="view"
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

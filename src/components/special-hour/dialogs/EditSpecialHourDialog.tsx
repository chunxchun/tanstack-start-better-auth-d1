import { SpecialHourForm } from "../forms/specialHourForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SpecialHourEditDialogProps } from "./specialHourDialogType";

export default function EditSpecialHourDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: SpecialHourEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Special Hour</DialogTitle>
        </DialogHeader>
        <SpecialHourForm
          mode="edit"
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
} 
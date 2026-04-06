import { SpecialHourForm } from "@/components/special-hour/forms/specialHourForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SpecialHourCreateDialogProps } from "./specialHourDialogType";

export default function CreateSpecialHourDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  // shops,
  // machines,
}: SpecialHourCreateDialogProps) {
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
          <DialogTitle>Create Special Hour</DialogTitle>
        </DialogHeader>
        <SpecialHourForm
          mode="create"
          // shops={shops}
          // machines={machines}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LocationForm } from "../forms/locationForm";
import type { LocationCreateDialogProps } from "./locationDialogType";

export default function CreateLocationDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
}: LocationCreateDialogProps) {
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
          <DialogTitle>Create Location</DialogTitle>
        </DialogHeader>
        <LocationForm
          mode="create"
          shops={shops}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

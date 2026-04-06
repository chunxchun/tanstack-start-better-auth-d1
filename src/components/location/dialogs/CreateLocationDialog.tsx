import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocationForm } from "../forms/locationForm";
import type { LocationCreateDialogProps } from "./locationDialogType";

export default function CreateLocationDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultShopId,
}: LocationCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

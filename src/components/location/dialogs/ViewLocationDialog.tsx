import { LocationForm } from "../forms/locationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectLocationType } from "@/db/schema/locationTable";

export default function ViewLocationDialog({
  open,
  onOpenChange,
  onCancel,
  location,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  location: SelectLocationType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50vw]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="sr-only">
          <DialogTitle>Location Details</DialogTitle>
        </DialogHeader>
        <LocationForm mode="view" initialData={location} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

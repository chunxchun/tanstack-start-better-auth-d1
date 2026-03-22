import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ViewDialogProps } from "@/db/schema/commonSchema";
import type { SelectLocationType } from "@/db/schema/locationTable";
import { LocationForm } from "../forms/locationForm";

type ViewLocationDialogProps = ViewDialogProps<SelectLocationType>;

export default function ViewLocationDialog({
  open,
  onOpenChange,
  onCancel,
  data: location,
}: ViewLocationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Location Details</DialogTitle>
        </DialogHeader>
        <LocationForm mode="view" initialData={location} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

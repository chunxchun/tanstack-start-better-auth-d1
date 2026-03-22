import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectShopType } from "@/db/schema";
import type {
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema/locationTable";
import { LocationForm } from "../forms/locationForm";

export default function EditLocationDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  location,
}: {
  open: boolean;
  shops: SelectShopType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateLocationType) => Promise<void>;
  onCancel: () => void;
  location: SelectLocationType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <LocationForm
          mode="edit"
          shops={shops}
          initialData={location}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

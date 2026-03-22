import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LocationForm } from "../forms/locationForm";
import type { InsertLocationType } from "@/db/schema/locationTable";
import type { SelectShopType } from "@/db/schema";

export default function CreateLocationDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  shops: SelectShopType[]; // Replace `any` with the appropriate type for your shops
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InsertLocationType) => Promise<void>;
  onCancel: () => void;
}) {
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

import { ShopForm } from "@/components/shop/forms/shopForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ShopEditDialogProps } from "./shopDialogType";

export default function EditShopDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: ShopEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Shop</DialogTitle>
        </DialogHeader>
        <ShopForm
          mode="edit"
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

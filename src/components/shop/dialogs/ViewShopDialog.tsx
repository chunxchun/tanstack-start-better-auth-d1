import { ShopForm } from "@/components/shop/forms/shopForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ShopViewDialogProps } from "./shopDialogType";

export default function ViewShopDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: ShopViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Shop Details</DialogTitle>
        </DialogHeader>
        <ShopForm mode="view" initialData={initialData} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

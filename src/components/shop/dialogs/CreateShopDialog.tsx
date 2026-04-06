import { ShopForm } from "@/components/shop/forms/shopForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ShopCreateDialogProps } from "./shopDialogType";

export default function CreateShopDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultShopId,
}: ShopCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Create Shop</DialogTitle>
        </DialogHeader>
        <ShopForm
          mode="create"
          onSubmit={onSubmit}
          onCancel={onCancel}
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

import { ShopForm } from "@/components/shop/forms/shopForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectShopType, UpdateShopType } from "@/db/schema/shopTable";

export default function EditShopDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  shop,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values: UpdateShopType,
    banner?: File,
    logo?: File,
  ) => Promise<void>;
  onCancel: () => void;
  shop: SelectShopType
}) {
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
          initialData={shop}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

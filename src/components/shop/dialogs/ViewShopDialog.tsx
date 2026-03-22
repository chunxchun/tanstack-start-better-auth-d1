import { ShopForm } from "@/components/shop/forms/shopForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SelectShopType } from "@/db/schema/shopTable";

export default function ViewShopDialog({
  open,
  onOpenChange,
  onCancel,
  shop,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  shop: SelectShopType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button variant="default">
          <span>+</span>Create
        </Button>
      </DialogTrigger> */}
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Shop Details</DialogTitle>
        </DialogHeader>
        <ShopForm mode="view" initialData={shop} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

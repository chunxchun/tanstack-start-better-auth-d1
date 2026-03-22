import { ShopForm } from "@/components/shop/forms/shopForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { InsertShopType } from "@/db/schema/shopTable";

export default function CreateShopDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values: InsertShopType,
    banner?: File,
    logo?: File,
  ) => Promise<void>;
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
          <DialogTitle>Create Shop</DialogTitle>
        </DialogHeader>
        <ShopForm mode="create" onSubmit={onSubmit} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

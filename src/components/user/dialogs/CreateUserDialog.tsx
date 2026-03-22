import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { SelectShopType } from "@/db/schema";
import type { InsertUserType } from "@/db/schema/authSchema";

export default function CreateUserDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  shops: SelectShopType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: InsertUserType) => Promise<void>;
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
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <UserForm
          mode="create"
          shops={shops}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

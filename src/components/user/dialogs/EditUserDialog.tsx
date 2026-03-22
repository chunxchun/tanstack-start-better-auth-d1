import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { SelectUserType, UpdateUserType } from "@/db/schema/authSchema";
import type { SelectShopType } from "@/db/schema/shopTable";

export default function EditUserDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  user,
}: {
  open: boolean;
  shops: SelectShopType[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpdateUserType) => Promise<void>;
  onCancel: () => void;
  user: SelectUserType;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <UserForm
          mode="edit"
          shops={shops}
          initialData={user}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

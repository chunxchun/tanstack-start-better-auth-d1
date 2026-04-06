import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { UserCreateDialogProps } from "./userDialogType";

export default function CreateUserDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  defaultShopId,
}: UserCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          defaultShopId={defaultShopId}
        />
      </DialogContent>
    </Dialog>
  );
}

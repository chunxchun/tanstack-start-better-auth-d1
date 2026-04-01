import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { UserEditDialogProps } from "./userDialogType";

export default function EditUserDialog({
  open,
  shops,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: UserEditDialogProps) {
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
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { UserViewDialogProps } from "./userDialogType";

export default function ViewUserDialog({
  open,
  onOpenChange,
  onCancel,
  initialData,
}: UserViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[50vw]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <UserForm
          mode="view"
          shops={undefined}
          onSubmit={undefined}
          initialData={initialData}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

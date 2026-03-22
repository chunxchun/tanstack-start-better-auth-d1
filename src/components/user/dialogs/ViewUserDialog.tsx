import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/user/forms/userForm";
import type { SelectUserType } from "@/db/schema/authSchema";

export default function ViewUserDialog({
  open,
  onOpenChange,
  onCancel,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <UserForm
          mode="view"
          shops={undefined}
          onSubmit={undefined}
          initialData={user}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

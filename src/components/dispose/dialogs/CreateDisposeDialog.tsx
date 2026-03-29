import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DisposeForm } from "../forms/disposeForm";
import type { DisposeCreateDialogProps } from "./disposeDialogType";

export default function CreateDisposeDialog({
  open,
  shops,
  machines,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
}: DisposeCreateDialogProps) {
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
          <DialogTitle>Create Dispose</DialogTitle>
        </DialogHeader>
        <DisposeForm
          mode="create"
          shops={shops}
          machines={machines}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

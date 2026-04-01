import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenuForm } from "../forms/menuForm";
import type { MenuCreateDialogProps } from "./menuDialogType";

export default function CreateMenuDialog({
  open,
  shops,
  foodItems,
  onOpenChange,
  onSubmit,
  onCancel,
}: MenuCreateDialogProps) {
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
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>
        <MenuForm
          mode="create"
          shops={shops}
          foodItems={foodItems}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

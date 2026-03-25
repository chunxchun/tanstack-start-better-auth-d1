import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FormHeader({
  module,
  mode,
  isCreate,
  isReadOnly,
}: {
  module: string;
  mode: "view" | "create" | "edit";
  isCreate: boolean;
  isReadOnly: boolean;
}) {
  return (
    <DialogHeader>
      <DialogTitle>
        {mode === "view"
          ? `${module} Details`
          : isCreate
            ? `Create ${String(module).toLowerCase()}`
            : `Edit ${String(module).toLowerCase()}`}
      </DialogTitle>
      <DialogDescription>
        {isReadOnly
          ? `View ${String(module).toLowerCase()} details.`
          : `Fill out the form below and click save when you're done.`}
      </DialogDescription>
    </DialogHeader>
  );
}

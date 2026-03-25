import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export default function FormFooter({
  onCancel,
  isReadOnly,
  isCreate,
}: {
  onCancel: () => void;
  isReadOnly: boolean;
  isCreate: boolean;
}) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Close
      </Button>
      {!isReadOnly ? (
        <Button type="submit">{isCreate ? "Create" : "Save"}</Button>
      ) : null}
    </DialogFooter>
  );
}

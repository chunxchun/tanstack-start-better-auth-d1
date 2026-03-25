import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export default function FormFooter({
  onCancel,
  isReadOnly,
  isCreate,
  isLoading = false
}: {
  onCancel: () => void;
  isReadOnly: boolean;
  isCreate: boolean;
  isLoading?: boolean;
}) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Close
      </Button>
      {!isReadOnly ? (
        <Button type="submit" disabled={isLoading}>{isCreate ? "Create" : "Save"}</Button>
      ) : null}
    </DialogFooter>
  );
}

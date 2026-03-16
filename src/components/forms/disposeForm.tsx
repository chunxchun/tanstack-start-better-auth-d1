import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FieldGroup,
  FieldLabel,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SelectDispose as Dispose } from "@/db/schema";

type DisposeSubmitValues = Omit<Dispose, "id" | "createdAt" | "updatedAt">;

type DisposeFormBaseProps = {
  initialData?: Partial<Dispose>;
  onCancel?: () => void;
};

type DisposeFormViewProps = DisposeFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type DisposeFormEditProps = DisposeFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: DisposeSubmitValues) => Promise<void>;
};

type DisposeFormProps = DisposeFormViewProps | DisposeFormEditProps;

export function DisposeForm({ mode, initialData, onSubmit, onCancel }: DisposeFormProps) {
  const form = useForm({
    defaultValues: {
      machineId: initialData?.machineId ?? 0,
      foodItemId: initialData?.foodItemId ?? 0,
      disposeDate: initialData?.disposeDate ?? "",
      disposeTime: initialData?.disposeTime ?? "",
      quantity: initialData?.quantity ?? 0,
      disposeReason: initialData?.disposeReason ?? "other",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        machineId: value.machineId,
        foodItemId: value.foodItemId,
        disposeDate: value.disposeDate,
        disposeTime: value.disposeTime,
        quantity: value.quantity,
        disposeReason: value.disposeReason,
      });
    },
  });

  const isReadOnly = mode === "view";
  const isCreate = mode === "create";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <DialogHeader>
        <DialogTitle>
          {mode === "view" ? "Dispose Details" : isCreate ? "Create Dispose" : "Edit Dispose"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View dispose record details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <form.Field name="machineId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Machine ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="foodItemId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Food Item ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="disposeDate">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Dispose Date</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="disposeTime">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Dispose Time</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="time"
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="quantity">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="disposeReason">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Dispose Reason</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "other"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as "expired" | "damaged" | "refunded" | "other",
                  )
                }
              >
                <option value="expired">expired</option>
                <option value="damaged">damaged</option>
                <option value="refunded">refunded</option>
                <option value="other">other</option>
              </select>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? <Button type="submit">{isCreate ? "Create" : "Save"}</Button> : null}
      </DialogFooter>
    </form>
  );
}

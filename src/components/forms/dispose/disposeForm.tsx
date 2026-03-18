import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InsertDisposeType, UpdateDisposeType } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { DisposeFormProps } from "./disposeFormType";

export function DisposeForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: DisposeFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      machineId: null,
      foodItemId: null,
      disposeDate: new Date().toISOString().slice(0, 10),
      disposeTime: "18:00",
      quantity: 1,
      disposeReason: "other",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateDisposeType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertDisposeType);
        }
      } catch (error) {
        console.error("Error submitting dispose form:", error);
      }
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
          {mode === "view"
            ? "Dispose Details"
            : isCreate
              ? "Create Dispose"
              : "Edit Dispose"}
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
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
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
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
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
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
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
                    e.target.value as
                      | "expired"
                      | "damaged"
                      | "refunded"
                      | "other",
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
        {!isReadOnly ? (
          <Button type="submit">{isCreate ? "Create" : "Save"}</Button>
        ) : null}
      </DialogFooter>
    </form>
  );
}

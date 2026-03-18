import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InsertInventoryType, UpdateInventoryType } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { InventoryFormProps } from "./inventoryFormType";

export function InventoryForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: InventoryFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      machineId: null,
      foodItemId: null,
      quantity: 1,
      date: new Date().toISOString().slice(0, 10), // default to today's date
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          const data = value as UpdateInventoryType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertInventoryType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting inventory form:", error);
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
            ? "Inventory Details"
            : isCreate
              ? "Create Inventory"
              : "Edit Inventory"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View inventory details."
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

        <form.Field name="date">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Date</FieldLabel>
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

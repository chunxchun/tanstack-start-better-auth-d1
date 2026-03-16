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
import type { SelectInventory as Inventory } from "@/db/schema";

type InventorySubmitValues = Omit<Inventory, "id" | "createdAt" | "updatedAt">;

type InventoryFormBaseProps = {
  initialData?: Partial<Inventory>;
  onCancel?: () => void;
};

type InventoryFormViewProps = InventoryFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type InventoryFormEditProps = InventoryFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: InventorySubmitValues) => Promise<void>;
};

type InventoryFormProps = InventoryFormViewProps | InventoryFormEditProps;

export function InventoryForm({ mode, initialData, onSubmit, onCancel }: InventoryFormProps) {
  const form = useForm({
    defaultValues: {
      machineId: initialData?.machineId ?? 0,
      foodItemId: initialData?.foodItemId ?? 0,
      quantity: initialData?.quantity ?? 0,
      date: initialData?.date ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        machineId: value.machineId,
        foodItemId: value.foodItemId,
        quantity: value.quantity,
        date: value.date,
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
          {mode === "view" ? "Inventory Details" : isCreate ? "Create Inventory" : "Edit Inventory"}
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
        {!isReadOnly ? <Button type="submit">{isCreate ? "Create" : "Save"}</Button> : null}
      </DialogFooter>
    </form>
  );
}

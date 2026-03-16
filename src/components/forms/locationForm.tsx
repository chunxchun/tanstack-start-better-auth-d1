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
  FieldDescription,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SelectLocation as Location } from "@/db/schema";

type LocationSubmitValues = Omit<Location, "id" | "createdAt" | "updatedAt">;

type LocationFormBaseProps = {
  initialData?: Partial<Location>;
  onCancel?: () => void;
};

type LocationFormViewProps = LocationFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type LocationFormEditProps = LocationFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: LocationSubmitValues) => Promise<void>;
};

type LocationFormProps = LocationFormViewProps | LocationFormEditProps;

export function LocationForm({ mode, initialData, onSubmit, onCancel }: LocationFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      address: initialData?.address ?? "",
      description: initialData?.description ?? null,
      status: initialData?.status ?? "active",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        name: value.name,
        address: value.address,
        description: value.description,
        status: value.status,
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
          {mode === "view"
            ? "Location Details"
            : isCreate
              ? "Create Location"
              : "Edit Location"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View location details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="address">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
              <FieldDescription>Optional description for this location.</FieldDescription>
            </Field>
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Status</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "active"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value as "active" | "inactive")}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
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

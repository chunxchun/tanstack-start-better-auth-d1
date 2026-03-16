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
import type { SelectMachine as Machine } from "@/db/schema";

type MachineSubmitValues = Omit<Machine, "id" | "createdAt" | "updatedAt">;

type MachineFormBaseProps = {
  initialData?: Partial<Machine>;
  onCancel?: () => void;
};

type MachineFormViewProps = MachineFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type MachineFormEditProps = MachineFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: MachineSubmitValues) => Promise<void>;
};

type MachineFormProps = MachineFormViewProps | MachineFormEditProps;

export function MachineForm({ mode, initialData, onSubmit, onCancel }: MachineFormProps) {
  const form = useForm({
    defaultValues: {
      locationId: initialData?.locationId ?? null,
      name: initialData?.name ?? "",
      serialNumber: initialData?.serialNumber ?? "",
      status: initialData?.status ?? "active",
      description: initialData?.description ?? null,
      installationDate: initialData?.installationDate ?? "",
      startWorkingHour: initialData?.startWorkingHour ?? "",
      closeWorkingHour: initialData?.closeWorkingHour ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        locationId: value.locationId,
        name: value.name,
        serialNumber: value.serialNumber,
        status: value.status,
        description: value.description,
        installationDate: value.installationDate,
        startWorkingHour: value.startWorkingHour,
        closeWorkingHour: value.closeWorkingHour,
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
          {mode === "view" ? "Machine Details" : isCreate ? "Create Machine" : "Edit Machine"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View machine details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <form.Field name="locationId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Location ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : null)}
              />
              <FieldDescription>Optional location id for this machine.</FieldDescription>
            </Field>
          )}
        </form.Field>

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

        <form.Field name="serialNumber">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Serial Number</FieldLabel>
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
                onChange={(e) =>
                  field.handleChange(e.target.value as "active" | "inactive" | "maintenance")
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="maintenance">maintenance</option>
              </select>
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
            </Field>
          )}
        </form.Field>

        <form.Field name="installationDate">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Installation Date</FieldLabel>
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

        <form.Field name="startWorkingHour">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Start Working Hour</FieldLabel>
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

        <form.Field name="closeWorkingHour">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Close Working Hour</FieldLabel>
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

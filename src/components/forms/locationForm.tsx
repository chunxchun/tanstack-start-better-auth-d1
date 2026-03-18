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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectLocation } from "@/db/schema";
import { countryValues } from "@/db/schema/commonEnums";

type LocationSubmitValues = {
  name: string;
  description: string | null;
  status: "active" | "inactive";
  addressLine1: string;
  addressLine2?: string | null;
  addressCity: string;
  addressState?: string | null;
  addressPostalCode?: string | null;
  addressCountry: string;
};

type LocationFormBaseProps = {
  initialData?: Partial<SelectLocation>;
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

export function LocationForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? null,
      status: initialData?.status ?? "active",
      addressLine1: initialData?.addressLine1 ?? "",
      addressLine2: initialData?.addressLine2 ?? null,
      addressCity: initialData?.addressCity ?? "",
      addressState: initialData?.addressState ?? null,
      addressPostalCode: initialData?.addressPostalCode ?? null,
      addressCountry: initialData?.addressCountry ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      await onSubmit({
        name: value.name,
        description: value.description,
        status: value.status,
        addressLine1: value.addressLine1,
        addressLine2: value.addressLine2,
        addressCity: value.addressCity,
        addressState: value.addressState,
        addressPostalCode: value.addressPostalCode,
        addressCountry: value.addressCountry,
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
              ? <span className="font-bold">Create Location</span>
              : "Edit Location"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View location details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="py-8">
        {/* ── Location details ── */}
        <div className="grid grid-cols-2 gap-x-4">
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

          <form.Field name="status">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select
                  value={field.state.value ?? "active"}
                  disabled={isReadOnly}
                  onValueChange={(val) =>
                    field.handleChange(val as "active" | "inactive")
                  }
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
        </div>

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
              <FieldDescription>
                Optional description for this location.
              </FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* ── Address ── */}

        <p className="text-sm font-bold">Address</p>

        <form.Field name="addressLine1">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Street Line 1</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                placeholder="123 Main St"
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="addressLine2">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Street Line 2</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Suite 4B (optional)"
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
            </Field>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <form.Field name="addressCity">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Hong Kong"
                  value={field.state.value}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="addressState">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  State / Province / Region
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="New South Wales (optional)"
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="addressPostalCode">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Postal / ZIP Code</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="10001 (optional)"
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="addressCountry">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                <Select
                  value={field.state.value}
                  disabled={isReadOnly}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue placeholder="-- Select country --" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryValues.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
        </div>
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

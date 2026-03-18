import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  InsertLocationType,
  UpdateLocationType
} from "@/db/schema";
import { countryValues } from "@/db/schema/commonSchema";
import { useForm } from "@tanstack/react-form";
import type { LocationFormProps } from "./locationFormType";

export function LocationForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      name: "",
      description: null,
      status: "active",
      addressLine1: "",
      addressLine2: null,
      addressCity: null,
      addressState: null,
      addressPostalCode: null,
      addressCountry: "Australia",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          const data = value as UpdateLocationType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertLocationType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting location form:", error);
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
          {mode === "view" ? (
            "Location Details"
          ) : isCreate ? (
            <span className="font-bold">Create Location</span>
          ) : (
            "Edit Location"
          )}
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

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
import type { InsertMenuType, UpdateMenuType } from "@/db/schema/menuTable";
import { useForm } from "@tanstack/react-form";
import type { MenuFormProps } from "./menuFormType";

export function MenuForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      name: null,
      description: null,
      coverPhotoUrl: null,
      date: new Date().toISOString().slice(0, 10),
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          const data = value as UpdateMenuType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertMenuType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting menu form:", error);
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
            ? "Menu Details"
            : isCreate
              ? "Create Menu"
              : "Edit Menu"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View menu details."
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

        <form.Field name="coverPhotoUrl">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Cover Photo URL</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
              <FieldDescription>
                Optional public URL for menu cover photo.
              </FieldDescription>
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

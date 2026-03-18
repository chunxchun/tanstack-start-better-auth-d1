import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  systemUserRoleValues,
  type InsertSystemUserType,
  type SystemUserRole,
  type UpdateSystemUserType,
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { UserFormProps } from "./userFormType";

export function UserForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      name: "",
      displayName: "",
      role: "staff",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateSystemUserType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertSystemUserType);
        }
      } catch (error) {
        console.error("Error submitting user form:", error);
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
            ? "User Details"
            : isCreate
              ? "Create User"
              : "Edit User"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View user details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <form.Field name="shopId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Shop ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value != null ? String(field.state.value) : ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />
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

        <form.Field name="displayName">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
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

        <form.Field name="role">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Role</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "staff"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(e.target.value as SystemUserRole)
                }
              >
                {systemUserRoleValues.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
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

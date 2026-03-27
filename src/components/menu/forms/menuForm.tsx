import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormText from "@/components/form-text";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InsertMenuType, UpdateMenuType } from "@/db/schema/menuTable";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { MenuFormProps } from "./menuFormType";

export function MenuForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
      <FormHeader
        mode={mode}
        module="Menu"
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
        {/* name */}
        <FormText
          form={form}
          name="name"
          label="Name"
          isReadOnly={isReadOnly}
          required
        />

        {/* description */}
        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />

        {/* cover photo url */}
        <form.Field name="coverPhotoUrl">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Cover Photo</FieldLabel>
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

        {/* date */}
        <FormDate
          form={form}
          name="date"
          label="Date"
          isReadOnly={isReadOnly}
          required
        />
      </FieldGroup>

      <FormFooter
        isReadOnly={isReadOnly}
        isCreate={isCreate}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </form>
  );
}

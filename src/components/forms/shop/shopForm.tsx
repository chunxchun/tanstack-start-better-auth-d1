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
import type {
  InsertShopType,
  UpdateShopType
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { ShopFormProps } from "./shopFormType";

export function ShopForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: ShopFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      bannerUrl: null,
      logoUrl: null,
      videoUrl: null,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          const data = value as UpdateShopType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertShopType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting shop form:", error);
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
            ? "Shop Details"
            : isCreate
              ? "Create Shop"
              : "Edit Shop"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View shop details."
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
        <form.Field name="logoUrl">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Logo URL</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
              <FieldDescription>
                Optional public image URL for this shop logo.
              </FieldDescription>
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

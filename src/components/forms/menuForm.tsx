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
import type { SelectMenu as Menu } from "@/db/schema";

type MenuSubmitValues = Omit<Menu, "id" | "createdAt" | "updatedAt">;

type MenuFormBaseProps = {
  initialData?: Partial<Menu>;
  onCancel?: () => void;
};

type MenuFormViewProps = MenuFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type MenuFormEditProps = MenuFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: MenuSubmitValues) => Promise<void>;
};

type MenuFormProps = MenuFormViewProps | MenuFormEditProps;

export function MenuForm({ mode, initialData, onSubmit, onCancel }: MenuFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? null,
      coverPhotoUrl: initialData?.coverPhotoUrl ?? null,
      date: initialData?.date ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        name: value.name,
        description: value.description,
        coverPhotoUrl: value.coverPhotoUrl,
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
          {mode === "view" ? "Menu Details" : isCreate ? "Create Menu" : "Edit Menu"}
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
              <FieldDescription>Optional public URL for menu cover photo.</FieldDescription>
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

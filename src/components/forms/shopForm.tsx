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
import type { SelectShop as Shop } from "@/db/schema";

type ShopSubmitValues = Omit<Shop, "id" | "createdAt" | "updatedAt">;

type ShopFormBaseProps = {
  initialData?: Partial<Shop>;
  shopId?: number;
  onCancel?: () => void;
};

type ShopFormViewProps = ShopFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type ShopFormEditProps = ShopFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: ShopSubmitValues) => Promise<void>;
};

type ShopFormProps = ShopFormViewProps | ShopFormEditProps;

export function ShopForm({ mode, initialData, onSubmit, onCancel }: ShopFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      logoUrl: initialData?.logoUrl ?? null,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        name: value.name,
        logoUrl: value.logoUrl,
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
          {mode === "view" ? "Shop Details" : isCreate ? "Create Shop" : "Edit Shop"}
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

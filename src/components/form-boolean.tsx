import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { Checkbox } from "./ui/checkbox";

type FormDateProps<TForm> = {
  form: ReactFormExtendedApi<
    TForm,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  name: keyof TForm & string;
  label: string;
  description?: string | null;
  isReadOnly: boolean;
  required?: boolean;
};

export default function FormBoolean<TForm>({
  form,
  name,
  label,
  description = null,
  isReadOnly,
  required = false,
}: FormDateProps<TForm>) {
  return (
    <form.Field name={name}>
      {(field) => (
        <Field orientation="horizontal">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Checkbox
            name={field.name}
            checked={field.state.value as boolean}
            onCheckedChange={(checked) =>
              // field.handleChange((checked === true) as never)
              field.handleChange(checked as never)
            }
            required={required}
            disabled={isReadOnly}
            className={
              isReadOnly ? "disabled:bg-white disabled:opacity-100" : undefined
            }
          />
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    </form.Field>
  );
}

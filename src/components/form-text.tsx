import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ReactFormExtendedApi } from "@tanstack/react-form";

type FormTextProps<TForm> = {
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
  isReadOnly: boolean;
  description?: string | null;
  required?: boolean;
};

export default function FormText<TForm>({
  form,
  name,
  label,
  isReadOnly,
  description = null,
  required = false,
}: FormTextProps<TForm>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={isReadOnly}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    </form.Field>
  );
}

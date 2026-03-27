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

export default function FormDecimal<TForm>({
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
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          <Input
            type="number"
            step="0.01"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
            disabled={isReadOnly}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    </form.Field>
  );
}

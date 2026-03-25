import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ReactFormExtendedApi } from "@tanstack/react-form";

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
};

export default function FormDate<TForm>({
  form,
  name,
  label,
  description = null,
  isReadOnly,
}: FormDateProps<TForm>) {
  return (
    <form.Field name={name}>
      {(field) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            type="date"
            name={field.name}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value as any)}
            disabled={isReadOnly}
          />
            {description && <FieldDescription>{description}</FieldDescription>}   
        </Field>
      )}
    </form.Field>
  );
}

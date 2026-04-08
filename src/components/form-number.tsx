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
  onValueChange?: (value: number) => void;
};

export default function FormNumber<TForm>({
  form,
  name,
  label,
  isReadOnly,
  description = null,
  required = false,
  onValueChange,
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
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            min={1}
            defaultValue={1}
            onChange={(e) => {
              const value = Number(e.target.value);
              field.handleChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            disabled={isReadOnly}
            required={required}
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

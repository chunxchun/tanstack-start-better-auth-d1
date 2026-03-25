import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ReactFormExtendedApi } from "@tanstack/react-form";

type FormSelectProps<T, TForm> = {
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
  list: T[];
  valueKey: (item: T) => string | number;
  labelKey: (item: T) => string;
  description?: string | null;
};

export default function FormSelect<T, TForm>({
  form,
  name,
  label,
  isReadOnly,
  list,
  valueKey,
  labelKey,
  description = null,
}: FormSelectProps<T, TForm>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select
            value={String(field.state.value)}
            disabled={isReadOnly}
            onValueChange={(e) => field.handleChange(e)}
          >
            <SelectTrigger onBlur={field.handleBlur}>
              <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {list?.map((item: T) => (
                <SelectItem key={valueKey(item)} value={String(valueKey(item))}>
                  {labelKey(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    </form.Field>
  );
}

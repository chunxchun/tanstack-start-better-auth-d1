import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
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
  list?: T[];
  valueKey: (item: T) => string | number;
  labelKey: (item: T) => string;
  description?: string | null;
  required?: boolean;
  initialValue?: string | undefined;
  onValueChange?: (value: string) => void;
};

export default function FormSelect<T, TForm>({
  form,
  name,
  label,
  isReadOnly,
  list = [],
  valueKey,
  labelKey,
  description = null,
  required = false,
  initialValue = undefined,
  onValueChange,
}: FormSelectProps<T, TForm>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>

          <Select
            value={initialValue ?? String(field.state.value)}
            onValueChange={(e) => {
              field.handleChange(e);
              onValueChange?.(e);
            }}
            disabled={isReadOnly}
          >
            <SelectTrigger
              onBlur={field.handleBlur}
              disabled={list.length === 0}
            >
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            {!isReadOnly && list.length === 0 && (
              <FieldError>{`No ${label.toLowerCase()} available, go create one`}</FieldError>
            )}
            <SelectContent>
              {list?.map((item: T) => (
                <SelectItem key={valueKey(item)} value={String(valueKey(item))}>
                  {labelKey(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isReadOnly && list.length > 0 && description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
        </Field>
      )}
    </form.Field>
  );
}

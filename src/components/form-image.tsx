import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { getVersionedImageUrl } from "@/lib/utils";
import { type ReactFormExtendedApi } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import type { Dispatch, SetStateAction } from "react";

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
  description?: string | null;
  required?: boolean;
  file?: File | null;
  onChange?: React.Dispatch<SetStateAction<File | null>>;
};

export default function FormSelect<T, TForm>({
  form,
  name,
  label,
  isReadOnly,
  description = null,
  required = false,
  file,
  onChange,
}: FormSelectProps<T, TForm>) {

  const src = getVersionedImageUrl(
    form.getFieldValue(name) as string,
    form.getFieldValue("updatedAt") as string,
  );

  form
  return (
    <form.Field name={name}>
      {(field) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          {isReadOnly ? (
            src ? (
              <img src={src} alt={label} className="max-h-32 object-contain" />
            ) : (
              <FieldDescription>
                No {label.toLowerCase()} uploaded.
              </FieldDescription>
            )
          ) : (
            <>
              <Input
                name={field.name}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                type="file"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (!file) {
                    // field.handleChange(null);
                    onChange(null);
                    return;
                  }
                  field.handleChange(file.name);
                  onChange(file);
                }}
              />
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </>
          )}
        </Field>
      )}
    </form.Field>
  );
}

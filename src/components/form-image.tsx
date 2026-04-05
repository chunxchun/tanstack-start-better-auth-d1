import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { getVersionedImageUrl } from "@/lib/utils";
import { type ReactFormExtendedApi } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import type { Dispatch, SetStateAction } from "react";

type FormSelectProps<TForm> = {
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
  // file?: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  lastUpdatedAt?: number;
};

export default function FormSelect<TForm>({
  form,
  name,
  label,
  isReadOnly,
  description = null,
  required = false,
  // file,
  setFile,
  lastUpdatedAt,
}: FormSelectProps<TForm>) {
  const imageUrl = getVersionedImageUrl(
    form.getFieldValue("imageUrl") as string,
    lastUpdatedAt,
  );

  return (
    <form.Field name={name}>
      {(field) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          {isReadOnly ? (
            field.state.value ? (
              <img
                src={imageUrl}
                alt={label}
                className="max-h-32 object-contain"
              />
            ) : (
              <FieldDescription>
                No {label.toLowerCase()} uploaded.
              </FieldDescription>
            )
          ) : (
            // edit or create
            <>
              {lastUpdatedAt ? (
                <img
                  src={imageUrl}
                  alt={label}
                  className="max-h-32 object-contain"
                />
              ) : null}
              <Input
                type="file"
                name={field.name}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (!file) {
                    // field.handleChange(null);
                    setFile(null);
                    return;
                  }
                  // field.handleChange(file.name);
                  setFile(file);
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

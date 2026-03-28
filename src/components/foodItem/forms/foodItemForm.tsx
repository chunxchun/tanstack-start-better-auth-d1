import FormDecimal from "@/components/form-decimal";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { currencyValues } from "@/db/schema/commonSchema";
import {
  foodCategoryValues,
  type InsertFoodItemType,
  type UpdateFoodItemType,
} from "@/db/schema/foodItemTable";
import { getImageValidationError, uploadImage } from "@/lib/imageUpload";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { FoodItemFormProps } from "./foodItemFormType";

export function FoodItemForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
}: FoodItemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      name: "",
      imageUrl: null,
      description: null,
      category: "bento",
      skuCode: "",
      price: null,
      currency: "AUD",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          await onSubmit(value as UpdateFoodItemType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertFoodItemType);
        }
      } catch (error) {
        console.error("Error submitting food item form:", error);
      } finally {
        setIsLoading(false);
      }
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
      <FormHeader
        module="Food Item"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8">
        {/* name */}
        <FormText
          form={form}
          name="name"
          label="Name"
          isReadOnly={isReadOnly}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            isReadOnly={isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            description="Select the shop for this delivery."
            required
          />

          {/* image */}
          <form.Field name="imageUrl">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/*"
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];

                    if (!file) {
                      return;
                    }

                    const validationError = getImageValidationError(file);
                    if (validationError) {
                      setUploadError(validationError);
                      return;
                    }

                    try {
                      setUploadError(null);
                      const data = await uploadImage(file);
                      field.handleChange(data.url || null);
                    } catch {
                      setUploadError(
                        "Failed to upload image. Please try again.",
                      );
                    }
                  }}
                />
                {uploadError ? (
                  <FieldDescription className="text-destructive">
                    {uploadError}
                  </FieldDescription>
                ) : null}
                {field.state.value ? (
                  <FieldDescription>
                    Uploaded URL: {field.state.value}
                  </FieldDescription>
                ) : null}
              </Field>
            )}
          </form.Field>
        </div>

        {/* description */}
        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />

        {/* category */}
        <FormSelect
          form={form}
          name="category"
          label="Category"
          list={[...foodCategoryValues]}
          valueKey={(item) => item}
          labelKey={(item) => item}
          isReadOnly={isReadOnly}
          required
        />

        {/* sku */}
        <FormText
          form={form}
          name="skuCode"
          label="SKU Code"
          isReadOnly={isReadOnly}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* price */}
          <FormDecimal
            form={form}
            name="price"
            label="Price"
            isReadOnly={isReadOnly}
            required
          />

          {/* currency */}
          <FormSelect
            form={form}
            name="currency"
            label="Currency"
            isReadOnly={isReadOnly}
            list={[...currencyValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            required
          />
        </div>
      </FieldGroup>

      <FormFooter
        isCreate={isCreate}
        isReadOnly={isReadOnly}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </form>
  );
}

import FormDecimal from "@/components/form-decimal";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormImage from "@/components/form-image";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import { FieldGroup } from "@/components/ui/field";
import { currencyValues } from "@/db/schema/commonSchema";
import {
  foodCategoryValues,
  type InsertFoodItemType,
  type UpdateFoodItemType,
} from "@/db/schema/foodItemTable";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { FoodItemFormProps } from "./foodItemFormType";

export function FoodItemForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
  defaultShopId,
}: FoodItemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
          await onSubmit(
            value as UpdateFoodItemType,
            imageFile ?? undefined,
            defaultShopId ?? undefined,
          );
        }

        if (mode === "create") {
          await onSubmit(
            value as InsertFoodItemType,
            imageFile ?? undefined,
            defaultShopId ?? undefined,
          );
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

      <FieldGroup className="field-group-container">
        <div className="form-half-width">
          {/* name */}
          <FormText
            form={form}
            name="name"
            label="Name"
            isReadOnly={isReadOnly}
            required
          />

          {/* shop */}
          <FormSelect
            form={form}
            initialValue={defaultShopId ? String(defaultShopId) : undefined}
            name="shopId"
            label="Shop"
            isReadOnly={!!defaultShopId || isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            description="Select the shop for this food item."
            required
          />
        </div>
        {/* description */}
        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* image */}
          <FormImage
            form={form}
            name="imageUrl"
            label="Image"
            isReadOnly={isReadOnly}
            description="Upload an image for this food item."
            setFile={setImageFile}
            lastUpdatedAt={initialData?.updatedAt}
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
        </div>
        {/* sku */}
        <FormText
          form={form}
          name="skuCode"
          label="SKU Code"
          isReadOnly={isReadOnly}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          {/* price */}
          <FormDecimal
            form={form}
            name="price"
            label="Price"
            isReadOnly={isReadOnly}
            required
          />{" "}
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

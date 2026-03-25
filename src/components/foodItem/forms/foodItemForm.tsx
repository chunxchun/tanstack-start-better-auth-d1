import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type {
  InsertFoodItemType,
  UpdateFoodItemType,
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
        if (mode === "edit") {
          await onSubmit(value as UpdateFoodItemType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertFoodItemType);
        }
      } catch (error) {
        console.error("Error submitting food item form:", error);
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
      <DialogHeader>
        <DialogTitle>
          {mode === "view"
            ? "Food Item Details"
            : isCreate
              ? "Create Food Item"
              : "Edit Food Item"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View food item details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        {/* shop */}
        <form.Field name="shopId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Shop ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
              />
            </Field>
          )}
        </form.Field>

        {/* name */}
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

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
                    setUploadError("Failed to upload image. Please try again.");
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

        {/* description */}
        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
              <FieldDescription>
                Optional short item description.
              </FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* category */}
        <form.Field name="category">
          {(field) => (
            <Field className="md:w-1/2">
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "bento"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as "bento" | "snack" | "drink",
                  )
                }
              >
                <option value="bento">bento</option>
                <option value="snack">snack</option>
                <option value="drink">drink</option>
              </select>
            </Field>
          )}
        </form.Field>

        {/* sku */}
        <form.Field name="skuCode">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>SKU Code</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <div className="flex w-full flex-col gap-5 md:flex-row md:gap-4">
          {/* price */}
          <form.Field name="price">
            {(field) => (
              <Field className="md:w-1/2">
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.01"
                  value={String(field.state.value)}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value) || 0)
                  }
                />
              </Field>
            )}
          </form.Field>

          {/* currency */}
          <form.Field name="currency">
            {(field) => (
              <Field className="md:w-1/2">
                <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                <select
                  id={field.name}
                  name={field.name}
                  className="h-9 rounded-md border bg-background px-2 text-sm"
                  value={field.state.value ?? "AUD"}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as "HKD" | "AUD" | "USD" | "EUR" | "JPY",
                    )
                  }
                >
                  <option value="HKD">HKD</option>
                  <option value="AUD">AUD</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="JPY">JPY</option>
                </select>
              </Field>
            )}
          </form.Field>
        </div>
      </FieldGroup>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? (
          <Button type="submit">{isCreate ? "Create" : "Save"}</Button>
        ) : null}
      </DialogFooter>
    </form>
  );
}

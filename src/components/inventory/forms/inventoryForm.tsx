import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormNumber from "@/components/form-number";
import FormSelect from "@/components/form-select";
import { FieldGroup } from "@/components/ui/field";
import type { InsertInventoryType, UpdateInventoryType } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { InventoryFormProps } from "./inventoryFormType";

export function InventoryForm({
  mode,
  initialData,
  shops,
  machines,
  foodItems,
  onSubmit,
  onCancel,
}: InventoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      machineId: null,
      foodItemId: null,
      quantity: 1,
      date: new Date().toISOString().slice(0, 10), // default to today's date
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      try {
        setIsLoading(true);
        if (mode === "edit") {
          const data = value as UpdateInventoryType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertInventoryType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting inventory form:", error);
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
        mode={mode}
        module="Inventory"
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8">
        <div className="form-half-width">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly}
          />

          {/* machine */}
          <FormSelect
            form={form}
            name="machineId"
            label="Machine ID"
            list={machines || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly}
          />

          {/* food item */}
          <FormSelect
            form={form}
            name="foodItemId"
            label="Food Item ID"
            list={foodItems || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly}
          />

          {/* quantity */}
          <FormNumber
            form={form}
            name="quantity"
            label="Quantity"
            isReadOnly={isReadOnly}
          />

          {/* date */}
          <FormDate
            form={form}
            name="date"
            label="Date"
            isReadOnly={isReadOnly}
          />
        </div>
      </FieldGroup>

      <FormFooter
        isReadOnly={isReadOnly}
        isCreate={isCreate}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </form>
  );
}

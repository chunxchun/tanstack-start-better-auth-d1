import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormNumber from "@/components/form-number";
import FormSelect from "@/components/form-select";
import FormTime from "@/components/form-time";
import { FieldGroup } from "@/components/ui/field";
import {
  disposeReasonValues,
  type InsertDisposeType,
  type UpdateDisposeType,
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { DisposeFormProps } from "./disposeFormType";

export function DisposeForm({
  mode,
  initialData,
  shops,
  foodItems,
  machines,
  onSubmit,
  onCancel,
}: DisposeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      machineId: null,
      foodItemId: null,
      disposeDate: new Date().toISOString().slice(0, 10),
      disposeTime: "18:00",
      quantity: 1,
      disposeReason: "other",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);

        if (mode === "edit") {
          await onSubmit(value as UpdateDisposeType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertDisposeType);
        }
      } catch (error) {
        console.error("Error submitting dispose form:", error);
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
        isCreate={isCreate}
        isReadOnly={isReadOnly}
        module="Dispose"
      />

      <FieldGroup className="overflow-auto mt-8 mb-8">
        <div className="grid grid-cols-2 gap-4 max-w-full lg:grid-cols-2 md:grid-cols-1">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            isReadOnly={isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
          />

          {/* machine */}
          <FormSelect
            form={form}
            name="machineId"
            label="Machine"
            isReadOnly={isReadOnly}
            list={machines || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
          />

          {/* food item */}
          <FormSelect
            form={form}
            name="foodItemId"
            label="Food Item"
            isReadOnly={isReadOnly}
            list={foodItems || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
          />

          {/* dispose reason */}
          <FormSelect
            form={form}
            name="disposeReason"
            label="Dispose Reason"
            isReadOnly={isReadOnly}
            list={[...disposeReasonValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
          />

          {/* dispose date */}
          <FormDate
            form={form}
            name="disposeDate"
            label="Dispose Date"
            isReadOnly={isReadOnly}
          />

          {/* dispose time */}
          <FormTime
            form={form}
            name="disposeTime"
            label="Dispose Time"
            isReadOnly={isReadOnly}
          />

          {/* quantity */}
          <FormNumber
            form={form}
            name="quantity"
            label="Quantity"
            isReadOnly={isReadOnly}
          />

          {/* dispose reason */}
          <FormSelect
            form={form}
            name="disposeReason"
            label="Dispose Reason"
            isReadOnly={isReadOnly}
            list={[...disposeReasonValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
          />
        </div>
      </FieldGroup>

      <FormFooter
        onCancel={onCancel}
        isReadOnly={isReadOnly}
        isCreate={isCreate}
        isLoading={isLoading}
      />
    </form>
  );
}

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
  type SelectFoodItemType,
  type UpdateDisposeType,
} from "@/db/schema";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import type { DisposeFormProps } from "./disposeFormType";

export function DisposeForm({
  mode,
  initialData,
  shops,
  foodItems,
  machines,
  onSubmit,
  onCancel,
  defaultShopId,
}: DisposeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFoodItems, setDynamicFoodItems] = useState<SelectFoodItemType[]>(foodItems ?? []);
  const initialShopId = useRef(defaultShopId ?? initialData?.shopId ?? null);

  const form = useForm({
    defaultValues: initialData || {
      shopId: defaultShopId || null,
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

  const [selectedShopId, setSelectedShopId] = useState<number | null>(
    defaultShopId ?? initialData?.shopId ?? null,
  );

  useEffect(() => {
    if (selectedShopId === initialShopId.current) return;

    if (selectedShopId == null) {
      setDynamicFoodItems([]);
      return;
    }

    listFoodItemFn({ data: { limit: 100, offset: 0, shopId: selectedShopId } })
      .then((items) => setDynamicFoodItems(items))
      .catch(console.error);

    form.setFieldValue("foodItemId", null as any);
  }, [selectedShopId]);

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
            initialValue={defaultShopId ? String(defaultShopId) : undefined}
            name="shopId"
            label="Shop"
            isReadOnly={!!defaultShopId || isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            required
            onValueChange={(val) => setSelectedShopId(Number(val) || null)}
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
            required
          />

          {/* food item */}
          <FormSelect
            form={form}
            name="foodItemId"
            label="Food Item"
            isReadOnly={isReadOnly}
            list={dynamicFoodItems}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            required
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
            required
          />

          {/* dispose date */}
          <FormDate
            form={form}
            name="disposeDate"
            label="Dispose Date"
            isReadOnly={isReadOnly}
            required
          />

          {/* dispose time */}
          <FormTime
            form={form}
            name="disposeTime"
            label="Dispose Time"
            isReadOnly={isReadOnly}
            required
          />

          {/* quantity */}
          <FormNumber
            form={form}
            name="quantity"
            label="Quantity"
            isReadOnly={isReadOnly}
            required
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
            required
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

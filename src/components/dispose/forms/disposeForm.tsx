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
import { listFoodItemByShopIdFn } from "@/utils/foodItem/foodItem.function";
import { listMachineByShopIdFn } from "@/utils/machine/machine.function";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { DisposeFormProps } from "./disposeFormType";

export function DisposeForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
  defaultShopId,
}: DisposeFormProps) {
  const [isLoading, setIsLoading] = useState(false);

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

  const formSelectedShopId = useStore(
    form.store,
    (state) => state.values.shopId,
  );

  const { data: machines = [], isLoading: isLoadingMachines } = useQuery({
    queryKey: ["machines", formSelectedShopId],
    queryFn: () =>
      listMachineByShopIdFn({ data: { shopId: formSelectedShopId } }),
    enabled: !!formSelectedShopId,
  });

  const { data: foodItems = [], isLoading: isLoadingFoodItems } = useQuery({
    queryKey: ["foodItems", formSelectedShopId],
    queryFn: () =>
      listFoodItemByShopIdFn({ data: { shopId: formSelectedShopId } }),
    enabled: !!formSelectedShopId,
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

      <FieldGroup className="field-group-container">
        <div className="form-half-width">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            // initialValue={defaultShopId ? String(defaultShopId) : undefined}
            isReadOnly={!!defaultShopId || isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            required
            onValueChange={() => {
              form.setFieldValue("machineId", null as never);
              form.setFieldValue("foodItemId", null as never);
            }}
          />

          {/* machine */}
          <FormSelect
            form={form}
            name="machineId"
            label="Machine"
            isReadOnly={isReadOnly || isLoadingMachines}
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
            isReadOnly={isReadOnly || isLoadingFoodItems}
            list={foodItems || []}
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

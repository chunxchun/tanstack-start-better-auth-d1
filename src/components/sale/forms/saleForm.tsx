import FormDate from "@/components/form-date";
import FormDecimal from "@/components/form-decimal";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormNumber from "@/components/form-number";
import FormSelect from "@/components/form-select";
import FormTime from "@/components/form-time";
import { FieldGroup } from "@/components/ui/field";
import {
  paymentMethodValues,
  type InsertSaleType,
  type UpdateSaleType,
} from "@/db/schema";
import { currencyValues } from "@/db/schema/commonSchema";
import { listMachineByShopIdFn } from "@/utils/machine/machine.function";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { defaultSaleFormValues, type SaleFormProps } from "./saleFormType";
import { listFoodItemByShopIdFn } from "@/utils/foodItem/foodItem.function";

export function SaleForm({
  mode,
  initialData,
  shops,
  // machines,
  // foodItems = [],
  onSubmit,
  onCancel,
  defaultShopId,
}: SaleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedShopId, setSelectedShopId] = useState<number | null>(
  //   defaultShopId ?? initialData?.shopId ?? null,
  // );

  const form = useForm({
    defaultValues: initialData || defaultSaleFormValues,
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          const data = value as UpdateSaleType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertSaleType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting sale form:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isReadOnly = mode === "view";
  const isCreate = mode === "create";

  const formSelectedShopId = useStore(
    form.store,
    (state) => state.values.shopId,
  );

  const { data: machines = [], isLoading: isLoadingMachines } = useQuery({
    queryKey: ["machines", formSelectedShopId],
    queryFn: () =>
      listMachineByShopIdFn({ data: { shopId: Number(formSelectedShopId) } }),
    // enabled: hasValidShopId,
  });

  const { data: foodItems = [], isLoading: isLoadingFoodItems } = useQuery({
    queryKey: ["foodItems", formSelectedShopId],
    queryFn: () =>
      listFoodItemByShopIdFn({ data: { shopId: Number(formSelectedShopId) } }),
    // enabled: hasValidShopId,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormHeader
        module="Sale"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />
      <FieldGroup className="field-group-container">
        <div className="form-half-width">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
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
          {/* machine selection depends on selected shop */}

          <FormSelect
            form={form}
            name="machineId"
            label="Machine"
            list={machines || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly || isLoadingMachines}
            required
          />

          {/* food item */}
          {/* food item selection depends on selected shop */}
          <FormSelect
            form={form}
            name="foodItemId"
            label="Food Item"
            list={foodItems || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly || isLoadingFoodItems}
            onValueChange={(value) => {
              const selectedFoodItem = foodItems.find(
                (item) => item.id === Number(value),
              );
              form.setFieldValue(
                "unitPrice",
                selectedFoodItem ? selectedFoodItem.price : 0,
              );
              form.setFieldValue(
                "currency",
                selectedFoodItem ? selectedFoodItem.currency : "AUD",
              );
              form.setFieldValue(
                "totalPrice",
                selectedFoodItem
                  ? selectedFoodItem.price * form.getFieldValue("quantity")
                  : 0,
              );
            }}
            required
          />
        </div>

        <div className="form-half-width">
          {/* sale date */}
          <FormDate
            form={form}
            name="saleDate"
            label="Sale Date"
            isReadOnly={isReadOnly}
            required
          />

          {/* sale time */}
          <FormTime
            form={form}
            name="saleTime"
            label="Sale Time"
            isReadOnly={isReadOnly}
            required
          />

          {/* currency */}
          <FormSelect
            form={form}
            name="currency"
            label="Currency"
            list={currencyValues}
            valueKey={(item) => item}
            labelKey={(item) => item}
            isReadOnly={true}
            required
          />

          {/* unit price */}
          <FormDecimal
            form={form}
            name="unitPrice"
            label="Unit Price"
            isReadOnly={true}
            required
          />

          {/* quantity */}
          <FormNumber
            form={form}
            name="quantity"
            label="Quantity"
            isReadOnly={isReadOnly}
            onValueChange={(value) => {
              const unitPrice = form.getFieldValue("unitPrice");
              const totalPrice = value * unitPrice;
              form.setFieldValue("totalPrice", totalPrice);
            }}
            required
          />

          {/* total price */}
          <FormDecimal
            form={form}
            name="totalPrice"
            label="Total Price"
            isReadOnly={true}
            required
          />

          {/* payment method */}
          <FormSelect
            form={form}
            name="paymentMethod"
            label="Payment Method"
            list={[...paymentMethodValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            isReadOnly={isReadOnly}
            required
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

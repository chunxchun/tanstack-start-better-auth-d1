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
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { SaleFormProps } from "./saleFormType";

export function SaleForm({
  mode,
  initialData,
  shops,
  machines,
  foodItems = [],
  onSubmit,
  onCancel,
}: SaleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: initialData || {
      machineId: null,
      foodItemId: null,
      shopId: null,
      saleDate: new Date().toISOString().slice(0, 10), // default to today's date
      saleTime: "12:00",
      quantity: 1,
      currency: "AUD",
      unitPrice: null,
      totalPrice: null,
      paymentMethod: "cash",
    },
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

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
        <div className="form-half-width">
          {/* machine */}
          <FormSelect
            form={form}
            name="machineId"
            label="Machine"
            list={machines || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly}
          />

          {/* food item */}
          <FormSelect
            form={form}
            name="foodItemId"
            label="Food Item"
            list={foodItems || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={isReadOnly}
          />

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

          {/* sale date */}
          <FormDate
            form={form}
            name="saleDate"
            label="Sale Date"
            isReadOnly={isReadOnly}
          />

          {/* sale time */}
          <FormTime
            form={form}
            name="saleTime"
            label="Sale Time"
            isReadOnly={isReadOnly}
          />

          {/* quantity */}
          <FormNumber
            form={form}
            name="quantity"
            label="Quantity"
            isReadOnly={isReadOnly}
          />

          {/* currency */}
          <FormSelect
            form={form}
            name="currency"
            label="Currency"
            list={currencyValues}
            valueKey={(item) => item}
            labelKey={(item) => item}
            isReadOnly={isReadOnly}
          />

          {/* unit price */}
          <FormDecimal
            form={form}
            name="unitPrice"
            label="Unit Price"
            isReadOnly={isReadOnly}
          />

          {/* total price */}
          <FormDecimal
            form={form}
            name="totalPrice"
            label="Total Price"
            isReadOnly={isReadOnly}
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

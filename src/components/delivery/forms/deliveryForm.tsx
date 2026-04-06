import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import FormTime from "@/components/form-time";
import { FieldGroup } from "@/components/ui/field";
import {
  deliveryStatusValues,
  type InsertDeliveryType,
  type UpdateDeliveryType,
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { DeliveryFormProps } from "./deliveryFormType";

export function DeliveryForm({
  mode,
  initialData,
  shops,
  locations,
  machines,
  onSubmit,
  onCancel,
  defaultShopId,
}: DeliveryFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      destinationLocationId: null,
      machineId: null,
      shopId: null,
      courierReference: "",
      deliverDate: "",
      deliverTime: "",
      status: "scheduled",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      setIsLoading(true);
      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateDeliveryType);
          toast.success("Delivery updated successfully");
        }

        if (mode === "create") {
          await onSubmit(value as InsertDeliveryType);
          toast.success("Delivery created successfully");
        }
      } catch (error) {
        console.error("Error submitting delivery form:", error);
        toast.error("Error submitting delivery form");
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
        module="Delivery"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* destination  */}
          <FormSelect
            form={form}
            name="destinationLocationId"
            label="Destination"
            isReadOnly={isReadOnly}
            list={locations || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            description="Select the delivery destination."
            required
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
            description="Select the machine for delivery."
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
            description="Select the shop for this delivery."
            required
          />

          {/* status */}
          <FormSelect
            form={form}
            name="status"
            label="Status"
            isReadOnly={isReadOnly}
            list={[...deliveryStatusValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            description={`Status of the delivery. Defaults to "scheduled".`}
            required
          />
        </div>

        {/* courier reference */}
        <FormText
          form={form}
          name="courierReference"
          label="Courier Reference"
          isReadOnly={isReadOnly}
          description="Optional reference provided by courier."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* delivery date */}
          <FormDate
            form={form}
            name="deliverDate"
            label="Delivery Date"
            isReadOnly={isReadOnly}
            description="Date of the delivery"
            required
          />

          {/* delivery time */}
          <FormTime
            form={form}
            name="deliverTime"
            label="Delivery Time"
            isReadOnly={isReadOnly}
            description={`Expected delivery time`}
            required
          />
        </div>
      </FieldGroup>

      <FormFooter
        onCancel={onCancel}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
        isLoading={isLoading}
      />
    </form>
  );
}

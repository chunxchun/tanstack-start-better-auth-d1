import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormText from "@/components/form-text";
import { FieldGroup } from "@/components/ui/field";
import { countryValues } from "@/db/schema/commonSchema";
import {
  locationStatusValues,
  type InsertLocationType,
  type UpdateLocationType,
} from "@/db/schema/locationTable";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { LocationFormProps } from "./locationFormType";
import FormSelect from "@/components/form-select";

export function LocationForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
}: LocationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      name: "",
      description: null,
      status: "active",
      addressLine1: "",
      addressLine2: null,
      addressCity: "",
      addressState: null,
      addressPostalCode: null,
      addressCountry: "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          await onSubmit(value as UpdateLocationType);
          toast.success("Location updated successfully");
        }

        if (mode === "create") {
          await onSubmit(value as InsertLocationType);
          toast.success("Location created successfully");
        }
      } catch (error) {
        console.error("Error saving location:", error);
        toast.error("Error saving location");
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
        module="Location"
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
        {/* name */}
        <FormText
          form={form}
          name="name"
          label="Name"
          isReadOnly={isReadOnly}
          required
        />

        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />

        {/* address line 1 */}
        <FormText
          form={form}
          name="addressLine1"
          label="Address Line 1"
          required
          isReadOnly={isReadOnly}
        />

        {/* address line 2 */}
        <FormText
          form={form}
          name="addressLine2"
          label="Address Line 2"
          isReadOnly={isReadOnly}
        />

        <div className="form-half-width">
          {/* address city */}
          <FormText
            form={form}
            name="addressCity"
            label="City"
            required
            isReadOnly={isReadOnly}
          />

          {/* address state */}
          <FormText
            form={form}
            name="addressState"
            label="State"
            isReadOnly={isReadOnly}
          />

          {/* address postal code */}
          <FormText
            form={form}
            name="addressPostalCode"
            label="Postal Code"
            isReadOnly={isReadOnly}
          />

          {/* address country */}
          <FormSelect
            form={form}
            name="addressCountry"
            label="Country"
            isReadOnly={isReadOnly}
            list={[...countryValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            description="Select the country for this location."
            required
          />

          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            isReadOnly={isReadOnly}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            description="Select the shop associated with this location."
            required
          />

          {/* status */}
          <FormSelect
            form={form}
            name="status"
            label="Status"
            isReadOnly={isReadOnly}
            list={[...locationStatusValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            description="Select the location status."
          />
        </div>
      </FieldGroup>

      <FormFooter
        onCancel={onCancel}
        isLoading={isLoading}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />
    </form>
  );
}

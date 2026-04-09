import FormBoolean from "@/components/form-boolean";
import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import { FieldGroup } from "@/components/ui/field";
import {
  machineModeValues,
  machineStatusValues,
  machineVersionValues,
  type InsertMachineType,
  type UpdateMachineType,
} from "@/db/schema/machineTable";
import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { MachineFormProps } from "./machineFormType";
import { useQuery } from "@tanstack/react-query";
import { listLocationByShopIdFn } from "@/utils/location/location.function";

export function MachineForm({
  mode,
  initialData,
  shops,
  // locations,
  onSubmit,
  onCancel,
  defaultShopId,
}: MachineFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      locationId: null,
      shopId: defaultShopId || null,
      name: "",
      description: null,
      serialNumber: "",
      status: "active",
      version: "V6",
      mode: "sold",
      installationDate: null,
      dayEndStockAutoReset: true,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          await onSubmit(value as UpdateMachineType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertMachineType);
        }
      } catch (error) {
        console.error("Error saving machine:", error);
        toast.error("Error saving machine");
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

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["locations", formSelectedShopId],
    queryFn: () =>
      listLocationByShopIdFn({ data: { shopId: formSelectedShopId } }),
    enabled: !!formSelectedShopId,
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
        module="Machine"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
        <div className="form-half-width">
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            initialValue={defaultShopId ? String(defaultShopId) : undefined}
            list={shops || []}
            isReadOnly={!!defaultShopId || isReadOnly}
            valueKey={(shop) => shop.id}
            labelKey={(shop) => shop.name}
            description="Select the shop associated with this machine."
            required
            onValueChange={() => {
              form.setFieldValue("locationId", null as never);
            }}
          />

          <FormSelect
            form={form}
            name="locationId"
            label="Location"
            isReadOnly={isReadOnly || isLoadingLocations}
            list={locations || []}
            valueKey={(location: any) => location.id}
            labelKey={(location: any) => location.name}
            required
          />
        </div>

        {/* name */}
        <FormText
          form={form}
          name="name"
          label="Name"
          isReadOnly={isReadOnly}
          required
        />

        {/* description */}
        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />

        {/* serial number */}
        <FormText
          form={form}
          name="serialNumber"
          label="Serial Number"
          isReadOnly={isReadOnly}
        />

        {/* Row: status & version */}

        <div className="form-half-width">
          {/* status */}
          <FormSelect
            form={form}
            name="status"
            label="Status"
            isReadOnly={isReadOnly}
            list={[...machineStatusValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            required
          />

          {/* version */}
          <FormSelect
            form={form}
            name="version"
            label="Version"
            isReadOnly={isReadOnly}
            list={[...machineVersionValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
            required
          />

          {/* mode */}

          <FormSelect
            form={form}
            name="mode"
            label="Mode"
            isReadOnly={isReadOnly}
            list={[...machineModeValues]}
            valueKey={(item) => item}
            labelKey={(item) => item}
          />

          {/* installation date */}
          <FormDate
            form={form}
            name="installationDate"
            label="Installation Date"
            isReadOnly={isReadOnly}
          />
        </div>
        <div className="form-half-width">
          {/* day end stock auto reset */}
          <FormBoolean
            form={form}
            name="dayEndStockAutoReset"
            label="Day End Stock Auto Reset"
            isReadOnly={isReadOnly}
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

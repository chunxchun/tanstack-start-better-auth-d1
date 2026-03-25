import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { MachineFormProps } from "./machineFormType";
import {
  machineModeValues,
  machineStatusValues,
  machineVersionValues,
  type InsertMachineType,
  type UpdateMachineType,
} from "@/db/schema/machineTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import { Form } from "radix-ui";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import FormFooter from "@/components/form-footer";

export function MachineForm({
  mode,
  initialData,
  shops,
  locations,
  onSubmit,
  onCancel,
}: MachineFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      locationId: null,
      shopId: null,
      name: "",
      serialNumber: "",
      status: "active",
      version: "V6",
      mode: "sold",
      dayEndStockAutoReset: true,
      description: null,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      setIsLoading(true);
      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateMachineType);
          toast.success("Machine updated successfully");
        }

        if (mode === "create") {
          await onSubmit(value as InsertMachineType);
          toast.success("Machine created successfully");
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <CardHeader>
        <CardTitle>
          {isReadOnly
            ? "Machine Details"
            : isCreate
              ? "Create Machine"
              : "Edit Machine"}
        </CardTitle>
        <CardDescription>
          Fill out the form below and click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto mt-8 mb-8">
        <FieldGroup>
          {/* Row: location & shop */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormSelect
                form={form}
                name={"locationId"}
                label="Location"
                isReadOnly={isReadOnly}
                list={locations || []}
                valueKey={(location: any) => location.id}
                labelKey={(location: any) => location.name}
              />
            </div>
            <div className="w-1/2">
              <FormSelect
                form={form}
                name={"shopId"}
                label="Shop"
                isReadOnly={isReadOnly}
                list={shops || []}
                valueKey={(shop: any) => shop.id}
                labelKey={(shop: any) => shop.name}
              />
            </div>
          </div>

          {/* name */}
          <FormText
            form={form}
            name="name"
            label="Name"
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
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              {/* status */}
              <FormSelect
                form={form}
                name="status"
                label="Status"
                isReadOnly={isReadOnly}
                list={[...machineStatusValues]}
                valueKey={(item) => item}
                labelKey={(item) => item}
              />
            </div>
            <div className="w-1/2">
              {/* version */}
              <FormSelect
                form={form}
                name="version"
                label="Version"
                isReadOnly={isReadOnly}
                list={[...machineVersionValues]}
                valueKey={(item) => item}
                labelKey={(item) => item}
              />
            </div>
          </div>

          {/* Row: mode & dayEndStockAutoReset */}
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
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
            </div>
          </div>
          {/* day end stock auto reset */}
          <form.Field name="dayEndStockAutoReset">
            {(field) => (
              <Field orientation="horizontal">
                <FieldLabel htmlFor={field.name}>
                  Day End Stock Auto Reset
                </FieldLabel>
                <Checkbox
                  name={field.name}
                  checked={field.state.value as boolean}
                  defaultChecked
                />
              </Field>
            )}
          </form.Field>

          {/* description */}
          <FormText
            form={form}
            name="description"
            label="Description"
            isReadOnly={isReadOnly}
          />

          {/* installation date */}
          
        </FieldGroup>
      </CardContent>
      <FormFooter
        onCancel={onCancel}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />
    </form>
  );
}

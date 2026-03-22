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
              <form.Field name="locationId">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      disabled={isReadOnly}
                      onValueChange={(value) =>
                        field.handleChange(Number(value))
                      }
                    >
                      <SelectTrigger onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations?.map((location) => (
                          <SelectItem
                            key={location.id}
                            value={String(location.id)}
                          >
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
            <div className="w-1/2">
              <form.Field name="shopId">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Shop</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      disabled={isReadOnly}
                      onValueChange={(val) =>
                        field.handleChange(val as unknown as number)
                      }
                    >
                      <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select a shop" />
                      </SelectTrigger>
                      <SelectContent>
                        {shops
                          ? shops.map((shop) => (
                              <SelectItem key={shop.id} value={String(shop.id)}>
                                {shop.name}
                              </SelectItem>
                            ))
                          : null}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
          </div>

          {/* name */}
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* serial number */}
          <form.Field name="serialNumber">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Serial Number</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* Row: status & version */}
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              {/* status */}
              <form.Field name="status">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                    <Select
                      value={field.state.value as string}
                      disabled={isReadOnly}
                      onValueChange={(val) =>
                        field.handleChange(val as unknown as string)
                      }
                    >
                      <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {machineStatusValues.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
            <div className="w-1/2">
              {/* version */}
              <form.Field name="version">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Version</FieldLabel>
                    <Select
                      value={field.state.value as string}
                      disabled={isReadOnly}
                      onValueChange={(val) =>
                        field.handleChange(val as unknown as string)
                      }
                    >
                      <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select version  " />
                      </SelectTrigger>
                      <SelectContent>
                        {machineVersionValues.map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
          </div>

          {/* Row: mode & dayEndStockAutoReset */}
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              {/* mode */}
              <form.Field name="mode">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Mode</FieldLabel>
                    <Select
                      value={field.state.value as string}
                      disabled={isReadOnly}
                      onValueChange={(val) =>
                        field.handleChange(val as unknown as string)
                      }
                    >
                      <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {machineModeValues.map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
            <div className="w-1/2 flex items-center">
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
            </div>
          </div>

          {/* description */}
          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* day end stock auto reset
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
          </form.Field> */}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        <Button type="submit" disabled={isLoading}>
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </CardFooter>
    </form>
  );
}

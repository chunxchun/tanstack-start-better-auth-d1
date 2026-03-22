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
import {
  deliveryStatusValues,
  type InsertDeliveryType,
  type UpdateDeliveryType,
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { DeliveryFormProps } from "./deliveryFormType";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

export function DeliveryForm({
  mode,
  initialData,
  shops,
  locations,
  machines,
  onSubmit,
  onCancel,
}: DeliveryFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      destinationLocationId: null,
      machineId: null,
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
      <CardHeader>
        <CardTitle>
          {isReadOnly
            ? "Delivery Details"
            : isCreate
              ? "Create Delivery"
              : "Edit Delivery"}
        </CardTitle>
        <CardDescription>
          {isReadOnly
            ? "View delivery details."
            : "Fill out the form below and click save when you're done."}
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-auto mt-8 mb-8">
        <FieldGroup>
          {/* Row: destination location & machine */}
          <div className="flex gap-4">
            <div className="w-1/2">
              {/* destination  */}
              <form.Field name="destinationLocationId">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Destination</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      disabled={isReadOnly}
                      onValueChange={(e) => field.handleChange(Number(e))}
                    >
                      <SelectTrigger onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations?.map((location) => (
                          <SelectItem key={location.id} value={location.name}>
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
              {/* machine */}
              <form.Field name="machineId">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Machine</FieldLabel>
                    <Select
                      value={String(field.state.value)}
                      disabled={isReadOnly}
                      onValueChange={(e) => field.handleChange(Number(e))}
                    >
                      <SelectTrigger onBlur={field.handleBlur}>
                        <SelectValue placeholder="Select a machine" />
                      </SelectTrigger>
                      <SelectContent>
                        {machines?.map((machine) => (
                          <SelectItem key={machine.id} value={machine.name}>
                            {machine.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>
            </div>
          </div>

          {/* courier reference */}
          <form.Field name="courierReference">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Courier Reference</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                />
                <FieldDescription>
                  Optional reference provided by courier.
                </FieldDescription>
              </Field>
            )}
          </form.Field>

          {/* Row: delivery date & time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              {/* delivery date */}
              <form.Field name="deliverDate">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Delivery Date</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      disabled={isReadOnly}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </div>
            {/* delivery time */}
            <div className="w-1/2">
              <form.Field name="deliverTime">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Delivery Time</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="time"
                      value={field.state.value}
                      disabled={isReadOnly}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </div>
          </div>

          {/* status */}
          <div className="w-1/2">
            <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    value={field.state.value}
                    disabled={isReadOnly}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <SelectTrigger onBlur={field.handleBlur}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryStatusValues.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Status of the delivery. Defaults to "scheduled".
                  </FieldDescription>
                </Field>
              )}
            </form.Field>
          </div>
        </FieldGroup>
      </CardContent>

      <CardFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? (
          <Button type="submit">{isCreate ? "Create" : "Save"}</Button>
        ) : null}
      </CardFooter>
    </form>
  );
}

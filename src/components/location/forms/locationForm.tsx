import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { LocationFormProps } from "./locationFormType";
import {
  locationStatusValues,
  type InsertLocationType,
  type UpdateLocationType,
} from "@/db/schema/locationTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryValues } from "@/db/schema/commonSchema";

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
      setIsLoading(true);
      try {
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
      <CardHeader>
        <CardTitle>
          {isReadOnly
            ? "Location Details"
            : isCreate
              ? "Create Location"
              : "Edit Location"}
        </CardTitle>
        <CardDescription>
          Fill out the form below and click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto mt-8 mb-8">
        <FieldGroup>
          {/* name */}
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  disabled={isReadOnly}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* address line 1 */}
          <form.Field name="addressLine1">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Address Line 1</FieldLabel>
                <Input
                  disabled={isReadOnly}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* address line 2 */}
          <form.Field name="addressLine2">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Address Line 2</FieldLabel>
                <Input
                  id={field.name}
                  disabled={isReadOnly}
                  name={field.name}
                  value={field.state.value || undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* address city */}
          <form.Field name="addressCity">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  disabled={isReadOnly}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* address state */}
          <form.Field name="addressState">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>State</FieldLabel>
                <Input
                  disabled={isReadOnly}
                  id={field.name}
                  name={field.name}
                  value={field.state.value || undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* address postal code */}
          <form.Field name="addressPostalCode">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                <Input
                  disabled={isReadOnly}
                  id={field.name}
                  name={field.name}
                  value={field.state.value || undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* shop */}
          <form.Field name="shopId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Shop</FieldLabel>
                <Select
                  value={String(field.state.value) ?? undefined}
                  onValueChange={(val) => field.handleChange(Number(val))}
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.handleBlur}
                    disabled={isReadOnly}
                  >
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

          {/* status */}
          <form.Field name="status">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.handleBlur}
                    disabled={isReadOnly}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationStatusValues.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          {/* address country */}
          <form.Field name="addressCountry">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.handleBlur}
                    disabled={isReadOnly}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryValues.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
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

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  userRoleValues,
  type InsertUserType,
  type UpdateUserType,
  type UserRoleType,
} from "@/db/schema/authSchema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { UserFormProps } from "./userFormType";

export function UserForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      name: "",
      shopId: null,
      displayName: null,
      role: "staff" as UserRoleType,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      setIsLoading(true);
      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateUserType);
          toast.success("User updated successfully");
        }

        if (mode === "create") {
          await onSubmit(value as InsertUserType);
          toast.success("User created successfully");
        }
      } catch (error) {
        console.error("Error submitting user form:", error);
        toast.error("Error submitting user form");
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
            ? "User Details"
            : isCreate
              ? "Create User"
              : "Edit User"}
        </CardTitle>
        <CardDescription>
          {isReadOnly
            ? "View user details."
            : "Fill out the form below and click save when you're done."}
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-auto mt-8 mb-8">
        <FieldGroup>
          {/* shop */}
          <form.Field name="shopId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Shop</FieldLabel>
                <Select
                  value={String(field.state.value)}
                  disabled={isReadOnly}
                  onValueChange={(val) => field.handleChange(Number(val))}
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue placeholder="Select a shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="">None</SelectItem> */}
                    {shops ? shops.map((shop) => (
                      <SelectItem key={shop.id} value={String(shop.id)}>
                        {shop.name}
                      </SelectItem>
                    )) : null}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="displayName">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                <Select
                  value={field.state.value ?? "staff"}
                  disabled={isReadOnly}
                  onValueChange={(val) =>
                    field.handleChange(val as UserRoleType)
                  }
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoleValues.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
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
        {!isReadOnly ? (
          <Button type="submit" disabled={isLoading}>
            {isCreate ? "Create" : "Save"}
          </Button>
        ) : null}
      </CardFooter>
    </form>
  );
}

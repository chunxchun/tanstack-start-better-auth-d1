import { FieldGroup } from "@/components/ui/field";

import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
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

const allRoles = [...userRoleValues];
const nonAdminRoles = allRoles.filter((role) => role !== "admin");

// const allowedRoles = [...userRoleValues].filter((role) => role !== "admin");

export function UserForm({
  mode,
  initialData,
  shops,
  onSubmit,
  onCancel,
  defaultShopId,
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
          await onSubmit(value as UpdateUserType, imageFile ?? undefined);
        }

        if (mode === "create") {
          await onSubmit(value as InsertUserType, imageFile ?? undefined);
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
      <FormHeader
        module="User"
        mode={mode}
        isReadOnly={isReadOnly}
        isCreate={isCreate}
      />

      <FieldGroup className="field-group-container">
        <div className="flex gap-4">
          {/* shop */}

          <FormSelect
            form={form}
            initialValue={defaultShopId ? String(defaultShopId) : undefined}
            name={"shopId"}
            label="Shop"
            isReadOnly={!!defaultShopId || isReadOnly}
            list={shops || []}
            valueKey={(shop: any) => shop.id}
            labelKey={(shop: any) => shop.name}
            required
          />

          {/* role */}
          <FormSelect
            form={form}
            name="role"
            label="Role"
            list={defaultShopId ? nonAdminRoles : allRoles}
            valueKey={(item) => item}
            labelKey={(item) => item}
            isReadOnly={isReadOnly}
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

        {/* display name */}
        <FormText
          form={form}
          name="displayName"
          label="Display Name"
          isReadOnly={isReadOnly}
          description={`Optional display name`}
        />

        {/* password */}

        {/* image  */}
      </FieldGroup>

      <FormFooter
        onCancel={onCancel}
        isReadOnly={isReadOnly}
        isCreate={isCreate}
        isLoading={isLoading}
      />
    </form>
  );
}

import type { InsertSpecialHourType, UpdateSpecialHourType } from "@/db/schema";
import type { SpecialHourFormProps } from "./specialHourFormType";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import FormHeader from "@/components/form-header";
import { FieldGroup } from "@/components/ui/field";
import FormFooter from "@/components/form-footer";
import FormText from "@/components/form-text";
import FormDate from "@/components/form-date";
import FormBoolean from "@/components/form-boolean";
import FormTime from "@/components/form-time";

export function SpecialHourForm({
  mode,
  initialData,
  // shops,
  // machines,
  onSubmit,
  onCancel,
}: SpecialHourFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      machineId: null,
      shopId: null,
      title: null,
      description: null,
      specificDate: new Date().toISOString().slice(0, 10), // default to today's date
      isClosed: false,
      openingTime: "08:00",
      closingTime: "20:00",
      reason: "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          const data = value as UpdateSpecialHourType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertSpecialHourType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting special hour form:", error);
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
        module="Special Hour"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
        <div className="form-half-width">
          {/* title */}
          <FormText
            form={form}
            name="title"
            label="Title"
            isReadOnly={isReadOnly}
          />

          {/* description */}
          <FormText
            form={form}
            name="description"
            label="Description"
            isReadOnly={isReadOnly}
          />

          {/* specific date */}
          <FormDate
            form={form}
            name="specificDate"
            label="Specific Date"
            isReadOnly={isReadOnly}
            description="Date of the special hour"
            required
          />

          {/* is closed */}
          <FormBoolean
            form={form}
            name="isClosed"
            label="Is Closed"
            isReadOnly={isReadOnly}
            description="Check if the vending machine is closed for the day"
            required
          />

          {/* opening time */}
          <FormTime
            form={form}
            name="openingTime"
            label="Opening Time"
            isReadOnly={isReadOnly || form.getFieldValue("isClosed")}
            description="Opening time for the special hour (ignored if 'Is Closed' is checked)"
          />

          {/* closing time */}
          <FormTime
            form={form}
            name="closingTime"
            label="Closing Time"
            isReadOnly={isReadOnly || form.getFieldValue("isClosed")}
            description="Closing time for the special hour (ignored if 'Is Closed' is checked)"
          />

          {/* reason */}
          <FormText
            form={form}
            name="reason"
            label="Reason"
            isReadOnly={isReadOnly}
            description="Reason for the special hour (ignored if 'Is Closed' is checked)"
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

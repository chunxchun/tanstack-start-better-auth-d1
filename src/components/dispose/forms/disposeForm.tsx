import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  disposeReasonValues,
  type InsertDisposeType,
  type UpdateDisposeType,
} from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { DisposeFormProps } from "./disposeFormType";

export function DisposeForm({
  mode,
  initialData,
  shops,
  foodItems,
  machines,
  onSubmit,
  onCancel,
}: DisposeFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      shopId: null,
      machineId: null,
      foodItemId: null,
      disposeDate: new Date().toISOString().slice(0, 10),
      disposeTime: "18:00",
      quantity: 1,
      disposeReason: "other",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          await onSubmit(value as UpdateDisposeType);
        }

        if (mode === "create") {
          await onSubmit(value as InsertDisposeType);
        }
      } catch (error) {
        console.error("Error submitting dispose form:", error);
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
        isCreate={isCreate}
        isReadOnly={isReadOnly}
        module="Dispose"
      />
      <FieldGroup>
        {/* Row 1: shop & machine */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <FormSelect
              form={form}
              name="shopId"
              label="Shop"
              isReadOnly={isReadOnly}
              list={shops || []}
              valueKey={(item) => item.id}
              labelKey={(item) => item.name}
            />
          </div>
          <div className="w-1/2">
            <FormSelect
              form={form}
              name="machineId"
              label="Machine"
              isReadOnly={isReadOnly}
              list={machines || []}
              valueKey={(item) => item.id}
              labelKey={(item) => item.name}
            />
          </div>
        </div>

        {/* Row 2: food item & dispose reason */}
        <div className="flex gap-4 mt-4">
          <div className="w-1/2">
            <FormSelect
              form={form}
              name="foodItemId"
              label="Food Item"
              isReadOnly={isReadOnly}
              list={foodItems || []}
              valueKey={(item) => item.id}
              labelKey={(item) => item.name}
            />
          </div>
          <div className="w-1/2">
            <FormSelect
              form={form}
              name="disposeReason"
              label="Dispose Reason"
              isReadOnly={isReadOnly}
              list={[...disposeReasonValues]}
              valueKey={(item) => item}
              labelKey={(item) => item}
            />
          </div>
        </div>

        {/* dispose date */}
        <form.Field name="disposeDate">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Dispose Date</FieldLabel>
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

        {/* dispose time */}
        <form.Field name="disposeTime">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Dispose Time</FieldLabel>
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

        {/* quantity */}
        <form.Field name="quantity">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
              />
            </Field>
          )}
        </form.Field>

        {/* dispose reason */}
        <FormSelect
          form={form}
          name="disposeReason"
          label="Dispose Reason"
          isReadOnly={isReadOnly}
          list={[...disposeReasonValues]}
          valueKey={(item) => item}
          labelKey={(item) => item}
        />
      </FieldGroup>
      <FormFooter
        onCancel={onCancel}
        isReadOnly={isReadOnly}
        isCreate={isCreate}
      />
    </form>
  );
}

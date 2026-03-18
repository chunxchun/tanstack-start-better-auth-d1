import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FieldGroup,
  FieldLabel,
  FieldDescription,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SelectDeliveryType as Delivery } from "@/db/schema";

type DeliverySubmitValues = Omit<Delivery, "id" | "createdAt" | "updatedAt">;

type DeliveryFormBaseProps = {
  initialData?: Partial<Delivery>;
  onCancel?: () => void;
};

type DeliveryFormViewProps = DeliveryFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type DeliveryFormEditProps = DeliveryFormBaseProps & {
  mode: "create" | "edit";
  onSubmit: (values: DeliverySubmitValues) => Promise<void>;
};

type DeliveryFormProps = DeliveryFormViewProps | DeliveryFormEditProps;

export function DeliveryForm({ mode, initialData, onSubmit, onCancel }: DeliveryFormProps) {
  const form = useForm({
    defaultValues: {
      destinationLocationId: initialData?.destinationLocationId ?? 0,
      machineId: initialData?.machineId ?? 0,
      courierReference: initialData?.courierReference ?? null,
      deliverDate: initialData?.deliverDate ?? "",
      deliverTime: initialData?.deliverTime ?? "",
      status: initialData?.status ?? "pending",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;

      await onSubmit({
        destinationLocationId: value.destinationLocationId,
        machineId: value.machineId,
        courierReference: value.courierReference,
        deliverDate: value.deliverDate,
        deliverTime: value.deliverTime,
        status: value.status,
      });
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
      <DialogHeader>
        <DialogTitle>
          {mode === "view" ? "Delivery Details" : isCreate ? "Create Delivery" : "Edit Delivery"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View delivery details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <form.Field name="destinationLocationId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Destination Location ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="machineId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Machine ID</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={String(field.state.value)}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              />
            </Field>
          )}
        </form.Field>

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
              <FieldDescription>Optional reference provided by courier.</FieldDescription>
            </Field>
          )}
        </form.Field>

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

        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Status</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "pending"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as "pending" | "scheduled" | "delivered" | "cancelled",
                  )
                }
              >
                <option value="pending">pending</option>
                <option value="scheduled">scheduled</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? <Button type="submit">{isCreate ? "Create" : "Save"}</Button> : null}
      </DialogFooter>
    </form>
  );
}

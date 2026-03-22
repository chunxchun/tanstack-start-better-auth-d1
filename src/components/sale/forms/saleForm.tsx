import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InsertSaleType, UpdateSaleType } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import type { SaleFormProps } from "./saleFormType";

export function SaleForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: SaleFormProps) {
  const form = useForm({
    defaultValues: initialData || {
      machineId: null,
      foodItemId: null,
      saleDate: new Date().toISOString().slice(0, 10), // default to today's date
      saleTime: "12:00",
      quantity: 1,
      currency: "AUD",
      unitPrice: null,
      totalPrice: null,
      paymentMethod: "cash",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        if (mode === "edit") {
          const data = value as UpdateSaleType;
          await onSubmit(data);
        }

        if (mode === "create") {
          const data = value as InsertSaleType;
          await onSubmit(data);
        }
      } catch (error) {
        console.error("Error submitting sale form:", error);
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
      <DialogHeader>
        <DialogTitle>
          {mode === "view"
            ? "Sale Details"
            : isCreate
              ? "Create Sale"
              : "Edit Sale"}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View sale details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup>
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
                onChange={(e) =>
                  field.handleChange(Number(e.target.value) || 0)
                }
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="foodItemId">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Food Item ID</FieldLabel>
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

        <form.Field name="saleDate">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Sale Date</FieldLabel>
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

        <form.Field name="saleTime">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Sale Time</FieldLabel>
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

        <form.Field name="currency">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "AUD"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as "HKD" | "AUD" | "USD" | "EUR" | "JPY",
                  )
                }
              >
                <option value="HKD">HKD</option>
                <option value="AUD">AUD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
              </select>
            </Field>
          )}
        </form.Field>

        <form.Field name="unitPrice">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Unit Price</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                step="0.01"
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

        <form.Field name="totalPrice">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Total Price</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                step="0.01"
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

        <form.Field name="paymentMethod">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Payment Method</FieldLabel>
              <select
                id={field.name}
                name={field.name}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                value={field.state.value ?? "cash"}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as "cash" | "card" | "coupon" | "qr-code",
                  )
                }
              >
                <option value="cash">cash</option>
                <option value="card">card</option>
                <option value="coupon">coupon</option>
                <option value="qr-code">qr-code</option>
              </select>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? (
          <Button type="submit">{isCreate ? "Create" : "Save"}</Button>
        ) : null}
      </DialogFooter>
    </form>
  );
}

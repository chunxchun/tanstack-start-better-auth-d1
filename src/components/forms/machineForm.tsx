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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  machineModeValues,
  machineStatusValues,
  type SelectMachineType as Machine,
  type MachineMode,
  type MachineStatus,
  type SelectLocationType as Location,
  type SelectShopType as Shop,
  type MachineVersion,
  type InsertMachineType,
  type UpdateMachineType,
} from "@/db/schema";

// type MachineSubmitValues = Omit<Machine, "id" | "createdAt" | "updatedAt">;

type MachineFormBaseProps = {
  initialData?: Partial<Machine>;
  locations?: Location[];
  shops?: Shop[];
  onCreateLocation?: () => void;
  onCancel?: () => void;
};

type MachineFormViewProps = MachineFormBaseProps & {
  mode: "view";
  onSubmit?: never;
};

type MachineFormEditProps = MachineFormBaseProps & {
  mode: "edit";
  onSubmit: (values: UpdateMachineType) => Promise<void>;
};

type MachineFormInsertProps = MachineFormBaseProps & {
  mode: "create";
  onSubmit: (values: InsertMachineType) => Promise<void>;
};

type MachineFormProps = MachineFormViewProps | MachineFormEditProps | MachineFormInsertProps;

export function MachineForm({
  mode,
  initialData,
  locations = [],
  shops = [],
  onCreateLocation,
  onSubmit,
  onCancel,
}: MachineFormProps) {
  const form = useForm({
    defaultValues: {
      locationId: initialData?.locationId ?? null,
      shopId: initialData?.shopId ?? null,
      name: initialData?.name ?? "",
      serialNumber: initialData?.serialNumber ?? "",
      status: initialData?.status ?? "active",
      version: initialData?.version ?? null,
      mode: initialData?.mode ?? null,
      dayEndStockAutoReset: initialData?.dayEndStockAutoReset ?? false,
      description: initialData?.description ?? null,
      installationDate: initialData?.installationDate ?? "",
      startWorkingHour: initialData?.startWorkingHour ?? "",
      closeWorkingHour: initialData?.closeWorkingHour ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        await onSubmit(value);
      } catch (error) {
        console.error("Error submitting form:", error);
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
          {mode === "view" ? (
            "Machine Details"
          ) : isCreate ? (
            <span className="font-bold">Create Machine</span>
          ) : (
            "Edit Machine"
          )}
        </DialogTitle>
        <DialogDescription>
          {isReadOnly
            ? "View machine details."
            : "Fill out the form below and click save when you're done."}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="py-8">
        {/* ── Identity ── */}
        <div className="grid grid-cols-2 gap-x-4">
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

          <form.Field name="serialNumber">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Serial Number</FieldLabel>
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
        </div>

        {/* ── Status & Mode ── */}
        <div className="grid grid-cols-2 gap-x-4">
          <form.Field name="status">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select
                  value={field.state.value ?? "active"}
                  disabled={isReadOnly}
                  onValueChange={(val) =>
                    field.handleChange(val as MachineStatus)
                  }
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue />
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

          <form.Field name="mode">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Mode</FieldLabel>
                <Select
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onValueChange={(val) =>
                    field.handleChange(val as MachineMode)
                  }
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue />
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

        {/* ── Version & Location ── */}
        <div className="grid grid-cols-2 gap-x-4">
          <form.Field name="version">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Version</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as MachineVersion)
                  }
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="locationId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                {locations.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>No locations yet.</span>
                    {onCreateLocation && !isReadOnly && (
                      <button
                        type="button"
                        className="text-primary underline underline-offset-2"
                        onClick={onCreateLocation}
                      >
                        + Create location
                      </button>
                    )}
                  </div>
                ) : (
                  <Select
                    value={
                      field.state.value != null ? String(field.state.value) : ""
                    }
                    disabled={isReadOnly}
                    onValueChange={(val) =>
                      field.handleChange(val ? Number(val) : null)
                    }
                  >
                    <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                      <SelectValue placeholder="-- Select location --" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={String(loc.id)}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
            )}
          </form.Field>
        </div>

        {/* ── Shop ── */}
        <div className="grid grid-cols-2 gap-x-4">
          <form.Field name="shopId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Shop</FieldLabel>
                <Select
                  value={
                    field.state.value != null ? String(field.state.value) : ""
                  }
                  disabled={isReadOnly}
                  onValueChange={(val) =>
                    field.handleChange(val ? Number(val) : null)
                  }
                >
                  <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                    <SelectValue placeholder="-- Select shop --" />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map((shop) => (
                      <SelectItem key={shop.id} value={String(shop.id)}>
                        {shop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
          <div />
        </div>

        {/* ── Description ── */}
        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                disabled={isReadOnly}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value || null)}
              />
            </Field>
          )}
        </form.Field>

        {/* ── Schedule ── */}
        <div className="grid grid-cols-2 gap-x-4">
          <form.Field name="installationDate">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Installation Date</FieldLabel>
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

          <div />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <form.Field name="startWorkingHour">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Start Working Hour</FieldLabel>
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

          <form.Field name="closeWorkingHour">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Close Working Hour</FieldLabel>
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

        {/* ── Settings ── */}
        <form.Field name="dayEndStockAutoReset">
          {(field) => (
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value ?? false}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldLabel htmlFor={field.name}>
                  Day End Stock Auto Reset
                </FieldLabel>
              </div>
              <FieldDescription>
                Automatically reset machine stock at the end of the day. If
                disabled, you must manually input the dispose quantity each day.
              </FieldDescription>
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

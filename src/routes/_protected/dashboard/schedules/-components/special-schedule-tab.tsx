import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
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
import type { SpecialScheduleTabProps } from "../-types/schedule.type";
import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import NoMachines from "./no-machine";
import FormSelect from "@/components/form-select";
import FormDate from "@/components/form-date";
import FormBoolean from "@/components/form-boolean";
import FormTime from "@/components/form-time";
import FormText from "@/components/form-text";

export default function SpecialScheduleTab({
  machines,
}: SpecialScheduleTabProps) {
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      machineId: null,
      title: "",
      description: null,
      specificDate: dayjs().format("YYYY-MM-DD"),
      isClosed: false,
      openingTime: "09:00",
      closingTime: "17:00",
      reason: "",
    },

    onSubmit: async ({ value }) => {
      setSubmitError(null);

      if (!value.machineId) {
        setSubmitError("Please select a machine.");
        return;
      }

      try {
        const machineId = Number(value.machineId);
        const selectedMachine = machines.find((m) => m.id === machineId);
        // setIsLoadingSchedule(true);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Error saving schedule";
        setSubmitError(message);
        toast.error(message);
      }
    },
  });

  if (machines.length === 0) {
    return <NoMachines />;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Machine Special Operating Hours</CardTitle>
        <CardDescription>
          Manage the special operating hours, e.g. holidays or maintenance
          periods, for each machine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="form-half-width">
              <FormSelect
                form={form}
                name="machineId"
                label="Select Machine"
                isReadOnly={false}
                list={machines}
                valueKey={(item) => String(item.id)}
                labelKey={(item) => item.name}
                required
              />

              <FormDate
                form={form}
                name="specificDate"
                label="Date"
                isReadOnly={false}
                required
              />
            </div>
            <FormText
              form={form}
              name="title"
              label="Title"
              isReadOnly={false}
              description="Provide a title for the special schedule (e.g. maintenance, holiday, etc.)"
              required
            />

            <FormText
              form={form}
              name="description"
              label="Description"
              isReadOnly={false}
              description="Optional short description for this special schedule"
            />

            <div className="form-half-width">
              <FormTime
                form={form}
                name="openingTime"
                label="Opening Time"
                isReadOnly={false}
                required
              />

              <FormTime
                form={form}
                name="closingTime"
                label="Closing Time"
                isReadOnly={false}
                required
              />

              <FormText
                form={form}
                name="reason"
                label="Reason (optional)"
                isReadOnly={false}
                description="Provide a reason for the special schedule (e.g. maintenance, holiday, etc.)"
              />

              <FormBoolean
                form={form}
                name="isClosed"
                label="Is Closed"
                isReadOnly={false}
                required
              />
            </div>
            {submitError && (
              <Field>
                <FieldError>{submitError}</FieldError>
              </Field>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {isLoadingSchedule
            ? "Loading saved schedule..."
            : "Closed days store default hours and disable editing."}
        </p>
        <form.Subscribe
          selector={(state) => [state.isSubmitting, state.canSubmit] as const}
        >
          {([isSubmitting, canSubmit]) => (
            <Button
              type="button"
              onClick={() => void form.handleSubmit()}
              disabled={isSubmitting || isLoadingSchedule || !canSubmit}
            >
              {isSubmitting ? "Saving schedule..." : "Save schedule"}
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  );
}

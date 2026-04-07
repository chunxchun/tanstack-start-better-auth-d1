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
import type { InsertOperatingHourType } from "@/db/schema";
import {
  createMachineOperatingScheduleFn,
  fetchMachineOperatingScheduleByMachineIdFn,
} from "@/utils/machineOperatingSchedule/machineOperatingSchedule.function";
import {
  createOperatingHourFn,
  fetchOperatingHourByIdFn,
  updateOperatingHourByIdFn,
} from "@/utils/operatingHour/operatingHour.function";
import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type {
  CheckboxState,
  ExistingScheduleMeta,
  RegularScheduleTabProps,
  ScheduleFormValues,
} from "../-types/schedule.type";
import NoMachines from "./no-machine";
import {
  buildDefaultValues,
  getFieldError,
  getOperatingHourResult,
} from "../-functions/schedule.function";
import {
  DAYS,
  DEFAULT_CLOSE_TIME,
  DEFAULT_OPEN_TIME,
} from "../-constants/schedule.constant";

export default function RegularScheduleTab({
  machines,
}: RegularScheduleTabProps) {
  const [existingSchedules, setExistingSchedules] = useState<
    Partial<Record<number, ExistingScheduleMeta>>
  >({});
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: buildDefaultValues(
      machines[0] ? String(machines[0].id) : "",
    ),
    onSubmit: async ({ value }) => {
      setSubmitError(null);

      if (!value.machineId) {
        setSubmitError("Please select a machine.");
        return;
      }

      const invalidDays = DAYS.filter((day) => {
        const isClosed = Boolean(value[day.closedKey]);
        const openingTime = String(value[day.openKey]);
        const closingTime = String(value[day.closeKey]);

        return !isClosed && closingTime <= openingTime;
      });

      if (invalidDays.length > 0) {
        const message = `${invalidDays[0].label}: closing time must be after opening time.`;
        setSubmitError(message);
        toast.error(message);
        return;
      }

      try {
        const machineId = Number(value.machineId);
        const selectedMachine = machines.find(
          (machine) => machine.id === machineId,
        );

        for (const day of DAYS) {
          const isClosed = Boolean(value[day.closedKey]);
          const openingTime = isClosed
            ? DEFAULT_OPEN_TIME
            : String(value[day.openKey]);
          const closingTime = isClosed
            ? DEFAULT_CLOSE_TIME
            : String(value[day.closeKey]);

          const operatingHourPayload: InsertOperatingHourType = {
            title: `${selectedMachine?.name ?? "Machine"} ${day.label}`,
            description: `${day.label} operating hours`,
            dayOfWeek: day.dayOfWeek,
            isClosed,
            openingTime,
            closingTime,
          };

          const existing = existingSchedules[day.dayOfWeek];

          if (existing) {
            await updateOperatingHourByIdFn({
              data: {
                id: existing.operatingHourId,
                ...operatingHourPayload,
              },
            });
            continue;
          }

          const createdOperatingHour = await createOperatingHourFn({
            data: operatingHourPayload,
          });
          const operatingHour = getOperatingHourResult(createdOperatingHour);

          if (!operatingHour?.id) {
            throw new Error(
              `Failed to create ${day.label.toLowerCase()} schedule.`,
            );
          }

          await createMachineOperatingScheduleFn({
            data: {
              machineId,
              operatingHourId: Number(operatingHour.id),
            },
          });
        }

        await loadMachineSchedule(value.machineId);
        toast.success("Machine operating hours saved successfully.");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to save machine operating hours.";
        setSubmitError(message);
        toast.error(message);
      }
    },
  });

  const selectedMachineName = useMemo(() => {
    const machine = machines.find(
      (item) => String(item.id) === form.state.values.machineId,
    );

    return machine?.name ?? "";
  }, [form.state.values.machineId, machines]);

  const applyScheduleValues = (
    machineId: string,
    values: ScheduleFormValues,
  ) => {
    for (const [key, fieldValue] of Object.entries(values)) {
      form.setFieldValue(key as keyof ScheduleFormValues, fieldValue as never);
    }
    form.setFieldValue("machineId", machineId as never);
  };

  const loadMachineSchedule = async (machineId: string) => {
    const baseValues = buildDefaultValues(machineId);
    applyScheduleValues(machineId, baseValues);
    setExistingSchedules({});

    if (!machineId) return;

    setIsLoadingSchedule(true);

    try {
      const scheduleLinks = await fetchMachineOperatingScheduleByMachineIdFn({
        data: { id: Number(machineId) },
      });

      const nextExisting: Partial<Record<number, ExistingScheduleMeta>> = {};

      await Promise.all(
        scheduleLinks.map(async (schedule) => {
          const operatingHourResult = await fetchOperatingHourByIdFn({
            data: { id: schedule.operatingHourId },
          });
          const operatingHour = getOperatingHourResult(operatingHourResult);

          if (!operatingHour) return;

          nextExisting[operatingHour.dayOfWeek] = {
            scheduleId: schedule.id,
            operatingHourId: schedule.operatingHourId,
          };

          const matchingDay = DAYS.find(
            (day) => day.dayOfWeek === operatingHour.dayOfWeek,
          );

          if (!matchingDay) return;

          form.setFieldValue(
            matchingDay.closedKey,
            Boolean(operatingHour.isClosed) as never,
          );
          form.setFieldValue(
            matchingDay.openKey,
            String(operatingHour.openingTime) as never,
          );
          form.setFieldValue(
            matchingDay.closeKey,
            String(operatingHour.closingTime) as never,
          );
        }),
      );

      setExistingSchedules(nextExisting);
    } catch (error) {
      setExistingSchedules({});
    } finally {
      setIsLoadingSchedule(false);
    }
  };

  useEffect(() => {
    if (machines.length === 0) return;

    void loadMachineSchedule(String(machines[0].id));
  }, [machines.length]);

  if (machines.length === 0) {
    return <NoMachines />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Machine Operating Hours</CardTitle>
        <CardDescription>
          Set Monday to Sunday operating hours for each machine. Closed days
          disable the time inputs automatically.
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
            <form.Field
              name="machineId"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Please select a machine.";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="machineId">Machine</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value);
                      void loadMachineSchedule(value);
                    }}
                  >
                    <SelectTrigger id="machineId" className="w-full">
                      <SelectValue placeholder="Select a machine" />
                    </SelectTrigger>
                    <SelectContent>
                      {machines.map((machine) => (
                        <SelectItem key={machine.id} value={String(machine.id)}>
                          {machine.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Choose the machine you want to configure.
                  </FieldDescription>
                  <FieldError>
                    {field.state.meta.isTouched
                      ? getFieldError(field.state.meta.errors)
                      : null}
                  </FieldError>
                </Field>
              )}
            </form.Field>

            <div className="space-y-4">
              {DAYS.map((day) => (
                <div
                  key={day.label}
                  className="grid gap-4 rounded-xl border p-4 md:grid-cols-[140px_120px_1fr_1fr] md:items-start"
                >
                  <div>
                    <p className="font-medium">{day.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMachineName || "Selected machine"}
                    </p>
                  </div>

                  <form.Field name={day.closedKey as never}>
                    {(closedField) => (
                      <Field orientation="horizontal" className="gap-3">
                        <Checkbox
                          checked={Boolean(closedField.state.value)}
                          onCheckedChange={(checked: CheckboxState) => {
                            const isClosed = checked === true;
                            closedField.handleChange(isClosed as never);

                            if (isClosed) {
                              form.setFieldValue(
                                day.openKey,
                                DEFAULT_OPEN_TIME as never,
                              );
                              form.setFieldValue(
                                day.closeKey,
                                DEFAULT_CLOSE_TIME as never,
                              );
                            }
                          }}
                        />
                        <FieldLabel>
                          {Boolean(closedField.state.value) ? "Closed" : "Open"}
                        </FieldLabel>
                      </Field>
                    )}
                  </form.Field>

                  <form.Field
                    name={day.openKey as never}
                    validators={{
                      onChangeListenTo: [day.closedKey as never],
                      onChange: ({ value, fieldApi }) => {
                        const isClosed = Boolean(
                          fieldApi.form.getFieldValue(day.closedKey),
                        );

                        if (isClosed) return undefined;
                        if (!value) return "Opening time is required.";
                        return undefined;
                      },
                    }}
                  >
                    {(openField) => {
                      return (
                        <form.Subscribe
                          selector={(state) =>
                            Boolean(state.values[day.closedKey])
                          }
                        >
                          {(isClosed) => (
                            <Field>
                              <FieldLabel htmlFor={openField.name}>
                                Open
                              </FieldLabel>
                              <Input
                                id={openField.name}
                                type="time"
                                value={String(openField.state.value)}
                                disabled={isClosed}
                                onBlur={openField.handleBlur}
                                onChange={(event) =>
                                  openField.handleChange(
                                    event.target.value as never,
                                  )
                                }
                              />
                              <FieldError>
                                {openField.state.meta.isTouched
                                  ? getFieldError(openField.state.meta.errors)
                                  : null}
                              </FieldError>
                            </Field>
                          )}
                        </form.Subscribe>
                      );
                    }}
                  </form.Field>

                  <form.Field
                    name={day.closeKey as never}
                    validators={{
                      onChangeListenTo: [
                        day.openKey as never,
                        day.closedKey as never,
                      ],
                      onChange: ({ value, fieldApi }) => {
                        const isClosed = Boolean(
                          fieldApi.form.getFieldValue(day.closedKey as never),
                        );
                        const openingTime = String(
                          fieldApi.form.getFieldValue(day.openKey as never),
                        );

                        if (isClosed) return undefined;
                        if (!value) return "Closing time is required.";
                        if (String(value) <= openingTime) {
                          return "Closing time must be after opening time.";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(closeField) => {
                      return (
                        <form.Subscribe
                          selector={(state) =>
                            Boolean(state.values[day.closedKey])
                          }
                        >
                          {(isClosed) => (
                            <Field>
                              <FieldLabel htmlFor={closeField.name}>
                                Close
                              </FieldLabel>
                              <Input
                                id={closeField.name}
                                type="time"
                                value={String(closeField.state.value)}
                                disabled={isClosed}
                                onBlur={closeField.handleBlur}
                                onChange={(event) =>
                                  closeField.handleChange(
                                    event.target.value as never,
                                  )
                                }
                              />
                              <FieldError>
                                {closeField.state.meta.isTouched
                                  ? getFieldError(closeField.state.meta.errors)
                                  : null}
                              </FieldError>
                            </Field>
                          )}
                        </form.Subscribe>
                      );
                    }}
                  </form.Field>
                </div>
              ))}
            </div>
          </FieldGroup>

          {submitError ? <FieldError>{submitError}</FieldError> : null}
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

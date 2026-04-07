import type { SelectMachineType } from "@/db/schema";

export type CheckboxState = boolean | "indeterminate";

export type ScheduleFormValues = {
  machineId: string;
  mondayIsClosed: boolean;
  mondayOpeningTime: string;
  mondayClosingTime: string;
  tuesdayIsClosed: boolean;
  tuesdayOpeningTime: string;
  tuesdayClosingTime: string;
  wednesdayIsClosed: boolean;
  wednesdayOpeningTime: string;
  wednesdayClosingTime: string;
  thursdayIsClosed: boolean;
  thursdayOpeningTime: string;
  thursdayClosingTime: string;
  fridayIsClosed: boolean;
  fridayOpeningTime: string;
  fridayClosingTime: string;
  saturdayIsClosed: boolean;
  saturdayOpeningTime: string;
  saturdayClosingTime: string;
  sundayIsClosed: boolean;
  sundayOpeningTime: string;
  sundayClosingTime: string;
};

export type DayConfig = {
  label: string;
  dayOfWeek: number;
  closedKey: keyof ScheduleFormValues;
  openKey: keyof ScheduleFormValues;
  closeKey: keyof ScheduleFormValues;
};

export type ExistingScheduleMeta = {
  scheduleId: number;
  operatingHourId: number;
};

export type RegularScheduleTabProps = {
  machines: SelectMachineType[];
};

export type SpecialScheduleTabProps = {
  machines: SelectMachineType[];
};
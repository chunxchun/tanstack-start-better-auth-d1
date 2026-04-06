import type { ScheduleFormValues } from "../-types/schedule.type";
import { DEFAULT_CLOSE_TIME, DEFAULT_OPEN_TIME, DAYS } from "../-constants/schedule.constant";

export const buildDefaultValues = (machineId = ""): ScheduleFormValues => ({
  machineId,
  mondayIsClosed: false,
  mondayOpeningTime: DEFAULT_OPEN_TIME,
  mondayClosingTime: DEFAULT_CLOSE_TIME,
  tuesdayIsClosed: false,
  tuesdayOpeningTime: DEFAULT_OPEN_TIME,
  tuesdayClosingTime: DEFAULT_CLOSE_TIME,
  wednesdayIsClosed: false,
  wednesdayOpeningTime: DEFAULT_OPEN_TIME,
  wednesdayClosingTime: DEFAULT_CLOSE_TIME,
  thursdayIsClosed: false,
  thursdayOpeningTime: DEFAULT_OPEN_TIME,
  thursdayClosingTime: DEFAULT_CLOSE_TIME,
  fridayIsClosed: false,
  fridayOpeningTime: DEFAULT_OPEN_TIME,
  fridayClosingTime: DEFAULT_CLOSE_TIME,
  saturdayIsClosed: false,
  saturdayOpeningTime: DEFAULT_OPEN_TIME,
  saturdayClosingTime: DEFAULT_CLOSE_TIME,
  sundayIsClosed: false,
  sundayOpeningTime: DEFAULT_OPEN_TIME,
  sundayClosingTime: DEFAULT_CLOSE_TIME,
});

export const getFieldError = (errors: Array<unknown>) => {
  const firstError = errors.find((error) => typeof error === "string");
  return typeof firstError === "string" ? firstError : null;
};

export const getOperatingHourResult = <T,>(result: T | T[]) => {
  return Array.isArray(result) ? (result[0] ?? null) : result;
};

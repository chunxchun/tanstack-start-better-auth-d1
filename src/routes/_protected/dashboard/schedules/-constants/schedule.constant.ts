import type { DayConfig } from "../-types/schedule.type";

export const DEFAULT_OPEN_TIME = "09:00";
export const DEFAULT_CLOSE_TIME = "17:00";

export const DAYS: DayConfig[] = [
  {
    label: "Monday",
    dayOfWeek: 1,
    closedKey: "mondayIsClosed",
    openKey: "mondayOpeningTime",
    closeKey: "mondayClosingTime",
  },
  {
    label: "Tuesday",
    dayOfWeek: 2,
    closedKey: "tuesdayIsClosed",
    openKey: "tuesdayOpeningTime",
    closeKey: "tuesdayClosingTime",
  },
  {
    label: "Wednesday",
    dayOfWeek: 3,
    closedKey: "wednesdayIsClosed",
    openKey: "wednesdayOpeningTime",
    closeKey: "wednesdayClosingTime",
  },
  {
    label: "Thursday",
    dayOfWeek: 4,
    closedKey: "thursdayIsClosed",
    openKey: "thursdayOpeningTime",
    closeKey: "thursdayClosingTime",
  },
  {
    label: "Friday",
    dayOfWeek: 5,
    closedKey: "fridayIsClosed",
    openKey: "fridayOpeningTime",
    closeKey: "fridayClosingTime",
  },
  {
    label: "Saturday",
    dayOfWeek: 6,
    closedKey: "saturdayIsClosed",
    openKey: "saturdayOpeningTime",
    closeKey: "saturdayClosingTime",
  },
  {
    label: "Sunday",
    dayOfWeek: 0,
    closedKey: "sundayIsClosed",
    openKey: "sundayOpeningTime",
    closeKey: "sundayClosingTime",
  },
];

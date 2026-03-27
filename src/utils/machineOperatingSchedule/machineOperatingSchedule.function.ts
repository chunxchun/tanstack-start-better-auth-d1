import {
  insertMachineOperatingScheduleSchema,
  updateMachineOperatingScheduleSchema,
} from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createMachineOperatingScheduleHandler,
  deleteMachineOperatingScheduleByIdHandler,
  fetchMachineOperatingScheduleByIdHandler,
  fetchMachineOperatingScheduleByMachineIdHandler,
  listMachineOperatingScheduleHandler,
  updateMachineOperatingScheduleByIdHandler,
} from "./machineOperatingSchedule.handler";

export const listMachineOperatingScheduleFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listMachineOperatingScheduleHandler(data.limit, data.offset),
  );

export const createMachineOperatingScheduleFn = createServerFn({
  method: "POST",
})
  .inputValidator(insertMachineOperatingScheduleSchema)
  .handler(async ({ data }) => createMachineOperatingScheduleHandler(data));

export const fetchMachineOperatingScheduleByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMachineOperatingScheduleByIdHandler(Number(data.id)),
  );

export const fetchMachineOperatingScheduleByMachineIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMachineOperatingScheduleByMachineIdHandler(Number(data.id)),
  );

export const updateMachineOperatingScheduleByIdFn = createServerFn({
  method: "POST",
})
  .inputValidator(updateMachineOperatingScheduleSchema)
  .handler(async ({ data }) =>
    updateMachineOperatingScheduleByIdHandler(Number(data.id), data),
  );

export const deleteMachineOperatingScheduleByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    deleteMachineOperatingScheduleByIdHandler(Number(data.id)),
  );

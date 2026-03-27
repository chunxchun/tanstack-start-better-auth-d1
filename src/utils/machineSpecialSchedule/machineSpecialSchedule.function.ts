import {
  insertMachineSpecialScheduleSchema,
  updateMachineSpecialScheduleSchema,
} from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createMachineSpecialScheduleHandler,
  deleteMachineSpecialScheduleByIdHandler,
  fetchMachineSpecialScheduleByIdHandler,
  fetchMachineSpecialScheduleByMachineIdHandler,
  listMachineSpecialScheduleHandler,
  updateMachineSpecialScheduleByIdHandler,
} from "./machineSpecialSchedule.handler";

export const listMachineSpecialScheduleFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listMachineSpecialScheduleHandler(data.limit, data.offset),
  );

export const createMachineSpecialScheduleFn = createServerFn({ method: "POST" })
  .inputValidator(insertMachineSpecialScheduleSchema)
  .handler(async ({ data }) => createMachineSpecialScheduleHandler(data));

export const fetchMachineSpecialScheduleByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMachineSpecialScheduleByIdHandler(Number(data.id)),
  );

export const fetchMachineSpecialScheduleByMachineIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMachineSpecialScheduleByMachineIdHandler(Number(data.id)),
  );

export const updateMachineSpecialScheduleByIdFn = createServerFn({
  method: "POST",
})
  .inputValidator(updateMachineSpecialScheduleSchema)
  .handler(async ({ data }) =>
    updateMachineSpecialScheduleByIdHandler(Number(data.id), data),
  );

export const deleteMachineSpecialScheduleByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    deleteMachineSpecialScheduleByIdHandler(Number(data.id)),
  );

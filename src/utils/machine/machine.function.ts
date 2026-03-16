import {
  insertMachineSchema,
  updateMachineSchema,
} from "@/db/schema/machineTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createMachineHandler,
  deleteMachineByIdHandler,
  fetchMachineByIdHandler,
  listMachineHandler,
  updateMachineByIdHandler,
} from "./machine.handler";

export const listMachineFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listMachineHandler(data.limit, data.offset));

export const createMachineFn = createServerFn({ method: "POST" })
  .inputValidator(insertMachineSchema)
  .handler(async ({ data }) => createMachineHandler(data));

export const fetchMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchMachineByIdHandler(data.id));

export const updateMachineByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateMachineSchema)
  .handler(async ({ data }) => updateMachineByIdHandler(data.id as number, data));

export const deleteMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteMachineByIdHandler(data.id));

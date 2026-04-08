import {
  insertMachineSchema,
  updateMachineSchema,
} from "@/db/schema/machineTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema, shopIdSchema } from "../sharedSchema";
import {
  createMachineHandler,
  deleteMachineByIdHandler,
  fetchMachineByIdHandler,
  listMachineByShopIdHandler,
  listMachineHandler,
  updateMachineByIdHandler,
} from "./machine.handler";

export const listMachineFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listMachineHandler(data.limit, data.offset, data.shopId),
  );
export const listMachineByShopIdFn = createServerFn({ method: "GET" })
  .inputValidator(shopIdSchema)
  .handler(async ({ data }) => listMachineByShopIdHandler(data.shopId));

export const createMachineFn = createServerFn({ method: "POST" })
  .inputValidator(insertMachineSchema)
  .handler(async ({ data }) => createMachineHandler(data));

export const fetchMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchMachineByIdHandler(Number(data.id)));

export const updateMachineByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateMachineSchema)
  .handler(async ({ data }) => updateMachineByIdHandler(Number(data.id), data));

export const deleteMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteMachineByIdHandler(Number(data.id)));

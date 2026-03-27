import { insertMenuMachineSchema, updateMenuMachineSchema } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createMenuMachineHandler,
  deleteMenuMachineByIdHandler,
  fetchMenuMachineByIdHandler,
  fetchMenuMachineByMachineIdHandler,
  fetchMenuMachineByMenuIdHandler,
  listMenuMachineHandler,
  updateMenuMachineHandlerById,
} from "./menuMachine.handler";

export const listMenuMachineFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listMenuMachineHandler(data.limit, data.offset));

export const createMenuMachineFn = createServerFn({ method: "POST" })
  .inputValidator(insertMenuMachineSchema)
  .handler(async ({ data }) => createMenuMachineHandler(data));

export const fetchMenuMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchMenuMachineByIdHandler(Number(data.id)));

export const fetchMenuMachineByMenuIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMenuMachineByMenuIdHandler(Number(data.id)),
  );

export const fetchMenuMachineByMachineIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMenuMachineByMachineIdHandler(Number(data.id)),
  );

export const updateMenuMachineByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateMenuMachineSchema)
  .handler(async ({ data }) =>
    updateMenuMachineHandlerById(Number(data.id), data),
  );

export const deleteMenuMachineByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteMenuMachineByIdHandler(Number(data.id)));

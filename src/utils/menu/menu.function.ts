import { insertMenuSchema, updateMenuSchema } from "@/db/schema/menuTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createMenuHandler,
  deleteMenuByIdHandler,
  fetchMenuByIdHandler,
  listMenuHandler,
  updateMenuHandlerById,
} from "./menu.handler";

export const listMenuFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listMenuHandler(data.limit, data.offset));

export const createMenuFn = createServerFn({ method: "POST" })
  .inputValidator(insertMenuSchema)
  .handler(async ({ data }) => createMenuHandler(data));

export const fetchMenuByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchMenuByIdHandler(Number(data.id)));

export const updateMenuByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateMenuSchema)
  .handler(async ({ data }) => updateMenuHandlerById(Number(data.id), data));

export const deleteMenuByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteMenuByIdHandler(Number(data.id)));

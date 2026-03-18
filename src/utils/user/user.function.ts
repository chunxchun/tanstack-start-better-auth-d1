import {
  insertSystemUserSchema,
  updateSystemUserSchema,
} from "@/db/schema/systemUserTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createUserHandler,
  deleteUserByIdHandler,
  fetchUserByIdHandler,
  listUserHandler,
  updateUserByIdHandler,
} from "./user.handler";

export const listUserFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listUserHandler(data.limit, data.offset));

export const createUserFn = createServerFn({ method: "POST" })
  .inputValidator(insertSystemUserSchema)
  .handler(async ({ data }) => createUserHandler(data));

export const fetchUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchUserByIdHandler(data.id));

export const updateUserByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateSystemUserSchema)
  .handler(async ({ data }) => updateUserByIdHandler(data.id as number, data));

export const deleteUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteUserByIdHandler(data.id));

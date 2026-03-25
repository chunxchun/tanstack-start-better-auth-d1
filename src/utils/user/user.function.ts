import { insertUserSchema, updateUserSchema } from "@/db/schema/authSchema";
import { createServerFn } from "@tanstack/react-start";
import { paginationSchema, stringIdSchema } from "../sharedSchema";
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
  .inputValidator(insertUserSchema)
  .handler(async ({ data }) => createUserHandler(data));

export const fetchUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(stringIdSchema)
  .handler(async ({ data }) => fetchUserByIdHandler(data.id));

export const updateUserByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateUserSchema)
  .handler(async ({ data }) => {
    if (!data.id) {
      throw new Error("User id is required for update");
    }
    return updateUserByIdHandler(data.id, data);
  });

export const deleteUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(stringIdSchema)
  .handler(async ({ data }) => deleteUserByIdHandler(data.id));

import { insertSpecialHourSchema, updateSpecialHourSchema } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createSpecialHourHandler,
  deleteSpecialHourByIdHandler,
  fetchSpecialHourByIdHandler,
  listSpecialHourHandler,
  updateSpecialHourByIdHandler,
} from "./specialHour.handler";

export const listSpecialHourFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listSpecialHourHandler(data.limit, data.offset));

export const createSpecialHourFn = createServerFn({ method: "POST" })
  .inputValidator(insertSpecialHourSchema)
  .handler(async ({ data }) => createSpecialHourHandler(data));

export const fetchSpecialHourByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchSpecialHourByIdHandler(Number(data.id)));

export const updateSpecialHourByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateSpecialHourSchema)
  .handler(async ({ data }) =>
    updateSpecialHourByIdHandler(Number(data.id), data),
  );

export const deleteSpecialHourByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteSpecialHourByIdHandler(Number(data.id)));

import {
  createOperatingHourHandler,
  deleteOperatingHourByIdHandler,
  fetchOperatingHourByIdHandler,
  listOperatingHourHandler,
  updateOperatingHourByIdHandler,
} from "./operatingHour.handler";
import {
  insertOperatingHourSchema,
  updateOperatingHourSchema,
} from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";

export const listOperatingHourFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listOperatingHourHandler(data.limit, data.offset),
  );

export const createOperatingHourFn = createServerFn({ method: "POST" })
  .inputValidator(insertOperatingHourSchema)
  .handler(async ({ data }) => createOperatingHourHandler(data));

export const fetchOperatingHourByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchOperatingHourByIdHandler(Number(data.id)));

export const updateOperatingHourByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateOperatingHourSchema)
  .handler(async ({ data }) =>
    updateOperatingHourByIdHandler(Number(data.id), data),
  );

export const deleteOperatingHourByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteOperatingHourByIdHandler(Number(data.id)));

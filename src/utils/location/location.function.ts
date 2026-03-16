import {
  insertLocationSchema,
  updateLocationSchema,
} from "@/db/schema/locationTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createLocationHandler,
  deleteLocationByIdHandler,
  fetchLocationByIdHandler,
  listLocationHandler,
  updateLocationByIdHandler,
} from "./location.handler";

export const listLocationFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listLocationHandler(data.limit, data.offset));

export const createLocationFn = createServerFn({ method: "POST" })
  .inputValidator(insertLocationSchema)
  .handler(async ({ data }) => createLocationHandler(data));

export const fetchLocationByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchLocationByIdHandler(data.id));

export const updateLocationByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateLocationSchema)
  .handler(async ({ data }) => updateLocationByIdHandler(data.id as number, data));

export const deleteLocationByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteLocationByIdHandler(data.id));

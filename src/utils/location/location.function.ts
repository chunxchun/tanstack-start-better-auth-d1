import {
  insertLocationSchema,
  updateLocationSchema,
} from "@/db/schema/locationTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema, shopIdSchema } from "../sharedSchema";
import {
  createLocationHandler,
  deleteLocationByIdHandler,
  fetchLocationByIdHandler,
  listLocationByShopIdHandler,
  listLocationHandler,
  updateLocationByIdHandler,
} from "./location.handler";

export const listLocationFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listLocationHandler(data.limit, data.offset, data.shopId),
  );

export const listLocationByShopIdFn = createServerFn({ method: "GET" })
  .inputValidator(shopIdSchema)
  .handler(async ({ data }) =>
    listLocationByShopIdHandler(Number(data.shopId)),
  );

export const createLocationFn = createServerFn({ method: "POST" })
  .inputValidator(insertLocationSchema)
  .handler(async ({ data }) => createLocationHandler(data));

export const fetchLocationByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchLocationByIdHandler(Number(data.id)));

export const updateLocationByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateLocationSchema)
  .handler(async ({ data }) => {
    return updateLocationByIdHandler(Number(data.id), data);
  });

export const deleteLocationByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteLocationByIdHandler(Number(data.id)));

import { insertShopSchema, updateShopSchema } from "@/db/schema/shopTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createShopHandler,
  deleteShopByIdHandler,
  fetchShopByIdHandler,
  listShopHandler,
  updateShopHandlerById,
} from "./shop.handler";

export const listShopFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listShopHandler(data.limit, data.offset));

export const createShopFn = createServerFn({ method: "POST" })
  .inputValidator(insertShopSchema)
  .handler(async ({ data }) => createShopHandler(data));

export const fetchShopByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchShopByIdHandler(Number(data.id)));

export const updateShopByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateShopSchema)
  .handler(async ({ data }) => updateShopHandlerById(Number(data.id), data));

export const deleteShopByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteShopByIdHandler(Number(data.id)))  ;

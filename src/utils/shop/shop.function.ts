import { insertShopSchema, updateShopSchema } from "@/db/schema/shop";
import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";
import {
  createShopHandler,
  deleteShopByIdHandler,
  fetchShopByIdHandler,
  listShopHandler,
  updateShopHandlerById,
} from "./shop.handler";

const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listShopFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listShopHandler(data.limit, data.offset));

export const createShopFn = createServerFn({ method: "POST" })
  .inputValidator(
    insertShopSchema,
  )
  .handler(async ({ data }) => createShopHandler(data));

export const fetchShopByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchShopByIdHandler(data.id));

export const updateShopByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateShopSchema)
  .handler(async ({ data }) => updateShopHandlerById(data.id as number, data));

export const deleteShopByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteShopByIdHandler(data.id));

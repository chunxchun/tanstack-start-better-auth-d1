import {
  insertInventorySchema,
  updateInventorySchema,
} from "@/db/schema/inventoryTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createInventoryHandler,
  deleteInventoryByIdHandler,
  fetchInventoryByIdHandler,
  listInventoryHandler,
  updateInventoryByIdHandler,
} from "./inventory.handler";

export const listInventoryFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listInventoryHandler(data.limit, data.offset, data.shopId),
  );

export const createInventoryFn = createServerFn({ method: "POST" })
  .inputValidator(insertInventorySchema)
  .handler(async ({ data }) => createInventoryHandler(data));

export const fetchInventoryByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchInventoryByIdHandler(Number(data.id)));

export const updateInventoryByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateInventorySchema)
  .handler(async ({ data }) =>
    updateInventoryByIdHandler(Number(data.id), data),
  );

export const deleteInventoryByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteInventoryByIdHandler(Number(data.id)));

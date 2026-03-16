import { insertSaleSchema, updateSaleSchema } from "@/db/schema/saleTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createSaleHandler,
  deleteSaleByIdHandler,
  fetchSaleByIdHandler,
  listSaleHandler,
  updateSaleHandlerById,
} from "./sale.handler";

export const listSaleFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listSaleHandler(data.limit, data.offset));

export const createSaleFn = createServerFn({ method: "POST" })
  .inputValidator(insertSaleSchema)
  .handler(async ({ data }) => createSaleHandler(data));

export const fetchSaleByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchSaleByIdHandler(data.id));

export const updateSaleByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateSaleSchema)
  .handler(async ({ data }) => updateSaleHandlerById(data.id as number, data));

export const deleteSaleByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteSaleByIdHandler(data.id));

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
  .handler(async ({ data }) =>
    listSaleHandler(data.limit, data.offset, data.shopId),
  );

export const createSaleFn = createServerFn({ method: "POST" })
  .inputValidator(insertSaleSchema)
  .handler(async ({ data }) => createSaleHandler(data));

export const fetchSaleByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchSaleByIdHandler(Number(data.id)));

export const updateSaleByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateSaleSchema)
  .handler(async ({ data }) => updateSaleHandlerById(Number(data.id), data));

export const deleteSaleByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteSaleByIdHandler(Number(data.id)));

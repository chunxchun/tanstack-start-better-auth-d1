import { insertSaleSchema, updateSaleSchema } from "@/db/schema/saleTable";
import { createServerFn } from "@tanstack/react-start";
import {
  dateMachineIdSchema,
  dateRangeMachineIdSchema,
  dateRangeShopIdSchema,
  dateShopIdSchema,
  idSchema,
  paginationSchema,
} from "../sharedSchema";
import {
  createSaleHandler,
  deleteSaleByIdHandler,
  fetchSaleByIdHandler,
  listSaleByDateByMachineIdHandler,
  listSaleByDateByShopIdHandler,
  listSaleByDateRangeByMachineIdHandler,
  listSaleByDateRangeByShopIdHandler,
  listSaleHandler,
  updateSaleHandlerById,
} from "./sale.handler";

export const listSaleFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listSaleHandler(data.limit, data.offset, data.shopId),
  );
export const listSaleByDateByShopIdFn = createServerFn({ method: "GET" })
  .inputValidator(dateShopIdSchema)
  .handler(async ({ data }) =>
    listSaleByDateByShopIdHandler(data.date, data.shopId),
  );

export const listSaleByDateByMachineIdFn = createServerFn({ method: "GET" })
  .inputValidator(dateMachineIdSchema)
  .handler(async ({ data }) =>
    listSaleByDateByMachineIdHandler(data.date, data.machineId),
  );

export const listSaleByDateRangeByShopIdFn = createServerFn({ method: "GET" })
  .inputValidator(dateRangeShopIdSchema)
  .handler(async ({ data }) =>
    listSaleByDateRangeByShopIdHandler(
      data.startDate,
      data.endDate,
      data.shopId,
    ),
  );
export const listSaleByDateRangeByMachineIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(dateRangeMachineIdSchema)
  .handler(async ({ data }) =>
    listSaleByDateRangeByMachineIdHandler(
      data.startDate,
      data.endDate,
      data.machineId,
    ),
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

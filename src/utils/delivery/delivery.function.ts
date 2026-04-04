import {
  insertDeliverySchema,
  updateDeliverySchema,
} from "@/db/schema/deliveryTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createDeliveryHandler,
  deleteDeliveryByIdHandler,
  fetchDeliveryByIdHandler,
  listDeliveryHandler,
  updateDeliveryByIdHandler,
} from "./delivery.handler";

export const listDeliveryFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listDeliveryHandler(data.limit, data.offset, data.shopId)  );

export const createDeliveryFn = createServerFn({ method: "POST" })
  .inputValidator(insertDeliverySchema)
  .handler(async ({ data }) => createDeliveryHandler(data));

export const fetchDeliveryByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchDeliveryByIdHandler(Number(data.id)));

export const updateDeliveryByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateDeliverySchema)
  .handler(async ({ data }) =>
    updateDeliveryByIdHandler(data.id as number, data),
  );

export const deleteDeliveryByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteDeliveryByIdHandler(Number(data.id)));

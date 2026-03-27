import { insertDeliverItemSchema, updateDeliverItemSchema } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createDeliverItemHandler,
  deleteDeliverItemByIdHandler,
  fetchDeliverItemByDeliveryIdHandler,
  fetchDeliverItemByFoodItemIdHandler,
  fetchDeliverItemByIdHandler,
  listDeliverItemHandler,
  updateDeliverItemHandlerById,
} from "./deliverItem.handler";

export const listDeliverItemFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listDeliverItemHandler(data.limit, data.offset));

export const createDeliverItemFn = createServerFn({ method: "POST" })
  .inputValidator(insertDeliverItemSchema)
  .handler(async ({ data }) => createDeliverItemHandler(data));

export const fetchDeliverItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchDeliverItemByIdHandler(Number(data.id)));

export const fetchDeliverItemByDeliveryIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchDeliverItemByDeliveryIdHandler(Number(data.id)),
  );

export const fetechDeliverItemByFoodItemIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchDeliverItemByFoodItemIdHandler(Number(data.id)),
  );

export const updateDeliverItemByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateDeliverItemSchema)
  .handler(async ({ data }) =>
    updateDeliverItemHandlerById(Number(data.id), data),
  );

export const deleteDeliverItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteDeliverItemByIdHandler(Number(data.id)));

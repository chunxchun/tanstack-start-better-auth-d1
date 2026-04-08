import {
  insertFoodItemSchema,
  updateFoodItemSchema,
} from "@/db/schema/foodItemTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema, shopIdSchema } from "../sharedSchema";
import {
  createFoodItemHandler,
  deleteFoodItemByIdHandler,
  fetchFoodItemByIdHandler,
  listFoodItemByShopIdHandler,
  listFoodItemHandler,
  updateFoodItemByIdHandler,
} from "./foodItem.handler";

export const listFoodItemFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listFoodItemHandler(data.limit, data.offset, data.shopId)  );

export const listFoodItemByShopIdFn = createServerFn({ method: "GET" })
  .inputValidator(shopIdSchema)
  .handler(async ({ data }) => listFoodItemByShopIdHandler(Number(data.shopId)));

  export const createFoodItemFn = createServerFn({ method: "POST" })
  .inputValidator(insertFoodItemSchema)
  .handler(async ({ data }) => createFoodItemHandler(data));

export const fetchFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchFoodItemByIdHandler(Number(data.id)));

export const updateFoodItemByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateFoodItemSchema)
  .handler(async ({ data }) =>
    updateFoodItemByIdHandler(Number(data.id), data),
  );

export const deleteFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteFoodItemByIdHandler(Number(data.id)));

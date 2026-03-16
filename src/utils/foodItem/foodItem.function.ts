import {
  insertFoodItemSchema,
  updateFoodItemSchema,
} from "@/db/schema/foodItemTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createFoodItemHandler,
  deleteFoodItemByIdHandler,
  fetchFoodItemByIdHandler,
  listFoodItemHandler,
  updateFoodItemByIdHandler,
} from "./foodItem.handler";

export const listFoodItemFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listFoodItemHandler(data.limit, data.offset));

export const createFoodItemFn = createServerFn({ method: "POST" })
  .inputValidator(insertFoodItemSchema)
  .handler(async ({ data }) => createFoodItemHandler(data));

export const fetchFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchFoodItemByIdHandler(data.id));

export const updateFoodItemByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateFoodItemSchema)
  .handler(async ({ data }) =>
    updateFoodItemByIdHandler(data.id as number, data),
  );

export const deleteFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteFoodItemByIdHandler(data.id));

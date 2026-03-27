import {
  createMenuFoodItemHandler,
  deleteMenuFoodItemByIdHandler,
  fetchMenuFoodItemByIdHandler,
  fetchMenuFoodItemByMenuIdHandler,
  listMenuFoodItemHandler,
  updateMenuFoodItemByIdHandler,
} from "./menuFoodItem.handler";
import { idSchema, paginationSchema } from "../sharedSchema";
import { createServerFn } from "@tanstack/react-start";
import {
  insertMenuFoodItemSchema,
  updateMenuFoodItemSchema,
} from "@/db/schema";

export const listMenuFoodItemFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) =>
    listMenuFoodItemHandler(data.limit, data.offset),
  );

export const createMenuFoodItemFn = createServerFn({ method: "POST" })
  .inputValidator(insertMenuFoodItemSchema)
  .handler(async ({ data }) => createMenuFoodItemHandler(data));

export const fetchMenuFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchMenuFoodItemByIdHandler(Number(data.id)));

export const fetchMenuFoodItemByMenuIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    fetchMenuFoodItemByMenuIdHandler(Number(data.id)),
  );

export const updateMenuFoodItemByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateMenuFoodItemSchema)
  .handler(async ({ data }) =>
    updateMenuFoodItemByIdHandler(Number(data.id), data),
  );

export const deleteMenuFoodItemByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) =>
    deleteMenuFoodItemByIdHandler(Number(data.id)),
  );
import { sql } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { shopsTable } from "./shopTable";
import { currencyValues } from "./commonSchema";

export const foodCategoryValues = ["bento", "snack", "drink"] as const;
export const foodCategoryEnum = z.enum(foodCategoryValues);
export type FoodCategory = (typeof foodCategoryValues)[number];

export const foodItemsTable = sqliteTable(
  "food_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    shopId: integer("shop_id")
      .notNull()
      .references(() => shopsTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    description: text("description", { length: 200 }),
    category: text("category", { enum: foodCategoryValues })
      .notNull()
      .default("bento"),
    skuCode: text("sku_code", { length: 100 }).notNull(),
    price: real("price").notNull(),
    currency: text("currency", { enum: currencyValues })
      .notNull()
      .default("AUD"),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    updatedAt: integer("updated_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
  (table) => [unique().on(table.shopId, table.skuCode)],
);

export const insertFoodItemSchema = createInsertSchema(foodItemsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateFoodItemSchema = createUpdateSchema(foodItemsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectFoodItemSchema = createSelectSchema(foodItemsTable);

export type InsertFoodItemType = z.infer<typeof insertFoodItemSchema>;
export type UpdateFoodItemType = z.infer<typeof updateFoodItemSchema>;
export type SelectFoodItemType = z.infer<typeof selectFoodItemSchema>;

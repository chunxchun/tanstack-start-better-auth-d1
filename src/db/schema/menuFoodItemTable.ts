import { sql } from "drizzle-orm";
import { integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { foodItemsTable } from "./foodItemTable";
import { menusTable } from "./menuTable";

export const menusFoodItemsTable = sqliteTable(
  "menus_food_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    menuId: integer("menu_id")
      .notNull()
      .references(() => menusTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    foodItemId: integer("food_item_id")
      .notNull()
      .references(() => foodItemsTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
    updatedAt: integer("updated_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
  },
  (table) => [unique().on(table.menuId, table.foodItemId)],
);

export const insertMenuFoodItemSchema = createInsertSchema(
  menusFoodItemsTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateMenuFoodItemSchema = createUpdateSchema(
  menusFoodItemsTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectMenuFoodItemSchema = createSelectSchema(menusFoodItemsTable);

export type InsertMenuFoodItemType = z.infer<typeof insertMenuFoodItemSchema>;
export type UpdateMenuFoodItemType = z.infer<typeof updateMenuFoodItemSchema>;
export type SelectMenuFoodItemType = z.infer<typeof selectMenuFoodItemSchema>;

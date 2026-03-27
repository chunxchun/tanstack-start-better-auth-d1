import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { shopsTable } from "./shopTable";

export const menusTable = sqliteTable("menus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shopId: integer("shop_id")
    .notNull()
    .references(() => shopsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  coverPhotoUrl: text("cover_photo_url"),
  date: text("date").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertMenuSchema = createInsertSchema(menusTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateMenuSchema = createUpdateSchema(menusTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectMenuSchema = createSelectSchema(menusTable);

export type InsertMenuType = z.infer<typeof insertMenuSchema>;
export type UpdateMenuType = z.infer<typeof updateMenuSchema>;
export type SelectMenuType = z.infer<typeof selectMenuSchema>;
export type insertMenuWithFoodItemsType = InsertMenuType & { foodItemIds: number[] };
export type updateMenuWithFoodItemsType = UpdateMenuType & { foodItemIds: number[] }; 
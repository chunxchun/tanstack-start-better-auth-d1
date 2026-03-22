import { sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { deliveriesTable } from "./deliveryTable";
import { foodItemsTable } from "./foodItemTable";

export const deliverItemsTable = sqliteTable("deliver_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  deliveryId: integer("delivery_id")
    .notNull()
    .references(() => deliveriesTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  foodItemId: integer("food_item_id")
    .notNull()
    .references(() => foodItemsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  quantity: integer("quantity").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertDeliverItemSchema = createInsertSchema(
  deliverItemsTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateDeliverItemSchema = createUpdateSchema(
  deliverItemsTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectDeliverItemSchema = createSelectSchema(deliverItemsTable);

export type InsertDeliverItemType = z.infer<typeof insertDeliverItemSchema>;
export type UpdateDeliverItemType = z.infer<typeof updateDeliverItemSchema>;
export type SelectDeliverItemType = z.infer<typeof selectDeliverItemSchema>;

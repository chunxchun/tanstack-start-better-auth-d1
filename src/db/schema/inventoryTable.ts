import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { foodItemsTable } from "./foodItemTable";
import { machinesTable } from "./machineTable";

export const inventoriesTable = sqliteTable("inventories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  machineId: integer("machine_id")
    .notNull()
    .references(() => machinesTable.id, {
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
  date: text("date").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertInventorySchema = createInsertSchema(inventoriesTable);
export const updateInventorySchema = createUpdateSchema(inventoriesTable);
export const selectInventorySchema = createSelectSchema(inventoriesTable);

export type InsertInventory = z.infer<typeof insertInventorySchema>;
export type UpdateInventory = z.infer<typeof updateInventorySchema>;
export type SelectInventory = z.infer<typeof selectInventorySchema>;

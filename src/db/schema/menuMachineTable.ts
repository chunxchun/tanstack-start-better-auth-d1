import { sql } from "drizzle-orm";
import { integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { machinesTable } from "./machineTable";
import { menusTable } from "./menuTable";

export const menusMachinesTable = sqliteTable(
  "menus_machines",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    menuId: integer("menu_id")
      .references(() => menusTable.id, { onDelete: "restrict" })
      .notNull(),
    machineId: integer("machine_id")
      .references(() => machinesTable.id, { onDelete: "restrict" })
      .notNull(),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
    updatedAt: integer("updated_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
  },
  (table) => [unique().on(table.menuId, table.machineId)],
);

export const insertMenuMachineSchema = createInsertSchema(
  menusMachinesTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateMenuMachineSchema = createUpdateSchema(
  menusMachinesTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectMenuMachineSchema = createSelectSchema(menusMachinesTable);

export type InsertMenuMachineType = z.infer<typeof insertMenuMachineSchema>;
export type UpdateMenuMachineType = z.infer<typeof updateMenuMachineSchema>;
export type SelectMenuMachineType = z.infer<typeof selectMenuMachineSchema>;

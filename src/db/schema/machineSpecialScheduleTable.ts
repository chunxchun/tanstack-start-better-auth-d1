import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { specialHoursTable } from "./specialHourTable";
import { machinesTable } from "./machineTable";

export const machineSpecialScheduleTable = sqliteTable(
  "machine_special_schedule",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    machineId: integer("machine_id")
      .notNull()
      .references(() => machinesTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    specialHourId: integer("special_hour_id")
      .notNull()
      .references(() => specialHoursTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    updatedAt: integer("updated_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  },
);

export const insertMachineSpecialScheduleSchema = createInsertSchema(
  machineSpecialScheduleTable,
).omit({ createdAt: true, updatedAt: true });
export const updateMachineSpecialScheduleSchema = createUpdateSchema(
  machineSpecialScheduleTable,
).omit({ createdAt: true, updatedAt: true });
export const selectMachineSpecialScheduleSchema = createSelectSchema(
  machineSpecialScheduleTable,
);

export type InsertMachineSpecialScheduleType = z.infer<
  typeof insertMachineSpecialScheduleSchema
>;
export type UpdateMachineSpecialScheduleType = z.infer<
  typeof updateMachineSpecialScheduleSchema
>;
export type SelectMachineSpecialScheduleType = z.infer<
  typeof selectMachineSpecialScheduleSchema
>;

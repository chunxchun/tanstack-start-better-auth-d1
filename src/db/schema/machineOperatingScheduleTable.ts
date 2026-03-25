import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { specialHours } from "./specialHourTable";
import { machinesTable } from "./machineTable";
import { operatingHours } from "./operationHourTable";

export const machineOperatingScheduleTable = sqliteTable(
  "machine_operating_schedule",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    machineId: integer("machine_id")
      .notNull()
      .references(() => machinesTable.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    operatingHourId: integer("operating_hour_id")
      .notNull()
      .references(() => operatingHours.id, {
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

export const insertMachineOperatingScheduleSchema = createInsertSchema(
  machineOperatingScheduleTable,
).omit({ createdAt: true, updatedAt: true });
export const updateMachineOperatingScheduleSchema = createUpdateSchema(
  machineOperatingScheduleTable,
).omit({ createdAt: true, updatedAt: true });
export const selectMachineOperatingScheduleSchema = createSelectSchema(
  machineOperatingScheduleTable,
);

export type InsertMachineOperatingSchedule = z.infer<
  typeof insertMachineOperatingScheduleSchema
>;
export type UpdateMachineOperatingSchedule = z.infer<
  typeof updateMachineOperatingScheduleSchema
>;
export type SelectMachineOperatingSchedule = z.infer<
  typeof selectMachineOperatingScheduleSchema
>;

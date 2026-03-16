import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { locationsTable } from "./locationTable";

export const machineStatusValues = [
  "active",
  "inactive",
  "maintenance",
] as const;
export const machineStatusEnum = z.enum(machineStatusValues);
export type MachineStatus = (typeof machineStatusValues)[number];

export const machinesTable = sqliteTable("machines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationId: integer("location_id").references(() => locationsTable.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  name: text("name", { length: 100 }).notNull(),
  serialNumber: text("serial_number", { length: 100 }).notNull().unique(),
  status: text("status", { enum: machineStatusValues }).default("active"),
  description: text("description", { length: 200 }),
  installationDate: text("installation_date").notNull(), // ISO 8601 format (YYYY-MM-DD)
  startWorkingHour: text("start_working_hour").notNull(), // HH:MM format (e.g., "09:00")
  closeWorkingHour: text("close_working_hour").notNull(), // HH:MM format (e.g., "17:00")
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertMachineSchema = createInsertSchema(machinesTable);
export const updateMachineSchema = createUpdateSchema(machinesTable);
export const selectMachineSchema = createSelectSchema(machinesTable);

export type InsertMachine = z.infer<typeof insertMachineSchema>;
export type UpdateMachine = z.infer<typeof updateMachineSchema>;
export type SelectMachine = z.infer<typeof selectMachineSchema>;

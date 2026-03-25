import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { locationsTable } from "./locationTable";
import { shopsTable } from "./shopTable";

export const machineVersionValues = ["V5", "V6"] as const;
export const machineVersionEnum = z.enum(machineVersionValues);
export type MachineVersion = (typeof machineVersionValues)[number];

export const machineStatusValues = [
  "active",
  "inactive",
  "maintenance",
] as const;
export const machineStatusEnum = z.enum(machineStatusValues);
export type MachineStatus = (typeof machineStatusValues)[number];

export const machineModeValues = ["sold", "rent"] as const;
export const machineModeEnum = z.enum(machineModeValues);
export type MachineMode = (typeof machineModeValues)[number];

export const machinesTable = sqliteTable("machines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationId: integer("location_id").references(() => locationsTable.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }), // get timezone by referencing location
  shopId: integer("shop_id").references(() => shopsTable.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  serialNumber: text("serial_number", { length: 100 }).notNull().unique(),
  status: text("status", { enum: machineStatusValues }).default("active"),
  version: text("version", { enum: machineVersionValues }).notNull(),
  mode: text("mode", { enum: machineModeValues }).notNull(),
  dayEndStockAutoReset: integer("day_end_stock_auto_reset", {
    mode: "boolean",
  }).default(false),
  installationDate: text("installation_date").notNull(), // ISO 8601 format (YYYY-MM-DD)
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertMachineSchema = createInsertSchema(machinesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateMachineSchema = createUpdateSchema(machinesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectMachineSchema = createSelectSchema(machinesTable);

export type InsertMachineType = z.infer<typeof insertMachineSchema>;
export type UpdateMachineType = z.infer<typeof updateMachineSchema>;
export type SelectMachineType = z.infer<typeof selectMachineSchema>;

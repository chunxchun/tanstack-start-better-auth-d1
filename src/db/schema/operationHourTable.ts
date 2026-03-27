import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const operatingHoursTable = sqliteTable("operation_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("name", { length: 100 }),
  description: text("description", { length: 200 }),
  dayOfWeek: integer("day_of_week").notNull(), // 0 for Sunday, 6 for Saturday
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  openingTime: text("opening_time").notNull(),
  closingTime: text("closing_time").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertOperatingHourSchema = createInsertSchema(
  operatingHoursTable,
).omit({ createdAt: true, updatedAt: true });
export const updateOperatingHourSchema = createUpdateSchema(
  operatingHoursTable,
).omit({ createdAt: true, updatedAt: true });
export const selectOperatingHourSchema =
  createSelectSchema(operatingHoursTable);

export type InsertOperatingHourType = z.infer<typeof insertOperatingHourSchema>;
export type UpdateOperatingHourType = z.infer<typeof updateOperatingHourSchema>;
export type SelectOperatingHourType = z.infer<typeof selectOperatingHourSchema>;

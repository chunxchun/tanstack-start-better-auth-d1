import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const specialHoursTable = sqliteTable("special_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("name", { length: 100 }),
  description: text("description", { length: 200 }),
  specificDate: text("specific_date").notNull(), // Format: YYYY-MM-DD
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  openingTime: text("opening_time").notNull(),
  closingTime: text("closing_time").notNull(),
  reason: text("reason", { length: 200 }),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertSpecialHourSchema = createInsertSchema(
  specialHoursTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateSpecialHourSchema = createUpdateSchema(
  specialHoursTable,
).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectSpecialHourSchema = createSelectSchema(specialHoursTable);

export type InsertSpecialHourType = z.infer<typeof insertSpecialHourSchema>;
export type UpdateSpecialHourType = z.infer<typeof updateSpecialHourSchema>;
export type SelectSpecialHourType = z.infer<typeof selectSpecialHourSchema>;

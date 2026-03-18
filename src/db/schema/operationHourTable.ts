import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const dailyOperationHours = sqliteTable("daily_operation_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("name", { length: 100 }),
  description: text("description", { length: 200 }),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  startHour: text("start_hour").notNull(),
  closeHour: text("close_hour").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertDailyOperationHourSchema =
  createInsertSchema(dailyOperationHours);
  
export const operationHoursTable = sqliteTable("operation_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("name", { length: 100 }),
  description: text("description", { length: 200 }),
  mondayDailyOperationHourId: integer(
    "monday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  tuesdayDailyOperationHourId: integer(
    "tuesday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  wednesdayDailyOperationHourId: integer(
    "wednesday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  thursdayDailyOperationHourId: integer(
    "thursday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  fridayDailyOperationHourId: integer(
    "friday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  saturdayDailyOperationHourId: integer(
    "saturday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
    onDelete: "restrict",
    onUpdate: "restrict",
  }),
  sundayDailyOperationHourId: integer(
    "sunday_daily_operation_hour_id",
  ).references(() => dailyOperationHours.id, {
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
});

export const insertOperationHourSchema =
  createInsertSchema(operationHoursTable);
export const updateOperationHourSchema =
  createUpdateSchema(operationHoursTable);
export const selectOperationHourSchema =
  createSelectSchema(operationHoursTable);

export type InsertOperationHour = z.infer<typeof insertOperationHourSchema>;
export type UpdateOperationHour = z.infer<typeof updateOperationHourSchema>;
export type SelectOperationHour = z.infer<typeof selectOperationHourSchema>;

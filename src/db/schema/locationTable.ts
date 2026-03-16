import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const locationStatusValues = ["active", "inactive"] as const;
export const locationStatusEnum = z.enum(locationStatusValues);
export type LocationStatus = (typeof locationStatusValues)[number];

export const locationsTable = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  address: text("address", { length: 100 }).notNull(),
  status: text("status", { enum: locationStatusValues })
    .notNull()
    .default("active"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertLocationSchema = createInsertSchema(locationsTable);
export const updateLocationSchema = createUpdateSchema(locationsTable);
export const selectLocationSchema = createSelectSchema(locationsTable);

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type UpdateLocation = z.infer<typeof updateLocationSchema>;
export type SelectLocation = z.infer<typeof selectLocationSchema>;

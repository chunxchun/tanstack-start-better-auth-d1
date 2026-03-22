import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { countryValues } from "./commonSchema";
import { shopsTable } from "./shopTable";

export const locationStatusValues = ["active", "inactive"] as const;
export const locationStatusEnum = z.enum(locationStatusValues);
export type LocationStatus = (typeof locationStatusValues)[number];

export const locationsTable = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shopId: integer("shop_id")
    .notNull()
    .references(() => shopsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  status: text("status", { enum: locationStatusValues })
    .notNull()
    .default("active"),
  addressLine1: text("address_line1", { length: 255 }).notNull(),
  addressLine2: text("address_line2", { length: 255 }),
  addressCity: text("address_city", { length: 100 }).notNull(),
  addressState: text("address_state", { length: 100 }),
  addressPostalCode: text("address_postal_code", { length: 20 }),
  addressCountry: text("address_country", { enum: countryValues }).notNull(),
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

export type InsertLocationType = z.infer<typeof insertLocationSchema>;
export type UpdateLocationType = z.infer<typeof updateLocationSchema>;
export type SelectLocationType = z.infer<typeof selectLocationSchema>;

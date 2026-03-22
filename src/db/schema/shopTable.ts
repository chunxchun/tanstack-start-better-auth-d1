import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const shopsTable = sqliteTable("shops", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  bannerUrl: text("banner_url"),
  logoUrl: text("logo_url"),
  videoUrl: text("video_url"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
});

export const insertShopSchema = createInsertSchema(shopsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateShopSchema = createUpdateSchema(shopsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectShopSchema = createSelectSchema(shopsTable);

export type InsertShopType = z.infer<typeof insertShopSchema>;
export type UpdateShopType = z.infer<typeof updateShopSchema>;
export type SelectShopType = z.infer<typeof selectShopSchema>;

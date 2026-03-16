import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const shopTable = sqliteTable("shop", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const insertShopSchema = createInsertSchema(shopTable)
export const updateShopSchema = createUpdateSchema(shopTable);
export const selectShopSchema = createSelectSchema(shopTable);

export type InsertShop = z.infer<typeof insertShopSchema>;
export type UpdateShop = z.infer<typeof updateShopSchema>;
export type SelectShop = z.infer<typeof selectShopSchema>;

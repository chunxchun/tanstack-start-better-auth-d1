import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const shop = sqliteTable("shop", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

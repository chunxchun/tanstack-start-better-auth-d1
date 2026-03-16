import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";

export const menusTable = sqliteTable("menus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 100 }).notNull(),
  description: text("description", { length: 200 }),
  coverPhotoUrl: text("cover_photo_url"),
  date: text("date").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertMenuSchema = createInsertSchema(menusTable);
export const updateMenuSchema = createUpdateSchema(menusTable);
export const selectMenuSchema = createSelectSchema(menusTable);

export type InsertMenu = z.infer<typeof insertMenuSchema>;
export type UpdateMenu = z.infer<typeof updateMenuSchema>;
export type SelectMenu = z.infer<typeof selectMenuSchema>;
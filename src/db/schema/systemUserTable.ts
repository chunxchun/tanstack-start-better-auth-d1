import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { shopsTable } from "./shopTable";

export const systemUserRoleValues = ["admin", "manager", "staff"] as const;
export const systemUserRoleEnum = z.enum(systemUserRoleValues);
export type SystemUserRole = (typeof systemUserRoleValues)[number];


export const systemUsersTable = sqliteTable(
  "system_users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    shopId: integer("shop_id").references(() => shopsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
    name: text("name", { length: 100 }).notNull(),
    displayName: text("display_name", { length: 100 }).notNull(),
    role: text("role", { enum: systemUserRoleValues }),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
    updatedAt: integer("updated_at")
      .notNull()
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
  },
  (table) => [unique().on(table.shopId, table.displayName)],
);

export const insertSystemUserSchema = createInsertSchema(systemUsersTable);
export const updateSystemUserSchema = createUpdateSchema(systemUsersTable);
export const selectSystemUserSchema = createSelectSchema(systemUsersTable);

export type InsertSystemUserType = z.infer<typeof insertSystemUserSchema>;
export type UpdateSystemUserType = z.infer<typeof updateSystemUserSchema>;
export type SelectSystemUserType = z.infer<typeof selectSystemUserSchema>;

import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { foodItemsTable } from "./foodItemTable";
import { machinesTable } from "./machineTable";
import { currencyValues } from "./commonEnums";

export const paymentMethodValues = [
  "cash",
  "card",
  "coupon",
  "qr-code",
] as const;
export const paymentMethodEnum = z.enum(paymentMethodValues);
export type PaymentMethod = (typeof paymentMethodValues)[number];

export const salesTable = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  machineId: integer("machine_id")
    .notNull()
    .references(() => machinesTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  foodItemId: integer("food_item_id")
    .notNull()
    .references(() => foodItemsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  saleDate: text("sale_date").notNull(), // ISO 8601 format (YYYY-MM-DD)
  saleTime: text("sale_time").notNull(), // HH:MM format (e.g., "14:30")
  quantity: integer("quantity").notNull(),
  currency: text("currency", { enum: currencyValues }).notNull().default("AUD"),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
  paymentMethod: text("payment_method", {
    enum: paymentMethodValues,
  })
    .notNull()
    .default("cash"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`), // Store as ISO-8601 timestamp
});

export const insertSaleSchema = createInsertSchema(salesTable);
export const updateSaleSchema = createUpdateSchema(salesTable);
export const selectSaleSchema = createSelectSchema(salesTable);

export type InsertSale = z.infer<typeof insertSaleSchema>;
export type UpdateSale = z.infer<typeof updateSaleSchema>;
export type SelectSale = z.infer<typeof selectSaleSchema>;

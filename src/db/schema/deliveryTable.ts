import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { locationsTable } from "./locationTable";
import { machinesTable } from "./machineTable";

import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-orm/zod";
import * as z from "zod";
import { shopsTable } from "./shopTable";

export const deliveryStatusValues = [
  "pending",
  "scheduled",
  "delivered",
  "cancelled",
] as const;
export const deliveryStatusEnum = z.enum(deliveryStatusValues);
export type DeliveryStatus = (typeof deliveryStatusValues)[number];

export const deliveriesTable = sqliteTable("deliveries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shopId: integer("shop_id")
    .notNull()
    .references(() => shopsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  destinationLocationId: integer("destination_location_id")
    .notNull()
    .references(() => locationsTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  machineId: integer("machine_id")
    .notNull()
    .references(() => machinesTable.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  courierReference: text("courier_reference", { length: 100 }),
  deliverDate: text("deliver_date").notNull(),
  deliverTime: text("deliver_time").notNull(),
  status: text("status", {
    enum: deliveryStatusValues,
  })
    .notNull()
    .default("pending"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
    .$onUpdate(() => sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const insertDeliverySchema = createInsertSchema(deliveriesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateDeliverySchema = createUpdateSchema(deliveriesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectDeliverySchema = createSelectSchema(deliveriesTable);

export type InsertDeliveryType = z.infer<typeof insertDeliverySchema>;
export type UpdateDeliveryType = z.infer<typeof updateDeliverySchema>;
export type SelectDeliveryType = z.infer<typeof selectDeliverySchema>;

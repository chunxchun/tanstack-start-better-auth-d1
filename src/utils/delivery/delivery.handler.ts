import { db } from "@/db";
import {
  deliveriesTable,
  type InsertDeliveryType,
  type UpdateDeliveryType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listDeliveryHandler = async (
  limit: number = 10,
  offset: number = 1,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(deliveriesTable)
      .where(shopId ? eq(deliveriesTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing deliveries:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchDeliveryByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(deliveriesTable)
      .where(eq(deliveriesTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching delivery by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createDeliveryHandler = async (delivery: InsertDeliveryType) => {
  try {
    const result = await db
      .insert(deliveriesTable)
      .values(delivery)
      .returning();
    return result;
  } catch (error) {
    console.error("Error creating delivery:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateDeliveryByIdHandler = async (
  id: number,
  delivery: UpdateDeliveryType,
) => {
  try {
    const result = await db
      .update(deliveriesTable)
      .set(delivery)
      .where(eq(deliveriesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating delivery:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteDeliveryByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(deliveriesTable)
      .where(eq(deliveriesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting delivery:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

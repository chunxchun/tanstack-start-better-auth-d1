import { db } from "@/db";
import {
  salesTable,
  type InsertSaleType,
  type UpdateSaleType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listSaleHandler = async (
  limit: number = 10,
  offset: number = 1,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(salesTable)
      .where(shopId ? eq(salesTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing sales:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchSaleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(salesTable)
      .where(eq(salesTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching sale by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createSaleHandler = async (sale: InsertSaleType) => {
  try {
    const result = await db.insert(salesTable).values(sale).returning();
    return result;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateSaleHandlerById = async (
  id: number,
  sale: UpdateSaleType,
) => {
  try {
    const result = await db
      .update(salesTable)
      .set(sale)
      .where(eq(salesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating sale:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteSaleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(salesTable)
      .where(eq(salesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

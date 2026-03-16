import { db } from "@/db";
import {
  inventoriesTable,
  type InsertInventory,
  type UpdateInventory,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listInventoryHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(inventoriesTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing inventories:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchInventoryByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(inventoriesTable)
      .where(eq(inventoriesTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching inventory by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createInventoryHandler = async (inventory: InsertInventory) => {
  try {
    const result = await db
      .insert(inventoriesTable)
      .values(inventory)
      .returning();
    return result;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateInventoryByIdHandler = async (
  id: number,
  inventory: UpdateInventory,
) => {
  try {
    const result = await db
      .update(inventoriesTable)
      .set(inventory)
      .where(eq(inventoriesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteInventoryByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(inventoriesTable)
      .where(eq(inventoriesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

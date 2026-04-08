import { db } from "@/db";
import {
  foodItemsTable,
  type InsertFoodItemType,
  type UpdateFoodItemType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listFoodItemHandler = async (
  limit: number = 10,
  offset: number = 1,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(foodItemsTable)
      .where(shopId ? eq(foodItemsTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing food items:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const listFoodItemByShopIdHandler = async (shopId: number) => {
  try {
    const result = await db
      .select()
      .from(foodItemsTable)
      .where(eq(foodItemsTable.shopId, shopId));
    return result;
  } catch (error) {
    console.error("Error listing food items by shop id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchFoodItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(foodItemsTable)
      .where(eq(foodItemsTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching food item by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createFoodItemHandler = async (foodItem: InsertFoodItemType) => {
  try {
    const result = await db.insert(foodItemsTable).values(foodItem).returning();
    return result;
  } catch (error) {
    console.error("Error creating food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateFoodItemByIdHandler = async (
  id: number,
  foodItem: UpdateFoodItemType,
) => {
  try {
    const result = await db
      .update(foodItemsTable)
      .set(foodItem)
      .where(eq(foodItemsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteFoodItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(foodItemsTable)
      .where(eq(foodItemsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

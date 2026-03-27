import { db } from "@/db";
import {
  menusFoodItemsTable,
  type InsertMenuFoodItemType,
  type UpdateMenuFoodItemType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMenuFoodItemHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(menusFoodItemsTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No menu food items found");
    }

    return result;
  } catch (error) {
    console.error("Error listing menu food items:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuFoodItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(menusFoodItemsTable)
      .where(eq(menusFoodItemsTable.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Menu food item not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching menu food item by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuFoodItemByMenuIdHandler = async (menuId: number) => {
  try {
    const result = await db
      .select()
      .from(menusFoodItemsTable)
      .where(eq(menusFoodItemsTable.menuId, menuId));

    if (!result || result.length === 0) {
      throw new Error("Menu food items not found for menu id: " + menuId);
    }

    return result;
  } catch (error) {
    console.error("Error fetching menu food items by menu id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMenuFoodItemHandler = async (
  menuFoodItem: InsertMenuFoodItemType,
) => {
  try {
    const result = await db
      .insert(menusFoodItemsTable)
      .values(menuFoodItem)
      .returning();

    if (!result) {
      throw new Error("Failed to create menu food item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error creating menu food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMenuFoodItemHandlerById = async (
  id: number,
  menuFoodItem: UpdateMenuFoodItemType,
) => {
  try {
    const result = await db
      .update(menusFoodItemsTable)
      .set(menuFoodItem)
      .where(eq(menusFoodItemsTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to update menu food item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error updating menu food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMenuFoodItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(menusFoodItemsTable)
      .where(eq(menusFoodItemsTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to delete menu food item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error deleting menu food item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

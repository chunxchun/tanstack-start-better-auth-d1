import { db } from "@/db";
import {
  foodItemsTable,
  menusFoodItemsTable,
  menusTable,
  type InsertMenuType,
  type UpdateMenuType,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const listMenuHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(menusTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing menus:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const listMenuWithFoodItemHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select({
        menuId: menusTable.id,
        menuName: menusTable.name,
        menusCoverPhotoUrl: menusTable.coverPhotoUrl,
        menuDate: menusTable.date,
        menuShopId: menusTable.shopId,
        menuDescription: menusTable.description,
        foodItemId: foodItemsTable.id,
        foodItemName: foodItemsTable.name,
        foodImageUrl: foodItemsTable.imageUrl,
      })
      .from(menusTable)
      .leftJoin(
        menusFoodItemsTable,
        eq(menusTable.id, menusFoodItemsTable.menuId),
      )
      .leftJoin(
        foodItemsTable,
        eq(menusFoodItemsTable.foodItemId, foodItemsTable.id),
      )
      .orderBy(desc(menusTable.createdAt))
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing menus with food items:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(menusTable)
      .where(eq(menusTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching menu by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMenuHandler = async (menu: InsertMenuType) => {
  try {
    const result = await db.insert(menusTable).values(menu).returning();
    return result;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMenuHandlerById = async (
  id: number,
  menu: UpdateMenuType,
) => {
  try {
    const result = await db
      .update(menusTable)
      .set(menu)
      .where(eq(menusTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMenuByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(menusTable)
      .where(eq(menusTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

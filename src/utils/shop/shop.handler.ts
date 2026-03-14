import { db } from "@/db";
import { shopTable, type InsertShop, type UpdateShop } from "@/db/schema";
import { eq } from "drizzle-orm";

export const listShopHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(shopTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing shop:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchShopByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(shopTable)
      .where(eq(shopTable.id, id));
    return result;
  } catch (error) {
    console.error("Error fetching shop by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchShopByNameHandler = async (name: string) => {
  try {
    const result = await db
      .select()
      .from(shopTable)
      .where(eq(shopTable.name, name));
    return result;
  } catch (error) {
    console.error("Error fetching shop by name:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createShopHandler = async (shop: InsertShop) => {
  try {
    const result = await db.insert(shopTable).values(shop).returning();
    return result;
  } catch (error) {
    console.error("Error creating shop:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateShopHandlerById = async (id: number, shop: UpdateShop) => {
  try {
    const result = await db
      .update(shopTable)
      .set(shop)
      .where(eq(shopTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating shop:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteShopByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(shopTable)
      .where(eq(shopTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting shop:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

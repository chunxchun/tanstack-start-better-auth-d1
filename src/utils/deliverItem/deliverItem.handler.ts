import { db } from "@/db";
import {
  deliverItemsTable,
  type InsertDeliverItemType,
  type UpdateDeliverItemType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listDeliverItemHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(deliverItemsTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No deliver items found");
    }

    return result;
  } catch (error) {
    console.error("Error listing deliver items:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchDeliverItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(deliverItemsTable)
      .where(eq(deliverItemsTable.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Deliver item not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching deliver item by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchDeliverItemByDeliveryIdHandler = async (
  deliveryId: number,
) => {
  try {
    const result = await db
      .select()
      .from(deliverItemsTable)
      .where(eq(deliverItemsTable.deliveryId, deliveryId));

    if (!result || result.length === 0) {
      throw new Error("Deliver items not found for delivery id: " + deliveryId);
    }

    return result;
  } catch (error) {
    console.error("Error fetching deliver items by delivery id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchDeliverItemByFoodItemIdHandler = async (
  foodItemId: number,
) => {
  try {
    const result = await db
      .select()
      .from(deliverItemsTable)
      .where(eq(deliverItemsTable.foodItemId, foodItemId));

    if (!result || result.length === 0) {
      throw new Error(
        "Deliver items not found for food item id: " + foodItemId,
      );
    }

    return result;
  } catch (error) {
    console.error("Error fetching deliver items by food item id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createDeliverItemHandler = async (
  deliverItem: InsertDeliverItemType,
) => {
  try {
    const result = await db
      .insert(deliverItemsTable)
      .values(deliverItem)
      .returning();

    if (!result) {
      throw new Error("Failed to create deliver item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error creating deliver item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateDeliverItemHandlerById = async (
  id: number,
  deliverItem: UpdateDeliverItemType,
) => {
  try {
    const result = await db
      .update(deliverItemsTable)
      .set(deliverItem)
      .where(eq(deliverItemsTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to update deliver item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error updating deliver item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteDeliverItemByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(deliverItemsTable)
      .where(eq(deliverItemsTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to delete deliver item, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error deleting deliver item:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

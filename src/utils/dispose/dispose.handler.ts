import { db } from "@/db";
import {
  disposesTable,
  type InsertDisposeType,
  type UpdateDisposeType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listDisposeHandler = async (
  limit: number = 10,
  offset: number = 1,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(disposesTable)
      .where(shopId ? eq(disposesTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing disposes:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchDisposeByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(disposesTable)
      .where(eq(disposesTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching dispose by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createDisposeHandler = async (dispose: InsertDisposeType) => {
  try {
    const result = await db.insert(disposesTable).values(dispose).returning();
    return result;
  } catch (error) {
    console.error("Error creating dispose:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateDisposeByIdHandler = async (
  id: number,
  dispose: UpdateDisposeType,
) => {
  try {
    const result = await db
      .update(disposesTable)
      .set(dispose)
      .where(eq(disposesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating dispose:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteDisposeByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(disposesTable)
      .where(eq(disposesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting dispose:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

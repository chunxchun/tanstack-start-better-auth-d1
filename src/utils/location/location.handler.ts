import { db } from "@/db";
import {
  locationsTable,
  type InsertLocationType,
  type UpdateLocationType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listLocationHandler = async (
  limit: number = 10,
  offset: number = 0,
) => {
  try {
    const result = await db
      .select()
      .from(locationsTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing locations:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchLocationByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(locationsTable)
      .where(eq(locationsTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching location by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createLocationHandler = async (data: InsertLocationType) => {
  try {
    const result = await db.insert(locationsTable).values(data).returning();
    return result;
  } catch (error) {
    console.error("Error creating location:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateLocationByIdHandler = async (
  id: number,
  data: UpdateLocationType,
) => {
  try {
    const result = await db
      .update(locationsTable)
      .set(data)
      .where(eq(locationsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating location:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteLocationByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(locationsTable)
      .where(eq(locationsTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting location:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

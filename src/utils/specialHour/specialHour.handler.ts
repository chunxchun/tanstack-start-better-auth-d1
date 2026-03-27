import { db } from "@/db";
import {
  specialHoursTable,
  type InsertSpecialHourType,
  type UpdateSpecialHourType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listSpecialHourHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(specialHoursTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No special hours found");
    }

    return result;
  } catch (error) {
    console.error("Error listing special hours:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchSpecialHourByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(specialHoursTable)
      .where(eq(specialHoursTable.id, id))
      .limit(1);

    if (!result || result.length === 0) {
      throw new Error("Special hour not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching special hour by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createSpecialHourHandler = async (
  specialHour: InsertSpecialHourType,
) => {
  try {
    const result = await db
      .insert(specialHoursTable)
      .values(specialHour)
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to create special hour");
    }

    return result;
  } catch (error) {
    console.error("Error creating special hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateSpecialHourByIdHandler = async (
  id: number,
  specialHour: UpdateSpecialHourType,
) => {
  try {
    const result = await db
      .update(specialHoursTable)
      .set(specialHour)
      .where(eq(specialHoursTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to update special hour");
    }

    return result;
  } catch (error) {
    console.error("Error updating special hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteSpecialHourByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(specialHoursTable)
      .where(eq(specialHoursTable.id, id))
      .returning();     

    if (!result || result.length === 0) {
      throw new Error("Failed to delete special hour");
    }

    return result;
  } catch (error) {
    console.error("Error deleting special hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
import { db } from "@/db";
import {
  operatingHoursTable,
  type InsertOperatingHourType,
  type UpdateOperatingHourType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listOperatingHourHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(operatingHoursTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No operating hours found");
    }

    return result;
  } catch (error) {
    console.error("Error listing operating hours:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchOperatingHourByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(operatingHoursTable)
      .where(eq(operatingHoursTable.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Operating hour not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching operating hour by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createOperatingHourHandler = async (
  operatingHour: InsertOperatingHourType,
) => {
  try {
    const result = await db
      .insert(operatingHoursTable)
      .values(operatingHour)
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to create operating hour");
    }

    return result;
  } catch (error) {
    console.error("Error creating operating hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateOperatingHourByIdHandler = async (
  id: number,
  operatingHour: UpdateOperatingHourType,
) => {
  try {
    const result = await db
      .update(operatingHoursTable)
      .set(operatingHour)
      .where(eq(operatingHoursTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to update operating hour");
    }

    return result;
  } catch (error) {
    console.error("Error updating operating hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteOperatingHourByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(operatingHoursTable)
      .where(eq(operatingHoursTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to delete operating hour");
    }

    return result;
  } catch (error) {
    console.error("Error deleting operating hour:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

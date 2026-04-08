import { db } from "@/db";
import {
  machinesTable,
  type InsertMachineType,
  type UpdateMachineType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMachineHandler = async (
  limit: number = 10,
  offset: number = 1,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(machinesTable)
      .where(shopId ? eq(machinesTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing machines:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const listMachineByShopIdHandler = async (shopId: number) => {
  try {
    const result = await db
      .select()
      .from(machinesTable)
      .where(eq(machinesTable.shopId, shopId));
    return result;
  } catch (error) {
    console.error("Error listing machines by shop id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(machinesTable)
      .where(eq(machinesTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching machine by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineByLocationIdHandler = async (locationId: number) => {
  try {
    const result = await db
      .select()
      .from(machinesTable)
      .where(eq(machinesTable.locationId, locationId));
    return result;
  } catch (error) {
    console.error("Error fetching machines by location id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMachineHandler = async (machine: InsertMachineType) => {
  try {
    const result = await db.insert(machinesTable).values(machine).returning();
    return result;
  } catch (error) {
    console.error("Error creating machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMachineByIdHandler = async (
  id: number,
  machine: UpdateMachineType,
) => {
  try {
    const result = await db
      .update(machinesTable)
      .set(machine)
      .where(eq(machinesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMachineByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(machinesTable)
      .where(eq(machinesTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

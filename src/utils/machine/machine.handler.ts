import { db } from "@/db";
import {
  machinesTable,
  type InsertMachine,
  type UpdateMachine,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMachineHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(machinesTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing machines:", error);
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

export const createMachineHandler = async (machine: InsertMachine) => {
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
  machine: UpdateMachine,
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

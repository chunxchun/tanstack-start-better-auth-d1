import { db } from "@/db";
import {
  machineSpecialScheduleTable,
  type InsertMachineSpecialScheduleType,
  type UpdateMachineSpecialScheduleType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMachineSpecialScheduleHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(machineSpecialScheduleTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No machine special schedules found");
    }

    return result;
  } catch (error) {
    console.error("Error listing machine special schedules:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineSpecialScheduleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(machineSpecialScheduleTable)
      .where(eq(machineSpecialScheduleTable.id, id))
      .limit(1);

    if (!result || result.length === 0) {
      throw new Error("Machine special schedule not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching machine special schedule by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineSpecialScheduleByMachineIdHandler = async (
  machineId: number,
) => {
  try {
    const result = await db
      .select()
      .from(machineSpecialScheduleTable)
      .where(eq(machineSpecialScheduleTable.machineId, machineId));

    if (!result || result.length === 0) {
      throw new Error(
        "Machine special schedules not found for machine id: " + machineId,
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Error fetching machine special schedules by machine id:",
      error,
    );
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMachineSpecialScheduleHandler = async (
  machineSpecialSchedule: InsertMachineSpecialScheduleType,
) => {
  try {
    const result = await db
      .insert(machineSpecialScheduleTable)
      .values(machineSpecialSchedule)
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to create machine special schedule");
    }

    return result;
  } catch (error) {
    console.error("Error creating machine special schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMachineSpecialScheduleByIdHandler = async (
  id: number,
  machineSpecialSchedule: UpdateMachineSpecialScheduleType,
) => {
  try {
    const result = await db
      .update(machineSpecialScheduleTable)
      .set(machineSpecialSchedule)
      .where(eq(machineSpecialScheduleTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to update machine special schedule");
    }

    return result;
  } catch (error) {
    console.error("Error updating machine special schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMachineSpecialScheduleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(machineSpecialScheduleTable)
      .where(eq(machineSpecialScheduleTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to delete machine special schedule");
    }

    return result;
  } catch (error) {
    console.error("Error deleting machine special schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

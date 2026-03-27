import { db } from "@/db";
import {
  machineOperatingScheduleTable,
  type InsertMachineOperatingScheduleType,
  type UpdateMachineOperatingScheduleType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMachineOperatingScheduleHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(machineOperatingScheduleTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No machine operating schedules found");
    }

    return result;
  } catch (error) {
    console.error("Error listing machine operating schedules:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineOperatingScheduleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(machineOperatingScheduleTable)
      .where(eq(machineOperatingScheduleTable.id, id))
      .limit(1);

    if (!result || result.length === 0) {
      throw new Error("Machine operating schedule not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching machine operating schedule by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMachineOperatingScheduleByMachineIdHandler = async (
  machineId: number,
) => {
  try {
    const result = await db
      .select()
      .from(machineOperatingScheduleTable)
      .where(eq(machineOperatingScheduleTable.machineId, machineId));

    if (!result || result.length === 0) {
      throw new Error(
        "Machine operating schedules not found for machine id: " + machineId,
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Error fetching machine operating schedules by machine id:",
      error,
    );
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMachineOperatingScheduleHandler = async (
  machineOperatingSchedule: InsertMachineOperatingScheduleType,
) => {
  try {
    const result = await db
      .insert(machineOperatingScheduleTable)
      .values(machineOperatingSchedule)
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to create machine operating schedule");
    }

    return result;
  } catch (error) {
    console.error("Error creating machine operating schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMachineOperatingScheduleByIdHandler = async (
  id: number,
  machineOperatingSchedule: UpdateMachineOperatingScheduleType,
) => {
  try {
    const result = await db
      .update(machineOperatingScheduleTable)
      .set(machineOperatingSchedule)
      .where(eq(machineOperatingScheduleTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to update machine operating schedule");
    }

    return result;
  } catch (error) {
    console.error("Error updating machine operating schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMachineOperatingScheduleByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(machineOperatingScheduleTable)
      .where(eq(machineOperatingScheduleTable.id, id))
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to delete machine operating schedule");
    }

    return result;
  } catch (error) {
    console.error("Error deleting machine operating schedule:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

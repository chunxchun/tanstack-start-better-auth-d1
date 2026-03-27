import { db } from "@/db";
import {
  menusMachinesTable,
  type InsertMenuMachineType,
  type UpdateMenuMachineType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listMenuMachineHandler = async (
  limit: number = 10,
  offset: number = 1,
) => {
  try {
    const result = await db
      .select()
      .from(menusMachinesTable)
      .limit(limit)
      .offset(offset);

    if (!result || result.length === 0) {
      throw new Error("No menu machines found");
    }

    return result;
  } catch (error) {
    console.error("Error listing menu machines:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuMachineByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(menusMachinesTable)
      .where(eq(menusMachinesTable.id, id))
      .limit(1);

    if (!result) {
      throw new Error("Menu machine not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching menu machine by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuMachineByMenuIdHandler = async (menuId: number) => {
  try {
    const result = await db
      .select()
      .from(menusMachinesTable)
      .where(eq(menusMachinesTable.menuId, menuId));

    if (!result || result.length === 0) {
      throw new Error("Menu machines not found for menu id: " + menuId);
    }

    return result;
  } catch (error) {
    console.error("Error fetching menu machines by menu id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchMenuMachineByMachineIdHandler = async (machineId: number) => {
  try {
    const result = await db
      .select()
      .from(menusMachinesTable)
      .where(eq(menusMachinesTable.machineId, machineId));

    if (!result || result.length === 0) {
      throw new Error("Menu machines not found for machine id: " + machineId);
    }

    return result;
  } catch (error) {
    console.error("Error fetching menu machines by machine id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createMenuMachineHandler = async (
  menuMachine: InsertMenuMachineType,
) => {
  try {
    const result = await db
      .insert(menusMachinesTable)
      .values(menuMachine)
      .returning();

    if (!result) {
      throw new Error("Failed to create menu machine, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error creating menu machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateMenuMachineHandlerById = async (
  id: number,
  menuMachine: UpdateMenuMachineType,
) => {
  try {
    const result = await db
      .update(menusMachinesTable)
      .set(menuMachine)
      .where(eq(menusMachinesTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to update menu machine, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error updating menu machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteMenuMachineByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(menusMachinesTable)
      .where(eq(menusMachinesTable.id, id))
      .returning();

    if (!result) {
      throw new Error("Failed to delete menu machine, no result returned");
    }

    return result;
  } catch (error) {
    console.error("Error deleting menu machine:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

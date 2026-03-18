import { db } from "@/db";
import {
  systemUsersTable,
  type InsertSystemUserType,
  type UpdateSystemUserType,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const listUserHandler = async (limit: number = 10, offset: number = 0) => {
  try {
    const result = await db
      .select()
      .from(systemUsersTable)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing users:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchUserByIdHandler = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(systemUsersTable)
      .where(eq(systemUsersTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createUserHandler = async (user: InsertSystemUserType) => {
  try {
    const result = await db.insert(systemUsersTable).values(user).returning();
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateUserByIdHandler = async (
  id: number,
  user: UpdateSystemUserType,
) => {
  try {
    const result = await db
      .update(systemUsersTable)
      .set(user)
      .where(eq(systemUsersTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteUserByIdHandler = async (id: number) => {
  try {
    const result = await db
      .delete(systemUsersTable)
      .where(eq(systemUsersTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

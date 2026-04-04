import { db } from "@/db";
import {
  user as userTable,
  type InsertUserType,
  type UpdateUserType,
} from "@/db/schema/authSchema";
import { eq } from "drizzle-orm";

export const listUserHandler = async (
  limit: number = 10,
  offset: number = 0,
  shopId?: number,
) => {
  try {
    const result = await db
      .select()
      .from(userTable)
      .where(shopId ? eq(userTable.shopId, shopId) : undefined)
      .limit(limit)
      .offset(offset);
    return result;
  } catch (error) {
    console.error("Error listing users:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const fetchUserByIdHandler = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createUserHandler = async (user: InsertUserType) => {
  try {
    const result = await db.insert(userTable).values(user).returning();
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateUserByIdHandler = async (
  id: string,
  user: UpdateUserType,
) => {
  try {
    const result = await db
      .update(userTable)
      .set(user)
      .where(eq(userTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteUserByIdHandler = async (id: string) => {
  try {
    const result = await db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning();
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

import type { InsertUserType, UpdateUserType } from "@/db/schema";
import { getImageUrl } from "../shared.helper";
import { createUserFn, updateUserByIdFn } from "./user.function";

const getUserImageUrl = async (
  image: File,
  userId: string,
  shopId?: string | number | null,
) => {
  if (!image) return null;
  const folder = shopId
    ? `shops/${String(shopId)}/users/${userId}`
    : `users/${userId}`;
  return getImageUrl(folder, "image", image);
};

export const userHandleCreateSubmit = async (
  values: InsertUserType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    const result = await createUserFn({ data: values });
    if (!result || result.length === 0) {
      throw new Error("Failed to create user: No result returned");
    }

    const userId = result[0].id;

    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await getUserImageUrl(image, String(userId), shopId);
    }

    const updatedValues: UpdateUserType = {
      id: userId,
      image: imageUrl ?? undefined,
    };

    return await updateUserByIdFn({ data: updatedValues });
  } catch (error) {
    throw new Error(
      "Failed to create user",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

export const userHandleUpdateSubmit = async (
  values: UpdateUserType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    if (image) {
      values.image = await getUserImageUrl(image, String(values.id), shopId);
    }
    return await updateUserByIdFn({ data: values });
  } catch (error) {
    throw new Error(
      "Failed to update user",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

import type { InsertFoodItemType, UpdateFoodItemType } from "@/db/schema";
import { getImageUrl } from "../shared.helper";
import { createFoodItemFn, updateFoodItemByIdFn } from "./foodItem.function";

const getFoodItemImageUrl = async (
  image: File,
  foodItemId: string | number,
  shopId: string | number | null = null,
) => {
  if (!image) return null;
  const folder = shopId
    ? `shops/${String(shopId)}/foodItems/${String(foodItemId)}`
    : `foodItems/${String(foodItemId)}`;
  return getImageUrl(folder, "image", image);
};

export const foodItemHandleCreateSubmit = async (
  values: InsertFoodItemType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    const result = await createFoodItemFn({ data: values });
    if (!result || result.length === 0) {
      throw new Error("Failed to create food item");
    }

    const foodItemId = result[0].id;

    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await getFoodItemImageUrl(image, foodItemId, shopId);
    }

    const updatedValues: UpdateFoodItemType = {
      id: foodItemId,
      imageUrl: imageUrl ?? undefined,
    };

    return await updateFoodItemByIdFn({ data: updatedValues });
  } catch (error) {
    throw new Error(
      "Failed to create food item",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

export const foodItemHandleUpdateSubmit = async (
  values: UpdateFoodItemType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    if (image) {
      values.imageUrl = await getFoodItemImageUrl(
        image,
        values.id as number,
        shopId,
      );
    }

    return await updateFoodItemByIdFn({ data: values });
  } catch (error) {
    throw new Error(
      "Failed to update food item",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

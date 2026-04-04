import {
  type InsertMenuWithFoodItemsType,
  type MenuFoodItemType,
  type SelectMenuType,
  type SelectMenuWithFoodItemsType,
  type UpdateMenuType,
  type UpdateMenuWithFoodItemsType,
} from "@/db/schema";
import {
  createMenuFoodItemFn,
  deleteMenuFoodItemByIdFn,
  fetchMenuFoodItemByMenuIdFn,
} from "../menuFoodItem/menuFoodItem.function";
import { getImageUrl } from "../shared.helper";
import { createMenuFn, updateMenuByIdFn } from "./menu.function";

export const splitMenuWithFoodItemsData = (
  data: InsertMenuWithFoodItemsType | UpdateMenuWithFoodItemsType,
) => {
  const { menuFoodItems, ...menuData } = data;

  return {
    menu: menuData as SelectMenuType,
    menuFoodItems: menuFoodItems as MenuFoodItemType[],
  };
};

export const handleMenuWithFoodItemSubmit = async (
  data: InsertMenuWithFoodItemsType | UpdateMenuWithFoodItemsType,
) => {
  const { menu, menuFoodItems } = splitMenuWithFoodItemsData(data);

  const parsedMenu = { ...menu, shopId: Number(menu.shopId) } as SelectMenuType;
  const createMenuResult = await createMenuFn({ data: parsedMenu });

  if (!createMenuResult) {
    throw new Error("Menu creation failed");
  }

  const menuId = Number(createMenuResult[0].id);
  const createAttachedFoodItems = menuFoodItems.map(async (foodItem) => {
    createMenuFoodItemFn({ data: { menuId, foodItemId: foodItem.id } });
  });
  const createAttachedFoodItemsResult = await Promise.all(
    createAttachedFoodItems,
  );
  return {
    menu: createMenuResult[0],
    menuFoodItems: createAttachedFoodItemsResult,
  };
};

export type queryMenuWithFoodItemType = {
  menuId: number;
  menuName: string;
  menusCoverPhotoUrl?: string | null;
  menuDate: string;
  menuShopId: number;
  menuDescription?: string | null;
  foodItemId: number;
  foodItemName: string;
  foodImageUrl?: string | null;
};

export const destructMenuWithFoodItem = (
  menuWithFoodItem: queryMenuWithFoodItemType,
) => {
  const menu: UpdateMenuType = {
    id: menuWithFoodItem.menuId,
    name: menuWithFoodItem.menuName,
    coverPhotoUrl: menuWithFoodItem.menusCoverPhotoUrl ?? undefined,
    date: menuWithFoodItem.menuDate,
    shopId: menuWithFoodItem.menuShopId,
    description: menuWithFoodItem.menuDescription ?? undefined,
  };

  const foodItem: MenuFoodItemType = {
    id: menuWithFoodItem.foodItemId,
    name: menuWithFoodItem.foodItemName,
    imageUrl: menuWithFoodItem.foodImageUrl ?? undefined,
  };
  return { menu, foodItem };
};

export const constructMenuWithFoodItem = (
  menuWithFoodItems: queryMenuWithFoodItemType[],
): SelectMenuWithFoodItemsType[] => {
  return menuWithFoodItems.reduce((acc, cur) => {
    const { menu, foodItem } = destructMenuWithFoodItem(cur);
    const existingMenuIndex = acc.findIndex((item) => item.id === menu.id);

    if (existingMenuIndex !== -1) {
      acc[existingMenuIndex].menuFoodItems.push(foodItem as MenuFoodItemType);
    } else {
      acc.push({ ...(menu as SelectMenuType), menuFoodItems: [foodItem] });
    }

    return acc;
  }, [] as SelectMenuWithFoodItemsType[]);
};

const getMenuImageUrl = async (
  image: File,
  menuId: string | number,
  shopId: string | number | null = null,
) => {
  if (!image) return null;
  const folder = shopId
    ? `shops/${String(shopId)}/menus/${String(menuId)}`
    : `menus/${String(menuId)}`;
  return getImageUrl(folder, "image", image);
};

export const menuHandleCreateSubmit = async (
  values: InsertMenuWithFoodItemsType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    const { menuFoodItems, ...menuWithoutFoodItems } = values;
    const parsedValues = {
      ...menuWithoutFoodItems,
      shopId: Number(menuWithoutFoodItems.shopId),
    };

    const result = await createMenuFn({ data: parsedValues });
    if (!result || result.length === 0) {
      throw new Error("Failed to create menu");
    }

    const menuId = result[0].id;

    // attach food items
    const attachFoodItems = menuFoodItems.map(async (foodItem) =>
      createMenuFoodItemFn({ data: { menuId, foodItemId: foodItem.id } }),
    );
    await Promise.all(attachFoodItems);

    // upload image
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await getMenuImageUrl(image, String(menuId), shopId);
    }

    const updatedValues: UpdateMenuType = {
      id: menuId,
      coverPhotoUrl: imageUrl ?? undefined,
    };

    return await updateMenuByIdFn({ data: updatedValues });
  } catch (error) {
    throw new Error(
      "Failed to create menu",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

export const menuHandleUpdateSubmit = async (
  values: UpdateMenuWithFoodItemsType,
  image: File | null = null,
  shopId: string | number | null = null,
) => {
  try {
    // update image
    if (image) {
      values.coverPhotoUrl = await getMenuImageUrl(
        image,
        String(values.id),
        shopId,
      );
    }

    // update menu data without food items
    const { menuFoodItems, ...menuWithoutFoodItems } = values;

    await updateMenuByIdFn({ data: menuWithoutFoodItems });

    // attach food items
    const originalAttachFoodItems = await fetchMenuFoodItemByMenuIdFn({
      data: { id: values.id },
    });
    const originalFoodItemIds = originalAttachFoodItems.map(
      (item) => item.foodItemId,
    );
    const newFoodItemIds = menuFoodItems.map((item) => item.id);

    const foodItemsToAdd = newFoodItemIds.filter(
      (id) => !originalFoodItemIds.includes(id),
    );
    const foodItemsToRemove = originalFoodItemIds.filter(
      (id) => !newFoodItemIds.includes(id),
    );

    const addPromises = foodItemsToAdd.map((foodItemId) =>
      createMenuFoodItemFn({
        data: { menuId: values.id as number, foodItemId },
      }),
    );

    const removePromises = foodItemsToRemove.map((foodItemId) =>
      deleteMenuFoodItemByIdFn({ data: { id: foodItemId as number } }),
    );

    await Promise.all([...addPromises, ...removePromises]);
  } catch (error) {
    throw new Error(
      "Failed to update menu",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

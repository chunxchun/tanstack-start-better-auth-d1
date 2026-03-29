import {
  type InsertMenuType,
  type InsertMenuWithFoodItemsType,
  type MenuFoodItemType,
  type SelectMenuType,
  type SelectMenuWithFoodItemsType,
  type UpdateMenuType,
  type UpdateMenuWithFoodItemsType,
} from "@/db/schema";
import { createMenuFoodItemFn } from "../menuFoodItem/menuFoodItem.function";
import { createMenuFn } from "./menu.function";

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

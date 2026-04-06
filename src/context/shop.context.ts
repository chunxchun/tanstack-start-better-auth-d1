import { createContext } from "react";
import type { SelectShopType } from "@/db/schema";

export type ShopContextValue = {
  activeShop: SelectShopType | null;
  setActiveShop: (shop: SelectShopType | null) => void;
}
export const ShopContext = createContext<ShopContextValue | null>(null);

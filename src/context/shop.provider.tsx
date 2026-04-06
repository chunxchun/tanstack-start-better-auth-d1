import type { SelectShopType } from "@/db/schema";
import { useState, type ReactNode } from "react";
import { ShopContext } from "./shop.context";

type ShopProviderProps = {
  children: ReactNode;
  initialValue?: SelectShopType | null;
}

export const ShopProvider = ({
  children,
  initialValue = null,
}: ShopProviderProps) => {
  const [activeShop, setActiveShop] = useState<SelectShopType | null>(initialValue);

  return (
    <ShopContext.Provider value={{ activeShop, setActiveShop }}>
      {children}
    </ShopContext.Provider>
  );
}
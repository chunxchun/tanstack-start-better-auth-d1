import { createContext } from "react";
import type { SelectShopType } from "@/db/schema";

export const ShopContext = createContext<SelectShopType | null>(null);

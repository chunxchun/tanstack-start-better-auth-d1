import { createContext } from "react";
import type { Palette } from "@/lib/theme";

export type ThemeContextValue = {
	theme: Palette | null;
	setThemeCookie: (theme: Palette) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

  
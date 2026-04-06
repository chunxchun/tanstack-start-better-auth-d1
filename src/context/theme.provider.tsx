import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./theme.context";
import { PALETTES, type Palette } from "@/lib/theme";
import { THEME_COOKIE } from "@/lib/utils";

type ThemeProviderProps = {
  children: ReactNode;
  initialValue?: Palette | null;
};

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;

  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);

  return value ? decodeURIComponent(value) : null;
};

const findPalette = (value: string | null | undefined) => {
  if (!value) return null;

  return (
    PALETTES.find((palette) => palette.id === value) ??
    PALETTES.find((palette) => palette.name === value) ??
    null
  );
};

const applyPaletteToRoot = (palette: Palette | null) => {
  if (typeof document === "undefined" || !palette) return;

  const root = document.documentElement;
  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", palette.primaryForeground);
  root.style.setProperty("--secondary", palette.secondary);
  root.style.setProperty("--secondary-foreground", palette.secondaryForeground);
};

export const ThemeProvider = ({
  children,
  initialValue = null,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Palette | null>(() => {
    return initialValue ?? findPalette(getCookieValue(THEME_COOKIE));
  });

  useEffect(() => {
    applyPaletteToRoot(theme);
  }, [theme]);

  const setThemeCookie = (theme: Palette) => {
    applyPaletteToRoot(theme);
    setTheme(theme);

    if (typeof document !== "undefined") {
      document.cookie = `${THEME_COOKIE}=${encodeURIComponent(theme.id)}; path=/; max-age=${60 * 60 * 24 * 360}`;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeCookie }}>
      {children}
    </ThemeContext.Provider>
  );
};

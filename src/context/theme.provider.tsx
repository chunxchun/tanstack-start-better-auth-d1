import { useMemo, useState, type ReactNode } from "react";
import { ThemeContext } from "./theme.context";
import { PALETTES, type Palette } from "@/lib/theme";
import { THEME_COOKIE } from "@/lib/utils";

type ThemeProviderProps = {
  children: ReactNode;
  initialValue?: Palette | null;
};

export const ThemeProvider = ({
  children,
  initialValue = null,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Palette | null>(initialValue);

  // useEffect(() => {
  //   if (theme || typeof document === "undefined") return;

  //   const prefix = `${THEME_COOKIE}=`;
  //   const cookieValue = document.cookie
  //     .split(";")
  //     .map((part) => part.trim())
  //     .find((part) => part.startsWith(prefix))
  //     ?.slice(prefix.length);

  //   if (!cookieValue) return;

  //   const decodedName = decodeURIComponent(cookieValue);
  //   const savedPalette = PALETTES.find((palette) => palette.name === decodedName);

  //   if (savedPalette) {
  //     setTheme(savedPalette);
  //   }
  // }, [theme]);

  const setThemeCookie = (theme: Palette) => {
    setTheme(theme);
    document.cookie = `${THEME_COOKIE}=${theme.name}; path=/; max-age=${60 * 60 * 24 * 360}`;
  };

  const themeCss = useMemo(() => {
    if (!theme) return "";

    const palette = PALETTES.filter((p) => p.name === theme.name)[0];

    return `
      :root {
        --primary: ${palette.primary};
        --primary-foreground: ${palette.primaryForeground};
        --secondary: ${palette.secondary};
        --secondary-foreground: ${palette.secondaryForeground};
      }
    `;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeCookie }}>
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      {children}
    </ThemeContext.Provider>
  );
};

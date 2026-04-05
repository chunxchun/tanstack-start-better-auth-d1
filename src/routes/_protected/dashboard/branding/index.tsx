import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Palette = {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
};

const BRANDING_STORAGE_KEY = "branding-palette";

const PALETTES: Palette[] = [
  {
    id: "slate",
    name: "Slate Core",
    description: "Calm and professional with neutral contrast.",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.97 0 0)",
    secondaryForeground: "oklch(0.205 0 0)",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "Fresh and modern with cool blue accents.",
    primary: "oklch(0.56 0.19 253)",
    primaryForeground: "oklch(0.98 0.01 250)",
    secondary: "oklch(0.93 0.03 240)",
    secondaryForeground: "oklch(0.34 0.08 250)",
  },
  {
    id: "forest",
    name: "Forest Mint",
    description: "Natural greens with soft mint highlights.",
    primary: "oklch(0.53 0.16 154)",
    primaryForeground: "oklch(0.98 0.02 150)",
    secondary: "oklch(0.94 0.03 160)",
    secondaryForeground: "oklch(0.31 0.08 158)",
  },
  {
    id: "sunset",
    name: "Sunset Ember",
    description: "Warm and energetic with amber-red tones.",
    primary: "oklch(0.62 0.21 30)",
    primaryForeground: "oklch(0.99 0.01 50)",
    secondary: "oklch(0.95 0.04 45)",
    secondaryForeground: "oklch(0.34 0.11 28)",
  },
];

const applyPalette = (palette: Palette) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", palette.primaryForeground);
  root.style.setProperty("--secondary", palette.secondary);
  root.style.setProperty("--secondary-foreground", palette.secondaryForeground);
};

export const Route = createFileRoute("/_protected/dashboard/branding/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(PALETTES[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedPaletteId = window.localStorage.getItem(BRANDING_STORAGE_KEY);
    const savedPalette = PALETTES.find((palette) => palette.id === savedPaletteId);
    const initialPalette = savedPalette ?? PALETTES[0];

    setSelectedPaletteId(initialPalette.id);
    applyPalette(initialPalette);
  }, []);

  const handlePaletteChange = (palette: Palette) => {
    setSelectedPaletteId(palette.id);
    applyPalette(palette);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(BRANDING_STORAGE_KEY, palette.id);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Branding</h1>
        <p className="text-sm text-muted-foreground">
          Choose one of four preset color palettes to update your app look and feel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PALETTES.map((palette) => {
          const isActive = palette.id === selectedPaletteId;

          return (
            <button
              key={palette.id}
              type="button"
              onClick={() => handlePaletteChange(palette)}
              className={[
                "rounded-xl border p-4 text-left transition-all",
                "hover:border-primary/60 hover:shadow-sm",
                isActive
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{palette.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{palette.description}</p>
                </div>
                {isActive ? (
                  <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    Active
                  </span>
                ) : null}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div
                  className="h-10 rounded-md border"
                  style={{
                    backgroundColor: palette.primary,
                    color: palette.primaryForeground,
                  }}
                >
                  <div className="flex h-full items-center justify-center text-xs font-semibold">
                    Primary
                  </div>
                </div>
                <div
                  className="h-10 rounded-md border"
                  style={{
                    backgroundColor: palette.secondary,
                    color: palette.secondaryForeground,
                  }}
                >
                  <div className="flex h-full items-center justify-center text-xs font-semibold">
                    Secondary
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

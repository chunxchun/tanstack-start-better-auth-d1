export type Palette = {
  id: string;
  name: string;
  description: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
};

export const PALETTES: Palette[] = [
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

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const r2BaseUrl = `pub-2b0addf01b884fb58892ece1dc10f22d.r2.dev`;

export const wadaDisplayName = "WadaFoodTech";
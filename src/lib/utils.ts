import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildR2AccessKey(
  folder: string,
  id: number|string,
  asset: string,
  file: File,
) {
  const ext = file.name.split(".").pop();
  const filename = `${asset}.${ext}`;
  return `${folder}/${id}/${filename}`;
}

export function getVersionedImageUrl(
  url: string | null | undefined,
  version: string | number | null | undefined,
) {
  if (!url) {
    return "";
  }

  if (!version) {
    return url;
  }
  // console.log('get version url', url);
  const separator = url.includes("?") ? "&" : "?";
  const versionedUrl = `${url}${separator}v=${encodeURIComponent(String(version))}`;
  // console.log('versioned url', versionedUrl);
  return versionedUrl;
}

export const r2BaseUrl = `pub-2b0addf01b884fb58892ece1dc10f22d.r2.dev`;

export const wadaDisplayName = "WadaFoodTech";

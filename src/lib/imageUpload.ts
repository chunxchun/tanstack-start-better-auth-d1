import type { R2UploadResponseType } from "@/utils/sharedSchema";

/**
 * Upload an image file to R2 and return the public URL
 */
export async function uploadImage(file: File, key?: string): Promise<R2UploadResponseType> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (key) {
      formData.append("key", key);
    }

    const response = await fetch("/api/r2/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Image uploaded successfully:", data);
    return data as R2UploadResponseType;

  } catch (error) {
    console.error("Image upload error:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error during image upload");
  }
}

/**
 * Validate image file
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return validTypes.includes(file.type) && file.size <= maxSize;
}

/**
 * Get error message for invalid image
 */
export function getImageValidationError(file: File): string | null {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)";
  }

  if (file.size > maxSize) {
    return `File size must not exceed 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
  }

  return null;
}

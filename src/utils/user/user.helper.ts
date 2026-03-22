import { uploadImage } from "@/lib/imageUpload";
import { buildR2AccessKey } from "@/lib/utils";

export const getImageUrl = async (image:File, userId: string) => {
  if (!image) return null;
  const imageKey = buildR2AccessKey("users", userId, "image", image);
  const result = await uploadImage(image, imageKey);
  
  if (!result) {
    throw new Error("Failed to upload user image");
  }
  return result.url;
}